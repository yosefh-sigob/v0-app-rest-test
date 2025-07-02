import { ulid } from "ulid"

export function generateULID(): string {
  return ulid()
}

export function isValidULID(id: string): boolean {
  return /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/.test(id)
}

export function parseULIDTimestamp(ulid: string): Date {
  if (!isValidULID(ulid)) {
    throw new Error("Invalid ULID")
  }

  const timestamp = ulid.substring(0, 10)
  const chars = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"
  let time = 0

  for (let i = 0; i < timestamp.length; i++) {
    time = time * 32 + chars.indexOf(timestamp[i])
  }

  return new Date(time)
}
