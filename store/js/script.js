import { coordinate } from "./exif.js";

const manageQuery = query;
const insertQueries = [];


function loadImage(reader) {
    return new Promise((resolve, reject) => {
        var img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        
        img.src = reader;
    });
}

function loadReader(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}

$(window).on('load', function() {
    display();

    document.getElementById('image_input').addEventListener('change', function (event) {
        Array.from(event.target.files).forEach(file => {

            /*
            (async () => {
                let reader = await loadReader(file);
                let image = await loadImage(reader);
                let imageCoordinate = await coordinate(image);
                console.log(imageCoordinate);

                console.log('휴');
                이후 리팩토링 재게
            })();
            */

            var reader = new FileReader();
            reader.onload = function (e) {
                var img = new Image();
                img.src = e.target.result;

                img.onload = function () {
                    EXIF.getData(img, function () {
                        var exifLong = EXIF.getTag(this, "GPSLongitude");
                        var exifLat = EXIF.getTag(this, "GPSLatitude");
                        var exifLongRef = EXIF.getTag(this, "GPSLongitudeRef");
                        var exifLatRef = EXIF.getTag(this, "GPSLatitudeRef");

                        // Deep copy
                        let insertQuery = JSON.parse(JSON.stringify(query['insert']));

                        if (exifLat && exifLong) {
                            // 위도와 경도를 도분초(DMS)에서 십진수로 변환
                            //var lat = convertToDecimal(latitude, latRef);
                            //var lon = convertToDecimal(longitude, lonRef);

                            if (exifLatRef == "S") {
                                var latitude = (exifLat[0] * -1) + (((exifLat[1] * -60) + (exifLat[2] * -1)) / 3600);
                            } else {
                                var latitude = exifLat[0] + (((exifLat[1] * 60) + exifLat[2]) / 3600);
                            }

                            if (exifLongRef == "W") {
                                var longitude = (exifLong[0] * -1) + (((exifLong[1] * -60) + (exifLong[2] * -1)) / 3600);
                            } else {
                                var longitude = exifLong[0] + (((exifLong[1] * 60) + exifLong[2]) / 3600);
                            }

                            // 주소값 가져오기
                            const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`;
                            const options = {
                                method: 'GET',
                                headers: {
                                    'Authorization': `KakaoAK 30b34191c0d77c730ebf9443971e${kakaoPrefix}`  // 여기에 실제 API 키를 입력하세요.
                                }
                            };

                            fetch(url, options)
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    if (data['meta']['total_count'] > 0) {
                                        let address = data['documents'][0]['address'];
                                        console.log(address);
                                        // region_1depth_name + region_2depth_name + region_3depth_name


                                        insertQuery['latitude'] = latitude;
                                        insertQuery['longitude'] = longitude;

                                        let region = [];
                                        if (address['region_2depth_name'] !== '') region.push(address['region_2depth_name']);
                                        if (address['region_3depth_name'] !== '') region.push(address['region_3depth_name']);

                                        console.log(region.join(' '));
                                        insertQuery['tag'].push(region.join(' '));

                                        // 태그 표시
                                        //$('#input_tag').val(region.join(' '));
                                    }
                                })
                                .catch(error => console.error('Error:', error));


                            console.log("Latitude: " + latitude);
                            console.log("Longitude: " + longitude);

                        } else {
                            console.log("GPS data not found.");

                            insertQuery['latitude'] = 0.0;
                            insertQuery['longitude'] = 0.0;
                        }

                        insertQueries.push(insertQuery);
                    });
                };
            };

            reader.readAsDataURL(file);
        });
    });

    // 입력
    $("#btn_insert").click(function () {
        // 리스트 비우기
        $('#listTable tbody').empty();

        const fileInput = document.getElementById('image_input');
        Array.from(fileInput.files).forEach((file, index) => {
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = new Image();
                img.src = e.target.result;

                img.onload = function () {
                    // 이미지 사이즈 처리가 필요하다면 여기에 로직을 구현합니다.

                    console.log('시작');
                    (async () => {
                        try {
                            console.log(file);
                            let resizeFile = await resize(file, img);
                            console.log(resizeFile);
                            let compressedBase64 = await compressStringToBase64(resizeFile);

                            let response = await existCouchDB();
                            let docIndex = 1;

                            // 인덱스 숫자 부여
                            if (response['docs'].length > 0) {
                                docIndex = Number(response['docs'][0]['number']) + 1;
                            }

                            // 태그 값 확인
                            let spans = document.querySelectorAll('#tag-container span');
                            let spansArray = Array.from(spans, span => span.textContent);
                            console.log(spansArray);

                            // 두 배열 병합후 # 처리
                            insertQueries[index]['tag'] = [...insertQueries[index]['tag'], ...spansArray].map(item => `#${item}`);
                            insertQueries[index]['caption'] = $('#input_caption').val();
                            insertQueries[index]['primary'] = `${today}_${docIndex + index}`
                            insertQueries[index]['number'] = docIndex + index;
                            insertQueries[index]['encode'] = compressedBase64;

                            response = await insertCouchDB(insertQueries[index]);
                            console.log(response);

                        } catch (error) {
                            console.error('에러 발생', error);
                        }
                    })(); // 여기에 ()를 추가하여 async 함수를 즉시 실행합니다.
                };
            };

            reader.readAsDataURL(file);
        });


        setTimeout(function () {
            alert('업로드 완료');
            display();
        }, 1000);
    });
});

