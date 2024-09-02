export interface IJWTSigner {
  sign(payload: Buffer | object): Promise<string>;
  verify<T extends object = any>(token: string): Promise<T>;
}
