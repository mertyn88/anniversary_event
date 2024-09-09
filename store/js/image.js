function encodeImagesToBase64(files) {
    const base64Promises = [];

    for (let file of files) {
        base64Promises.push(fileToBase64(file));
    }

    return Promise.all(base64Promises);
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
            // 파일 내용을 Base64로 인코딩된 문자열로 변환합니다.
            resolve(event.target.result);
        };

        reader.onerror = function (error) {
            reject(error);
        };

        // 파일을 읽어 Data URL 형식의 문자열을 반환합니다.
        reader.readAsDataURL(file);
    });
}


function compressStringToBase64(text) {
    // 문자열을 Uint8Array 바이트로 변환
    const bytes = new TextEncoder().encode(text);
    // 바이트를 압축
    const compressedBytes = pako.deflate(bytes);
    // 압축된 바이트를 Base64 인코딩
    const compressedBase64 = arrayBufferToBase64(compressedBytes);

    // Base64 인코딩된 문자열 반환
    return compressedBase64;
}

function decompressBase64ToString(base64Text) {
    // Base64 문자열을 바이트로 디코딩
    const bytes = atob(base64Text).split('').map(function (char) {
        return char.charCodeAt(0);
    });
    // 압축 해제
    const decompressedBytes = pako.inflate(new Uint8Array(bytes));
    // 바이트를 문자열로 변환
    const decompressedString = new TextDecoder().decode(decompressedBytes);
    return decompressedString;
}


function base64ToUint8Array(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
}