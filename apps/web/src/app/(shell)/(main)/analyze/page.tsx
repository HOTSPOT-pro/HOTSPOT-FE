'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const page = () => {
  const router = useRouter();
  const isSubscribe = false;

  useEffect(() => {
    if (isSubscribe === null) return;
    if (!isSubscribe) {
      router.push('/analyze/pay');
    } else {
      router.push('/analyze/select');
    }
  }, [router]);

  return <div>loading...</div>;
};

export default page;
