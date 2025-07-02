import { ulid } from "ulid"

export function generateULID(): string {
  return ulid()
}

export function isValidULID(id: string): boolean {
  // ULID format: 26 characters, base32 encoded
  const ulidRegex = /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/
  return ulidRegex.test(id)
}

export function extractTimestamp(ulidString: string): Date {
  if (!isValidULID(ulidString)) {
    throw new Error("Invalid ULID format")
  }

  // Extract timestamp from first 10 characters of ULID
  const timestampPart = ulidString.substring(0, 10)
  const timestamp = Number.parseInt(timestampPart, 32)
  return new Date(timestamp)
}

export function compareULIDs(a: string, b: string): number {
  if (!isValidULID(a) || !isValidULID(b)) {
    throw new Error("Invalid ULID format")
  }

  return a.localeCompare(b)
}
