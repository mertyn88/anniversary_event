
async function fileToBase64(file) {
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


async function compressStringToBase64(file) {
    const text = await fileToBase64(file);
    
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


function dataURLToFile(dataUrl, fileName, mimeType) {
    const arr = dataUrl.split(',');
    const mime = mimeType || arr[0].match(/:(.*?);/)[1]; // MIME 타입 추출
    const bstr = atob(arr[1]); // Base64 디코딩
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n); // 바이너리 데이터를 배열에 저장
    }

    // Blob 객체를 생성하고, 이를 File 객체로 변환
    return new File([u8arr], fileName, { type: mime });
}

async function resize(file, img) {
    const maxWidth = 1000; // 최대 너비
    const maxHeight = 1600; // 최대 높이

    const width = img.width;
    const height = img.height;
    // 이미지가 최대 크기를 초과하는 경우 비율 유지하면서 크기 조정
    let newWidth = width;
    let newHeight = height;

    if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        newWidth = width * ratio;
        newHeight = height * ratio;

        console.log("Old Width :: " + width);
        console.log("Old Height :: " + height);
        console.log("New Width :: " + newWidth);
        console.log("New Height :: " + newHeight);
    }

    // <canvas>를 사용해 이미지 크기 조정
    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, newWidth, newHeight);

    // 압축된 이미지를 데이터 URL로 변환
    const dataUrl = canvas.toDataURL(file.type, 0.9); // 품질 0.9 (1이 최고 품질)

    // dataURL을 File 객체로 변환
    const resizedFile = dataURLToFile(dataUrl, file.name, file.type);
    //console.log(resizedFile);
    
    return resizedFile;
}


function resizeFileAsync(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                // 이미지 사이즈
                const resizedFile = resize(file, img);
                resolve(resizedFile); // Promise가 완료되면 반환
            };

            img.onerror = reject; // 이미지 로드 실패 시
        };

        reader.onerror = reject; // 파일 읽기 실패 시
        reader.readAsDataURL(file);
    });
}