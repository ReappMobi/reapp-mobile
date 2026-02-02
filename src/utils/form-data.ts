export const buildFormData = (data: Record<string, unknown>) => {
  const formData = new FormData();

  for (const key in data) {
    const field = data[key];
    if (field !== undefined && field !== null) {
      formData.append(key, data[key] as string | Blob);
    }
  }

  return formData;
};
