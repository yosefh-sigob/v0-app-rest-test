// Implementación simple de ULID para el demo
// En producción se usaría una librería como 'ulid'

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
  const now = Date.now()
  const timeStr = encodeTime(now, TIME_LEN)
  const randomStr = encodeRandom(RANDOM_LEN)

  return timeStr + randomStr
}

export function isValidULID(ulid: string): boolean {
  if (ulid.length !== 26) return false

  for (const char of ulid) {
    if (!ENCODING.includes(char)) return false
  }

  return true
}

export function getULIDTimestamp(ulid: string): number {
  if (!isValidULID(ulid)) {
    throw new Error("Invalid ULID")
  }

  const timeStr = ulid.substring(0, TIME_LEN)
  let timestamp = 0

  for (let i = 0; i < timeStr.length; i++) {
    const char = timeStr.charAt(i)
    const index = ENCODING.indexOf(char)
    timestamp = timestamp * ENCODING_LEN + index
  }

  return timestamp
}
