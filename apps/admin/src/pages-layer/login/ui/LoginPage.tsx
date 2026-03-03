'use client';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from '@hotspot/ui';
import LockIcon from '@hotspot/ui/assets/icons/lock.svg';
import { useId, useState } from 'react';

export const LoginPage = () => {
  const [adminKey, setAdminKey] = useState('');
  const adminKeyInputId = useId();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-[360px] gap-6 rounded-xl p-6 shadow-2xl shadow-black/10">
        <CardHeader className="items-center text-center">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-600">
            <LockIcon aria-hidden className="h-5 w-5 text-white" />
          </div>
          <CardTitle className="text-[34px]">Hotspot Admin</CardTitle>
          <CardDescription className="mt-2 text-sm text-gray-400">
            관리자 인증이 필요합니다.
          </CardDescription>
        </CardHeader>

        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <CardContent className="p-0">
            <Input
              id={adminKeyInputId}
              label="관리자 키"
              onChange={(event) => setAdminKey(event.target.value)}
              onClear={() => setAdminKey('')}
              type="password"
              value={adminKey}
            />
          </CardContent>
          <CardFooter className="p-0">
            <Button disabled={!adminKey.trim()} type="submit">
              로그인
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
};