// 태그 값 저장
const tagInput = document.getElementById('input_tag');
const tagContainer = document.getElementById('tag-container');

tagInput.addEventListener('keyup', function (event) {
    if (event.key === ',') {
        const inputValue = tagInput.value.trim().slice(0, -1);  // Remove trailing comma
        if (inputValue) {
            createTag(inputValue);
            tagInput.value = '';  // Clear input field after adding tag
        }

        console.log($('#input_tag').val());
    }
});

function createTag(text) {
    const tag = document.createElement('span');
    tag.classList.add('tag');
    tag.textContent = text;
    tagContainer.insertBefore(tag, tagInput);
}

// 도분초(DMS) 형식을 십진수로 변환하는 함수
function convertToDecimal(coordinate, coordinateRef) {
    var decimal = coordinate[0] + (coordinate[1] / 60) + (coordinate[2] / 3600);

    if (coordinateRef === "S" || coordinateRef === "W") {
        decimal = decimal * -1;
    }

    return decimal;
}




function display() {
    // 현재 리스트 출력
    // encode 제외
    manageQuery['select']['fields'] = manageQuery['select']['fields'].filter(field => field !== 'encode');
    (async () => {
        let response = await selectCouchDB(manageQuery['select']);
        console.log(response);

        response['docs'].forEach((element, index) => {
            var $row = $('<tr>').append(
                $('<td>').text(index),
                $('<td>').text(element['tag']),
                $('<td>').text(element['caption']),
                $('<td>').text(element['primary']),
                $('<td>').append(
                    //$('<button>').addClass('btn_edit').text('수정'),
                    //$('<button>').addClass('btn').text('삭제'),
                    $("<button onclick='javascript:viewImage(this)'>").addClass('btn viewBtn').text('보기')
                )
            );
            $('#listTable tbody').append($row);
        });
    })();
}

function viewImage(btn) {
    // 클릭된 버튼의 tr 요소 가져오기
    var tr = btn.closest('tr');
    // 해당 tr에서 4번째 <td> 요소 가져오기 (인덱스 3)
    var fourthTd = tr.getElementsByTagName('td')[3];
    // 4번째 <td>의 텍스트 가져오기
    var text = fourthTd.textContent;

    btn.setAttribute('data-expanded', 'true');
    const imageRow = document.createElement('tr');
    imageRow.className = 'image-row';
    const imageCell = document.createElement('td');
    imageCell.colSpan = 5; // 테이블의 컬럼 수에 따라 조정
    const img = document.createElement('img');

    (async () => {
        const q = {
            "selector": {
                "primary": {
                    "$eq": text
                }
            },
            "fields": [
                "encode"
            ]
        };

        let response = await selectCouchDB(q);
        console.log(response);

        response['docs'].forEach((element, index) => {
            img.src = decompressBase64ToString(element['encode']);
            imageCell.appendChild(img);
            imageRow.appendChild(imageCell);
            tr.parentNode.insertBefore(imageRow, tr.nextSibling);
            imageRow.style.display = 'table-row'; // 이미지 행 보이기
        });
    })();
}