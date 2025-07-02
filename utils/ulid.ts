// Implementación simple de ULID para el proyecto
// En producción, usar una librería como 'ulid'

const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"
const ENCODING_LEN = ENCODING.length
const TIME_MAX = Math.pow(2, 48) - 1
const TIME_LEN = 10
const RANDOM_LEN = 16

function encodeTime(now: number, len: number): string {
  if (now > TIME_MAX) {
    throw new Error("Time too large")
  }

  let str = ""
  for (let i = len; i > 0; i--) {
    const mod = now % ENCODING_LEN
    str = ENCODING.charAt(mod) + str
    now = Math.floor(now / ENCODING_LEN)
  }
  return str
}

function encodeRandom(len: number): string {
  let str = ""
  for (let i = 0; i < len; i++) {
    const rand = Math.floor(Math.random() * ENCODING_LEN)
    str += ENCODING.charAt(rand)
  }
  return str
}

export function generateULID(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const randomPart = Math.random().toString(36).substring(2, 15).toUpperCase()
  return `${timestamp}${randomPart}`.padEnd(26, "0").substring(0, 26)
}

export function isValidULID(ulid: string): boolean {
  return typeof ulid === "string" && ulid.length === 26 && /^[0-9A-Z]+$/.test(ulid)
}

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
