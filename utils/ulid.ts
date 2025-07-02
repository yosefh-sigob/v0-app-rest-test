// Implementación simple de ULID para el demo
export function generateULID(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const randomPart = Math.random().toString(36).substring(2, 12).toUpperCase()
  return `${timestamp}${randomPart}`.padEnd(26, "0").substring(0, 26)
}

export function isValidULID(ulid: string): boolean {
  return typeof ulid === "string" && ulid.length === 26 && /^[0-9A-Z]+$/.test(ulid)
}

export function extractTimestamp(ulid: string): Date | null {
  if (!isValidULID(ulid)) return null

  try {
    const timestampPart = ulid.substring(0, 10)
    const timestamp = Number.parseInt(timestampPart, 36)
    return new Date(timestamp)
  } catch {
    return null
  }
}
