'use client';

import { Button, Modal } from '@hotspot/ui';
import NextImage from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { type UseFormRegisterReturn, useFieldArray, useForm } from 'react-hook-form';
import { ONBOARDING_RULES } from '@/features/onboarding/model/formatRule';
import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import { formatTel, toPureDigits } from '@/shared/lib';

const BYTES_PER_KILOBYTE = 1024;
const MAX_UPLOAD_BYTES = 10 * BYTES_PER_KILOBYTE * BYTES_PER_KILOBYTE;
const WEBP_QUALITY = 0.92;

type FamilyRole = 'PARENT' | 'CHILD';

interface PresignedUrlData {
  objectKey?: string;
  presignedUrl?: string;
  s3TempKey?: string;
  tempKey?: string;
  uploadUrl?: string;
  url?: string;
}

interface FamilyAddRequest {
  applyType: 'ADD';
  familyMemberList: Array<{
    name: string;
    phone: string;
    targetFamilyRole: FamilyRole;
  }>;
  s3TempKey: string;
}

interface AddFamilyFormValues {
  familyMemberList: Array<{
    name: string;
    phone: string;
    targetFamilyRole: FamilyRole;
  }>;
}

const ParentRoleIcon = () => (
  <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" fill="currentColor" fillOpacity="0.14" r="11" />
    <circle cx="9.2" cy="10.2" fill="currentColor" r="1.2" />
    <circle cx="14.8" cy="10.2" fill="currentColor" r="1.2" />
    <path
      d="M9.6 14c.6.8 1.4 1.2 2.4 1.2s1.8-.4 2.4-1.2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
  </svg>
);

const ChildRoleIcon = () => (
  <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" fill="currentColor" fillOpacity="0.1" r="11" />
    <circle cx="9.2" cy="10.2" fill="currentColor" r="1.2" />
    <circle cx="14.8" cy="10.2" fill="currentColor" r="1.2" />
    <path
      d="M9.8 14.4c.5.5 1.3.8 2.2.8.8 0 1.6-.3 2.2-.8"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
  </svg>
);

const UploadIcon = () => (
  <svg aria-hidden="true" className="h-11 w-11 text-gray-500" fill="none" viewBox="0 0 48 48">
    <path
      d="M24 30V10m0 0-8 8m8-8 8 8M11 28v8a5 5 0 0 0 5 5h16a5 5 0 0 0 5-5v-8"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3.5"
    />
  </svg>
);

const InputField = ({
  errorMessage,
  helpText,
  inputProps,
  label,
  placeholder,
}: {
  errorMessage?: string;
  helpText: string;
  inputProps: UseFormRegisterReturn;
  label: string;
  placeholder: string;
}) => {
  return (
    <div className="space-y-1">
      <p className="font-title-title3-semibold leading-none text-black">{label}</p>
      <input
        {...inputProps}
        className="h-12 w-full border-b border-gray-200 bg-transparent text-[1rem] text-gray-900 outline-none placeholder:text-gray-400"
        placeholder={placeholder}
        type="text"
      />
      <p
        className={`pt-2 text-[0.75rem] leading-none ${
          errorMessage ? 'text-red-500' : 'text-gray-500'
        }`}
      >
        {errorMessage ?? helpText}
      </p>
    </div>
  );
};

const createEmptyMember = (): AddFamilyFormValues['familyMemberList'][number] => ({
  name: '',
  phone: '',
  targetFamilyRole: 'PARENT',
});

