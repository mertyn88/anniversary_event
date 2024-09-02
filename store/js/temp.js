// https://liam:liam@liam-database.fly.dev/netlify-store
// curl -vX PUT https://liam:liam@liam-database.fly.dev/netlify-store/001/2024_08_14.png --data-binary @2024_08_14.png -H "ContentType:image/jpg"
// curl -X GET https://liam:liam@liam-database.fly.dev/netlify-store/001/2024_08_14.png


/*
 db 연결 확인시 성공하면 해당페이지가 나오도록 처리하는 방향 
 아이디 비번은 내가 입력하던
*/

const dbUrl = 'http://localhost:5984';
const dbName = '<database>';
const username = '<username>';
const password = '<password>';

// 문서 생성 및 ID 획득
const createDocument = async () => {
  const response = await fetch(`${dbUrl}/${dbName}`, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(username + ':' + password),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type: 'imageDocument' })
  });

  if (!response.ok) {
    throw new Error('Failed to create document');
  }

  const data = await response.json();
  return data.id; // 랜덤하게 생성된 문서 ID 반환
};


// 이미지 첨부
const attachImage = async (docId, imageBlob) => {
    const attachmentName = 'image.jpg'; // 원하는 첨부 파일 이름
    const url = `${dbUrl}/${dbName}/${docId}/${attachmentName}`;
  
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': 'Basic ' + btoa(username + ':' + password),
        'Content-Type': 'image/jpeg'
      },
      body: imageBlob
    });
  
    if (!response.ok) {
      throw new Error('Failed to attach image');
    }
  
    return await response.json(); // 성공 시 CouchDB의 응답을 반환
  };

// 전체 작업 실행
  const processImageUpload = async (imageBlob) => {
    try {
      const docId = await createDocument(); // 1단계: 문서 생성 및 ID 얻기
      const result = await attachImage(docId, imageBlob); // 2단계: 이미지 첨부
      console.log('Image attached:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // 예시 이미지 Blob 데이터
  const exampleImageBlob = new Blob(['example data'], { type: 'image/jpeg' });
  processImageUpload(exampleImageBlob);