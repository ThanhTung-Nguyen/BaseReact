export const isValidHttpUrl = (str?: string) => {
  let url: URL

  if (str == null) {
    return false
  }

  try {
    url = new URL(str)
  } catch (_) {
    return false
  }

  return url.protocol === "http:" || url.protocol === "https:"
}
