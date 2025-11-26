const baseRequest = async <TResponse>(
  url: string,
  options: RequestInit = {},
): Promise<TResponse> => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `${response.statusText || `HTTP Status: ${response.status}`}`,
      );
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const getRequest = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  return baseRequest<T>(url, { ...options, method: 'GET' });
};

export const postRequest = async <TRequestData, TResponse>(
  url: string,
  params: TRequestData = {} as TRequestData,
  options?: RequestInit,
): Promise<TResponse> => {
  return baseRequest<TResponse>(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(params),
  });
};
