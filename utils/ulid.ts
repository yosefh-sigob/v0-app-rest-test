// Implementación simple de ULID para el ejemplo
// En producción, usar una librería como 'ulid' o 'ulidx'

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

export function generateULID(seedTime?: number): string {
  const now = seedTime || Date.now()
  return encodeTime(now, TIME_LEN) + encodeRandom(RANDOM_LEN)
}

export function isValidULID(ulid: string): boolean {
  if (ulid.length !== 26) {
    return false
  }

  for (let i = 0; i < ulid.length; i++) {
    if (ENCODING.indexOf(ulid.charAt(i)) === -1) {
      return false
    }
  }

  return true
}

export function extractTimeFromULID(ulid: string): number {
  if (!isValidULID(ulid)) {
    throw new Error("Invalid ULID")
  }

  const timeStr = ulid.substring(0, TIME_LEN)
  let time = 0

  for (let i = 0; i < timeStr.length; i++) {
    const char = timeStr.charAt(i)
    const index = ENCODING.indexOf(char)
    time = time * ENCODING_LEN + index
  }

  return time
}
