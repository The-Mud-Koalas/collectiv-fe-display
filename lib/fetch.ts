interface FetchProps {
  endpoint?: string;
  url?: string;
  token?: string;
  searchParams?: URLSearchParams;
}

interface MutateProps<T> extends FetchProps {
  body: T;
}

const getRequest = async ({ url, endpoint, token, searchParams }: FetchProps) => {
  url ??= `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}/${searchParams != null ? `?${searchParams.toString()}` : ""}`;

  const host = process.env.NEXT_PUBLIC_FRONTEND_URL ?? `${window.location.protocol}//${window.location.host}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Origin: host
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Response failed with status ${response.status}`, {
      cause: error,
    });
  }

  const jsonResponse = await response.json();
  return jsonResponse;
};

const postRequest = async <T>({
  endpoint,
  body,
  url,
  token,
}: MutateProps<T>) => {
  url ??= `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}/`;
  const host = `${window.location.protocol}//${window.location.host}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Origin: host
    },
    body: JSON.stringify(body),
    method: "POST",
    
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Response failed with status ${response.status}`, {
      cause: error,
    });
  }

  const jsonResponse = await response.json();
  return jsonResponse;
};

export { getRequest, postRequest };
