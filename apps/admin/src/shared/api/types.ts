export interface ApiResponse<T> {
  status: number;
  code: string;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  status?: number;
  statusCode?: number;
  code: string;
  message: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const getString = (source: unknown, key: string): string | null => {
  if (!isRecord(source)) {
    return null;
  }

  const value = source[key];
  return typeof value === 'string' ? value : null;
};

const getNonEmptyString = (value: string | null): string | null => {
  if (value === null) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export const getApiErrorMessage = (source: unknown, fallbackMessage: string): string => {
  const fromRoot =
    getNonEmptyString(getString(source, 'message')) ??
    getNonEmptyString(getString(source, 'error')) ??
    getNonEmptyString(getString(source, 'errorMessage'));

  if (fromRoot) {
    return fromRoot;
  }

  const data = isRecord(source) ? source.data : null;

  return (
    getNonEmptyString(getString(data, 'message')) ??
    getNonEmptyString(getString(data, 'error')) ??
    getNonEmptyString(getString(data, 'errorMessage')) ??
    fallbackMessage
  );
};
