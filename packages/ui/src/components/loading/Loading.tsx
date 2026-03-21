export const Loading = () => {
  return (
    <svg aria-hidden="true" className="h-7 w-7 animate-spin" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        fill="none"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        className="opacity-90"
        d="M21 12a9 9 0 0 0-9-9"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
    </svg>
  );
};
