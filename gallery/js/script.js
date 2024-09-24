import { galleryPopup } from "./filter.js";


Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]]; // 요소 교환
    }
    return this;
};


async function displayTag() {
    // 태그 목록 가져오기
    let response = await await fetchGetRequest('/_design/tag_design_doc/_view/unique_tags?group=true&descending=true');
    console.log('#### Tag response');
    console.log(response);

    let groupList = $("#group-list");
    response['rows'].forEach((element, index) => {
        let className = element['key'].replace(/ /g, "_").replace(/#/g, "");

        let buttonString = $('<button class="button" data-filter=".' + className + '">' + element['key'] + ' (' + element['value'] + ')' + '</button>');
        groupList.append(buttonString); // 버튼을 group-list 안에 추가
    });
}

async function getIndexedDB() {
    let response = await selectAllIndexedDB();
    console.log('#### Indexeddb response');
    console.log(response);

    return response;
}

async function getCouchDB(primaryKeys) {
    console.log('#### Not in primarykey list');
    console.log(primaryKeys);

    query['select']['selector']['primary']['$nin'] = primaryKeys;
    let response = (await selectCouchDB(query['select']))['docs'];

    console.log('#### CouchDB response');
    console.log(response);

    // indexeddb에 할당 처리
    if (response.length > 0) {
        writeIndexedDB(response);
    }

    return response;
}

async function concatDB(indexResponse, couchResponse) {
    let response = [...indexResponse, ...couchResponse];
    response.shuffle();
    console.log('#### Indexeddb + CouchDB shuffle response');
    console.log(response);

    return response;
}

async function displayGallery(response) {
    // 화면 출력
    let galleryList = $("#gallery-list");
    response.forEach((element, index) => {
        let decodeImage = decompressBase64ToString(element['encode']);
        let tagName = element['tag'].map(item => item.replace('#', '').replace(/\s/g, '_')).join(' ');
        let caption = element['tag'].join(' ') + '<br>' + element['caption'];


        var galleryItem = `
        <a class='gallery-link ${tagName}' href='${decodeImage}'>
            <figure class='gallery-image'>
                <img src='${decodeImage}'>
                <figcaption>${caption}</figcaption>
            </figure>
        </a>
      `;
        galleryList.append(galleryItem); // 버튼을 group-list 안에 추가
    });
}


$(document).ready(function () {
    (async () => {

        // 태그 
        displayTag();

        let indexResponse = await getIndexedDB();
        let couchResponse = await getCouchDB(indexResponse.map(item => item['primary']));
        let mergeResponse = await concatDB(indexResponse, couchResponse);

        // 갤러리 노출
        await displayGallery(mergeResponse);
        // 갤러리 팝업 선언
        await galleryPopup();
    })();
});