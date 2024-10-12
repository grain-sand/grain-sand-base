import {decode, encode} from 'js-base64'

export const decodeBase64: (input: string) => string = decode;

export const encodeBase64: (input: string) => string = encode;