import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { sign, verify, SignOptions, decode } from 'jsonwebtoken';


@Injectable()
export class JwtService {
    private secretKey: string;
    public static instance: JwtService;

    constructor(){
        if (existsSync('.jwt.key')){
            this.secretKey = readFileSync('.jwt.key').toString();
        } else {
            this.secretKey = randomUUID();
            writeFileSync('.jwt.key', this.secretKey);
        }
        JwtService.instance = this;
    }
    
    public generateJwtToken(data: string | object | Buffer, options?: SignOptions): string {
        const expiresIn = options?.expiresIn;
        return sign(data, this.secretKey, { expiresIn: expiresIn });
    }

    public verifyToken<T = { [key: string]: unknown }>(token: string): T {
        return verify(token, this.secretKey) as T;
    }

    public generateRefreshToken(data: { [key: string]: unknown }, privateKey: string){
        return sign({ ait: new Date().toISOString(), ...data }, `${this.secretKey}${privateKey}`, { expiresIn: '30 days' });
    }

    public verifyRefreshToken(token: string, privateKey: string): { iat: string } {
        return verify(token, `${this.secretKey}${privateKey}`) as unknown as { iat: string };
    }

    public decode<T = { [key: string]: unknown }>(token: string): T {
        return decode(token, { json: true }) as T;
    }
}
