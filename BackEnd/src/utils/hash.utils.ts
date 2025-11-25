import bcrypt from 'bcryptjs';
import { createHash } from 'crypto';

export async function hash(content:string): Promise<string>{
    const SaltRounded = 12
    const hash_text=bcrypt.hash(content,SaltRounded)
    return hash_text
}

export async function compareHash(contentHashed:string,content:string): Promise<boolean>{
    return bcrypt.compare(contentHashed,content)
}


export async function hashToken(token: string): Promise<string> {
  return createHash('sha256').update(token).digest('hex');
}