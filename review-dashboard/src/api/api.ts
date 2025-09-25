// src/lib/api.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  authToken?: string; // optional JWT or API key
}

async function request<TResponse, TBody = unknown>(
  endpoint: string,
  options: ApiOptions<TBody> = {}
): Promise<TResponse> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const authHeaders: Record<string, string> = options.authToken
    ? { Authorization: `Bearer ${options.authToken}` }
    : {};

  try {
    const response = await fetch(url, {
      method: options.method || "GET",
      headers: {
        ...defaultHeaders,
        ...authHeaders,
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    return (await response.json()) as TResponse;
  } catch (err) {
    console.error("API request failed:", err);
    throw err;
  }
}

// Shorthand helpers
export const api = {
  get: <T>(endpoint: string, authToken?: string, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: "GET", headers, authToken }),

  post: <T, B = unknown>(endpoint: string, body: B, authToken?: string, headers?: Record<string, string>) =>
    request<T, B>(endpoint, { method: "POST", body, headers, authToken }),

  put: <T, B = unknown>(endpoint: string, body: B, authToken?: string, headers?: Record<string, string>) =>
    request<T, B>(endpoint, { method: "PUT", body, headers, authToken }),

  delete: <T>(endpoint: string, authToken?: string, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: "DELETE", headers, authToken }),
};
