// Función simple para generar IDs únicos similares a ULID
export function generateULID(): string {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substring(2, 15)
  return `${timestamp}${randomPart}`.toUpperCase().padEnd(26, "0").substring(0, 26)
}

// Función para validar formato ULID
export function isValidULID(ulid: string): boolean {
  return /^[0-9A-HJKMNP-TV-Z]{26}$/.test(ulid)
}

// Función para extraer timestamp de ULID
export function getULIDTimestamp(ulid: string): Date | null {
  if (!isValidULID(ulid)) return null

  try {
    const timestampPart = ulid.substring(0, 10)
    const timestamp = Number.parseInt(timestampPart, 36)
    return new Date(timestamp)
  } catch {
    return null
  }
}
