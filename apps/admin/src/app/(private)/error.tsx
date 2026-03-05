/** biome-ignore-all lint/suspicious/noShadowRestrictedNames: <explanation> */
'use client';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      <h1>오류가 발생했습니다.</h1>
      <p>{error.message || '서버에서 오류가 발생했습니다.'}</p>
      <button onClick={() => reset()} type="button">
        다시 시도하기
      </button>
    </div>
  );
};

export default Error;
