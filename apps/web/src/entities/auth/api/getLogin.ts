/** biome-ignore-all lint/correctness/noProcessGlobal: <explanation> */
export const getLogin = async ({ provider }: { provider: string }) => {
  window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/${provider}`;
};
