import {decode, encode} from 'js-base64'

export type Base64DataURL = `data:${string};base64,${string}`;

export const decodeBase64: (input: string) => string = decode;

export const encodeBase64: (input: string) => string = encode;