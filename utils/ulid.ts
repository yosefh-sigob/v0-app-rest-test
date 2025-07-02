import { ulid } from "ulid"

export function generateULID(): string {
  return ulid()
}

export function isValidULID(id: string): boolean {
  return /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/.test(id)
}

export function extractTimestamp(ulid: string): Date {
  if (!isValidULID(ulid)) {
    throw new Error("ULID inválido")
  }

  const timestamp = Number.parseInt(ulid.substring(0, 10), 32)
  return new Date(timestamp)
}
