export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return (await res.json()) as T;
}

export function getDesigns() {
  return fetchJSON(`${API_URL}/api/designs`);
}

export function getDesign(slug: string) {
  return fetchJSON(`${API_URL}/api/designs/${slug}`);
}

export function getBlogs() {
  return fetchJSON(`${API_URL}/api/blogs`);
}

export function getBlog(slug: string) {
  return fetchJSON(`${API_URL}/api/blogs/${slug}`);
}

export function getPricing() {
  return fetchJSON(`${API_URL}/api/pricing`);
}

export function getContent(key: string) {
  return fetchJSON(`${API_URL}/api/content/${key}`);
}

export function uploadFiles(files: File[]) {
  const form = new FormData();
  files.forEach((file) => form.append("files", file));
  return fetch(`${API_URL}/api/upload`, {
    method: "POST",
    body: form,
  }).then((res) => {
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  });
}

export function adminLogin(payload: { email: string; password: string }) {
  return fetchJSON<{ token: string }>(`${API_URL}/api/admin/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function adminRequest<T>(path: string, token: string, options?: RequestInit) {
  return fetchJSON<T>(`${API_URL}${path}`, {
    ...(options || {}),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });
}
