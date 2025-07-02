// Generador simple de ULID para propósitos de demostración
// En producción se debería usar una librería como 'ulid'

const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"
const ENCODING_LEN = ENCODING.length
const TIME_MAX = Math.pow(2, 48) - 1
const TIME_LEN = 10
const RANDOM_LEN = 16

export function generateULID(): string {
  const now = Date.now()
  if (now > TIME_MAX) {
    throw new Error("Cannot generate ULID for timestamp beyond 2^48-1")
  }

  const time = now.toString(32).padStart(TIME_LEN, "0")
  let random = ""

  for (let i = 0; i < RANDOM_LEN; i++) {
    random += ENCODING[Math.floor(Math.random() * ENCODING_LEN)]
  }

  return (time + random).toUpperCase()
}

export function isValidULID(ulid: string): boolean {
  if (typeof ulid !== "string" || ulid.length !== 26) {
    return false
  }

  for (let i = 0; i < ulid.length; i++) {
    if (ENCODING.indexOf(ulid[i]) === -1) {
      return false
    }
  }

  return true
}

export function extractTimestamp(ulid: string): Date {
  if (!isValidULID(ulid)) {
    throw new Error("Invalid ULID")
  }

  const timeStr = ulid.substring(0, TIME_LEN)
  const timestamp = Number.parseInt(timeStr, 32)
  return new Date(timestamp)
}
