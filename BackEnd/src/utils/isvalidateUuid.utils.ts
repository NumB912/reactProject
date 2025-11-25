import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export function isValidUUID(uuid: string): boolean {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4; // hoặc phiên bản bạn dùng
}
