// Función simple para generar ULIDs mock
// En producción se usaría una librería como 'ulid'
export function generateULID(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const randomPart = Math.random().toString(36).substring(2, 12).toUpperCase()
  return `${timestamp}${randomPart}`.padEnd(26, "0").substring(0, 26)
}

export function isValidULID(ulid: string): boolean {
  return typeof ulid === "string" && ulid.length === 26
}

export function extractTimestamp(ulid: string): Date {
  if (!isValidULID(ulid)) {
    throw new Error("Invalid ULID")
  }

  // Extraer los primeros 10 caracteres que representan el timestamp
  const timestampPart = ulid.substring(0, 10)
  const timestamp = Number.parseInt(timestampPart, 36)
  return new Date(timestamp)
}
