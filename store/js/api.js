export async function address(coordinate) {
    let longitude = coordinate['longitude'];
    let latitude = coordinate['latitude'];

    if (kakaoPrefix === '') {
        return '';
    }
    if (longitude === 0.0 && latitude === 0.0) {
        return '';
    }

    const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `KakaoAK 30b34191c0d77c730ebf9443971e${kakaoPrefix}`  // 여기에 실제 API 키를 입력하세요.
        }
    };

    const response = await (await fetch(url, options)).json();
    console.log(response);
    let region = [];
    if (response['meta']['total_count'] > 0) {
        let address = response['documents'][0]['address'];
        if (address['region_2depth_name'] !== '') region.push(address['region_2depth_name']);
        if (address['region_3depth_name'] !== '') region.push(address['region_3depth_name']);
    }
    return region.join(' ');
}