export const AddFamilyMemberModal = ({
  close,
}: {
  close: () => void;
  props?: Record<string, unknown>;
}) => {
  const [isGeneratingUrl, setIsGeneratingUrl] = useState(false);
  const [uploadErrorMessage, setUploadErrorMessage] = useState<string | null>(null);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [generatedPresignedUrl, setGeneratedPresignedUrl] = useState<string | null>(null);
  const [uploadedTempKey, setUploadedTempKey] = useState<string | null>(null);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<AddFamilyFormValues>({
    defaultValues: {
      familyMemberList: [createEmptyMember()],
    },
    mode: 'onChange',
  });

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'familyMemberList',
  });

  const members = watch('familyMemberList');

  const handleTelChange = useCallback(
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatTel(e.target.value);
      setValue(`familyMemberList.${index}.phone`, formatted, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const handleSelectRole = useCallback(
    (index: number, role: FamilyRole) => {
      setValue(`familyMemberList.${index}.targetFamilyRole`, role, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const handleAddMember = useCallback(() => {
    append(createEmptyMember());
  }, [append]);

  const handleRemoveMember = useCallback(
    (index: number) => {
      if (fields.length === 1) {
        return;
      }
      remove(index);
    },
    [fields.length, remove],
  );

  const convertImageToWebp = useCallback((file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      const objectUrl = URL.createObjectURL(file);

      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');

        if (!context) {
          URL.revokeObjectURL(objectUrl);
          reject(new Error('이미지 캔버스를 생성하지 못했습니다.'));
          return;
        }

        context.drawImage(image, 0, 0);
        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(objectUrl);
            if (!blob) {
              reject(new Error('WebP 변환에 실패했습니다.'));
              return;
            }
            resolve(blob);
          },
          'image/webp',
          WEBP_QUALITY,
        );
      };

      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('이미지를 읽을 수 없습니다.'));
      };

      image.src = objectUrl;
    });
  }, []);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (!selectedFile) return;

      if (!selectedFile.type.startsWith('image/')) {
        setUploadErrorMessage('이미지 파일만 업로드할 수 있습니다.');
        setGeneratedPresignedUrl(null);
        return;
      }

      if (selectedFile.size > MAX_UPLOAD_BYTES) {
        setUploadErrorMessage('파일 용량은 최대 10MB까지 가능합니다.');
        setGeneratedPresignedUrl(null);
        return;
      }

      setIsGeneratingUrl(true);
      setUploadErrorMessage(null);
      setSubmitErrorMessage(null);
      setUploadedFileName(selectedFile.name);
      setGeneratedPresignedUrl(null);
      setUploadedTempKey(null);
      setIsUploadComplete(false);

      try {
        const convertedWebpBlob = await convertImageToWebp(selectedFile);
        const nextPreviewUrl = URL.createObjectURL(convertedWebpBlob);
        setPreviewUrl((prev) => {
          if (prev) {
            URL.revokeObjectURL(prev);
          }
          return nextPreviewUrl;
        });

        const { data } = await api.post<ApiResponse<PresignedUrlData> | PresignedUrlData>(
          '/api/v1/image/presigned-url',
        );

        const normalized =
          'data' in data ? (data.data as PresignedUrlData) : (data as PresignedUrlData);

        const presignedUrl = normalized.presignedUrl ?? normalized.uploadUrl ?? normalized.url;
        const s3TempKey = normalized.s3TempKey ?? normalized.tempKey ?? normalized.objectKey;

        if (!(presignedUrl && s3TempKey)) {
          throw new Error('Presigned URL 응답 형식이 올바르지 않습니다.');
        }

        setGeneratedPresignedUrl(presignedUrl);
        setUploadedTempKey(s3TempKey);
        const uploadResponse = await fetch(presignedUrl, {
          body: convertedWebpBlob,
          headers: {
            'Content-Type': 'image/webp',
          },
          method: 'PUT',
        });

        if (!uploadResponse.ok) {
          throw new Error('Presigned URL 업로드에 실패했습니다.');
        }

        setIsUploadComplete(true);
      } catch {
        setUploadErrorMessage('이미지 처리 또는 업로드에 실패했습니다.');
      } finally {
        setIsGeneratingUrl(false);
      }
    },
    [convertImageToWebp],
  );

  const onSubmit = handleSubmit(async (formValues) => {
    if (!(uploadedTempKey && isUploadComplete)) {
      setUploadErrorMessage('증빙 이미지를 먼저 업로드해주세요.');
      setSubmitErrorMessage(null);
      return;
    }

    setIsSubmitting(true);
    setSubmitErrorMessage(null);
    try {
      const payload: FamilyAddRequest = {
        applyType: 'ADD',
        familyMemberList: formValues.familyMemberList.map((member) => ({
          name: member.name.trim(),
          phone: toPureDigits(member.phone),
          targetFamilyRole: member.targetFamilyRole,
        })),
        s3TempKey: uploadedTempKey,
      };

      await api.post('/api/v1/families/add', payload);
      close();
    } catch (error) {
      const serverMessage =
        (
          error as {
            response?: { data?: { detail?: string; message?: string } };
          }
        )?.response?.data?.detail ??
        (
          error as {
            response?: { data?: { detail?: string; message?: string } };
          }
        )?.response?.data?.message;

      setSubmitErrorMessage(serverMessage ?? '가족 구성원 추가 신청에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  });

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <Modal className="overflow-y-auto" size="custom">
      <Modal.Header className="gap-2">
        <Modal.Title className="text-[1rem] font-bold leading-tight text-black">
          가족 구성원 추가 신청
        </Modal.Title>
        <Modal.Description className="text-[0.875rem] text-gray-500">
          여러 명의 구성원을 한 번에 신청할 수 있습니다.
        </Modal.Description>
      </Modal.Header>

      <Modal.Content className="mt-2 gap-6">
        <div className="space-y-4">
          {fields.map((field, index) => {
            const memberRole = members?.[index]?.targetFamilyRole ?? 'PARENT';

            return (
              <div className="space-y-4 rounded-2xl border border-gray-200 p-4" key={field.id}>
                <div className="flex items-center justify-between">
                  <p className="text-[0.9375rem] font-semibold text-black">구성원 {index + 1}</p>
                  <button
                    className="text-[0.75rem] font-medium text-gray-500 disabled:text-gray-300"
                    disabled={fields.length === 1}
                    onClick={() => handleRemoveMember(index)}
                    type="button"
                  >
                    삭제
                  </button>
                </div>

                <InputField
                  errorMessage={errors.familyMemberList?.[index]?.name?.message}
                  helpText="가족 구성원 이름을 입력해주세요."
                  inputProps={register(`familyMemberList.${index}.name`, {
                    required: '필수 입력 항목입니다.',
                    validate: (value) => value.trim().length >= 2 || '2자 이상 입력해주세요.',
                  })}
                  label="이름"
                  placeholder="홍길동"
                />

                <InputField
                  errorMessage={errors.familyMemberList?.[index]?.phone?.message}
                  helpText="가족 구성원 전화번호를 입력해주세요."
                  inputProps={register(`familyMemberList.${index}.phone`, {
                    ...ONBOARDING_RULES.tel,
                    onChange: handleTelChange(index),
                  })}
                  label="전화번호"
                  placeholder="010-0000-0000"
                />

                <div className="space-y-3">
                  <p className="font-title-title3-semibold leading-none text-black">권한</p>
                  <div className="flex gap-2">
                    <button
                      className={`flex h-14 flex-1 items-center justify-center gap-2 rounded-lg border text-[1rem] font-medium ${
                        memberRole === 'PARENT'
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 bg-white text-gray-500'
                      }`}
                      onClick={() => handleSelectRole(index, 'PARENT')}
                      type="button"
                    >
                      <ParentRoleIcon />
                      부모
                    </button>
                    <button
                      className={`flex h-14 flex-1 items-center justify-center gap-2 rounded-lg border text-[1rem] font-medium ${
                        memberRole === 'CHILD'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 bg-white text-gray-500'
                      }`}
                      onClick={() => handleSelectRole(index, 'CHILD')}
                      type="button"
                    >
                      <ChildRoleIcon />
                      자녀
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <Button onClick={handleAddMember} type="button" variant="outline">
            구성원 추가
          </Button>
        </div>

        <div className="space-y-3">
          <p className="font-title-title3-semibold leading-none text-black">가족관계증명서</p>
          <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-gray-300 bg-gray-50/40 p-2">
            {!isUploadComplete ? (
              <>
                <UploadIcon />
                <p className="text-[0.75rem] text-gray-600">
                  {isGeneratingUrl
                    ? 'WebP 변환 및 URL 생성 중...'
                    : '파일을 선택하거나 드래그하세요'}
                </p>
                <p className="text-[0.5rem] text-gray-500">JPEG, PNG, WEBP (최대 10MB)</p>
              </>
            ) : null}
            {uploadedFileName ? (
              <p className="text-[0.625rem] text-gray-600">{uploadedFileName}</p>
            ) : null}
            {generatedPresignedUrl ? (
              <p className="w-full truncate px-4 text-center text-[0.625rem] text-green-600">
                {isUploadComplete ? '업로드 완료' : 'Presigned URL 생성 완료'}
              </p>
            ) : null}
            {uploadErrorMessage ? (
              <p className="w-full px-4 text-center text-[0.625rem] text-red-500">
                {uploadErrorMessage}
              </p>
            ) : null}
            {previewUrl ? (
              <NextImage
                alt="WebP 미리보기"
                className="mt-2 h-20 w-20 rounded-md border border-gray-200 object-cover"
                height={80}
                src={previewUrl}
                unoptimized
                width={80}
              />
            ) : null}
            <input
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                handleFileChange(event).catch(() => undefined);
              }}
              type="file"
            />
          </label>
          {submitErrorMessage ? (
            <p className="px-1 text-[0.75rem] text-red-500">{submitErrorMessage}</p>
          ) : null}
        </div>
      </Modal.Content>

      <Modal.Footer btnLayout="horizontal" className="mt-2 gap-2">
        <Button onClick={close} type="button" variant="outline">
          취소
        </Button>
        <Button
          disabled={!(isValid && isUploadComplete) || isSubmitting}
          isLoading={isSubmitting}
          onClick={() => {
            onSubmit().catch(() => undefined);
          }}
          type="button"
        >
          신청하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
