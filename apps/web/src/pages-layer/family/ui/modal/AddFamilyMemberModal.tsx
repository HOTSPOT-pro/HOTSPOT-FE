'use client';

import { Button, Modal } from '@hotspot/ui';
import NextImage from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { type UseFormRegisterReturn, useForm } from 'react-hook-form';
import { ONBOARDING_RULES } from '@/features/onboarding/model/formatRule';
import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import { formatTel, toPureDigits } from '@/shared/lib';

const BYTES_PER_KILOBYTE = 1024;
const MAX_UPLOAD_BYTES = 10 * BYTES_PER_KILOBYTE * BYTES_PER_KILOBYTE;
const WEBP_CONTENT_TYPE = 'image/png';
const WEBP_QUALITY = 0.92;

interface PresignedUrlData {
  objectKey?: string;
  presignedUrl?: string;
  tempKey?: string;
  uploadUrl?: string;
  url?: string;
}

interface FamilyAddRequest {
  applyType: 'ADD';
  familyMemberList: Array<{
    name: string;
    phone: string;
    targetFamilyRole: 'PARENT' | 'CHILD';
  }>;
  tempKey: string;
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
      <p className="text-[1rem] font-semibold leading-none text-black">{label}</p>
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

export const AddFamilyMemberModal = ({
  close,
}: {
  close: () => void;
  props?: Record<string, unknown>;
}) => {
  const [selectedRole, setSelectedRole] = useState<'PARENT' | 'CHILD'>('PARENT');
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
    formState: { errors, isValid },
    handleSubmit,
    register,
    setValue,
  } = useForm<{
    familyRole: 'PARENT' | 'CHILD';
    name: string;
    tel: string;
  }>({
    defaultValues: {
      familyRole: 'PARENT',
      name: '',
      tel: '',
    },
    mode: 'onChange',
  });

  const handleTelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatTel(e.target.value);
      setValue('tel', formatted, { shouldValidate: true });
    },
    [setValue],
  );

  const handleSelectRole = useCallback(
    (role: 'PARENT' | 'CHILD') => {
      setSelectedRole(role);
      setValue('familyRole', role, { shouldValidate: true });
    },
    [setValue],
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
          WEBP_CONTENT_TYPE,
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
          undefined,
          {
            params: {
              contentType: WEBP_CONTENT_TYPE,
            },
          },
        );

        const normalized =
          'data' in data ? (data.data as PresignedUrlData) : (data as PresignedUrlData);

        const presignedUrl = normalized.presignedUrl ?? normalized.uploadUrl ?? normalized.url;
        const tempKey = normalized.tempKey ?? normalized.objectKey;

        if (!(presignedUrl && tempKey)) {
          throw new Error('Presigned URL 응답 형식이 올바르지 않습니다.');
        }

        setGeneratedPresignedUrl(presignedUrl);
        setUploadedTempKey(tempKey);
        const uploadResponse = await fetch(presignedUrl, {
          body: convertedWebpBlob,
          headers: {
            'Content-Type': WEBP_CONTENT_TYPE,
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
        familyMemberList: [
          {
            name: formValues.name,
            phone: toPureDigits(formValues.tel),
            targetFamilyRole: formValues.familyRole,
          },
        ],
        tempKey: uploadedTempKey,
      };

      await api.post('/api/v1/families/add', payload);
      close();
    } catch (error) {
      const serverMessage =
        (error as { response?: { data?: { detail?: string; message?: string } } })?.response?.data
          ?.detail ??
        (error as { response?: { data?: { detail?: string; message?: string } } })?.response?.data
          ?.message;

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
    <Modal
      className="w-[30.5rem] max-w-[calc(100vw-1rem)] max-h-[92vh] overflow-y-auto rounded-[1.5rem] p-6"
      size="custom"
    >
      <Modal.Header className="gap-2">
        <Modal.Title className="text-[1rem] font-bold leading-tight text-black">
          가족 구성원 추가 신청
        </Modal.Title>
        <Modal.Description className="text-[0.875rem] text-gray-500">
          신청 후 검토를 거쳐 구성원이 추가됩니다
        </Modal.Description>
      </Modal.Header>

      <Modal.Content className="mt-2 gap-6">
        <input {...register('familyRole', { required: '필수 입력 항목입니다.' })} type="hidden" />

        <InputField
          errorMessage={errors.name?.message}
          helpText="가족 구성원 이름을 입력해주세요."
          inputProps={register('name', {
            minLength: { message: '2자 이상 입력해주세요.', value: 2 },
            required: '필수 입력 항목입니다.',
          })}
          label="이름"
          placeholder="홍길동"
        />
        <InputField
          errorMessage={errors.tel?.message}
          helpText="가족 구성원 전화번호를 입력해주세요."
          inputProps={register('tel', {
            ...ONBOARDING_RULES.tel,
            onChange: handleTelChange,
          })}
          label="전화번호"
          placeholder="010-0000-0000"
        />

        <div className="space-y-3">
          <p className="text-[1rem] font-semibold leading-none text-black">권한</p>
          <div className="flex gap-2">
            <button
              className={`flex h-14 flex-1 items-center justify-center gap-2 rounded-lg border text-[1rem] font-medium ${
                selectedRole === 'PARENT'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 bg-white text-gray-500'
              }`}
              onClick={() => handleSelectRole('PARENT')}
              type="button"
            >
              <ParentRoleIcon />
              부모
            </button>
            <button
              className={`flex h-14 flex-1 items-center justify-center gap-2 rounded-lg border text-[1rem] font-medium ${
                selectedRole === 'CHILD'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 bg-white text-gray-500'
              }`}
              onClick={() => handleSelectRole('CHILD')}
              type="button"
            >
              <ChildRoleIcon />
              자녀
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[1rem] font-semibold leading-none text-black">가족관계증명서</p>
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
          추가 신청
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
