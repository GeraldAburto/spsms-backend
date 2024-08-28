export interface IJWTSigner {
  sign(payload: object): Promise<string>;
}
