import * as dotenv from 'dotenv';

dotenv.config();

export function env_int(name: string): number {
    return parseInt(env(name));
}

export function env(name: string): string {
    const value = process.env[name];
    if (!value) {
        return name;
    }
    return value;
}
