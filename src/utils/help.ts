// src/utils/help.ts

export function byteArrayToBase64(byteArray: Uint8Array): string {
    let binary = '';
    const len = byteArray.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(byteArray[i]);
    }
    return window.btoa(binary); // Base64 encode
}

export function stringToUint8Array(data: string): Uint8Array {
    const binaryString = window.atob(data); // Decode base64 string to binary string
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
}