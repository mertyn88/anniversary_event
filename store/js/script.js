import { coordinate } from "./exif.js";
import { address } from "./api.js";

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

async function getDocIndex() {
    let response = await existCouchDB();
    let docIndex = 1;

    // 인덱스 숫자 부여
    if (response['docs'].length > 0) {
        docIndex = Number(response['docs'][0]['number']) + 1;
    }
    console.log(`Target doc index ::: ${docIndex}`);

    return docIndex;
}

function getTagValues() {
    let spans = document.querySelectorAll('#tag-container span');
    let spansArray = Array.from(spans, span => span.textContent);
    console.log(spansArray);

    return spansArray;
}

function settingValues(settings) {
    let insertQuery = JSON.parse(JSON.stringify(query['insert']));
    insertQuery['latitude'] = settings['coordinate']['latitude'];
    insertQuery['longitude'] = settings['coordinate']['longitude'];
    insertQuery['tag'] = [...[settings['address']], ...settings['tag']].map(item => `#${item}`);
    insertQuery['primary'] = `${settings['today']}_${settings['docIndex']}`
    insertQuery['number'] = settings['docIndex'];
    insertQuery['encode'] = settings['encode'];
    insertQuery['caption'] = $('#input_caption').val();

    return insertQuery;
}

$(window).on('load', function () {
    display();

    document.getElementById('image_input').addEventListener('change', function (event) {
        console.log('change');
    });

    // 입력
    $("#btn_insert").click(function () {
        // 리스트 비우기
        $('#listTable tbody').empty();

        console.log('업로드 프로세스 시작');
        Array.from(document.getElementById('image_input').files).forEach((file, index) => {
            (async () => {
                let reader = await loadReader(file);
                let img = await loadImage(reader);
                let imgCoordinate = await coordinate(img);
                console.log(imgCoordinate);
                let imgAddress = await address(imgCoordinate);
                console.log(imgAddress);

                // img resize
                let imgResize = await resize(file, img);
                console.log(imgResize);

                // value set
                let insertQuery = settingValues({
                    'coordinate': imgCoordinate,
                    'address': imgAddress,
                    'encode': await compressStringToBase64(imgResize),
                    'docIndex': await getDocIndex(),
                    'today': today,
                    'index': index,
                    'tag': getTagValues()
                });
                console.log(insertQuery);

                response = await insertCouchDB(insertQuery);
                console.log(response);
            })();
        });

        setTimeout(function () {
            alert('Upload process finish');
            display();
        }, 1000);
    });
});


function display() {
    // 현재 리스트 출력
    // encode 제외
    let selectQuery = JSON.parse(JSON.stringify(query['select']));
    selectQuery['fields'] = selectQuery['fields'].filter(field => field !== 'encode');
    (async () => {
        let response = await selectCouchDB(selectQuery);
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
                    $("<button>").addClass('btn viewBtn').text('보기')
                )
            );
            $('#listTable tbody').append($row);
        });

        $('#listTable').on('click', '.viewBtn', function () {
            viewImage(this);
        });
        
    })();
}

function viewImage(btn) {
    if (btn.getAttribute('data-expanded') === 'true') {
        return;
    }

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