Array.prototype.shuffle = function () {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]]; // 요소 교환
  }
  return this;
};


$(document).ready(function () {
  (async () => {

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

    // 이미지 리스트 가져오기
    // 1. 인덱스디비 조회
    let indexResponse = await selectAllIndexedDB();
    let primaryKeys = indexResponse.map(item => item['primary']);

    console.log('#### Indexeddb response');
    console.log(indexResponse);
    console.log(primaryKeys);

    // 2. CouchDB 조회
    query['select']['selector']['primary']['$nin'] = primaryKeys;
    let couchResponse = await selectCouchDB(query['select']);
    console.log('#### CouchDB response');
    console.log(couchResponse['docs']);

    // indexeddb에 할당 처리
    if (couchResponse['docs'].length > 0) {
      writeIndexedDB(couchResponse['docs']);
    }

    // 기존 값과 병합
    mergeResponse = [...couchResponse['docs'], ...indexResponse];
    mergeResponse.shuffle();

    console.log('#### Indexeddb + CouchDB shuffle response');
    console.log(mergeResponse);

    // 화면 출력
    let galleryList = $("#gallery-list");
    mergeResponse.forEach((element, index) => {
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




    $('.gallery-link').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      mainClass: 'mfp-with-zoom mfp-img-mobile',
      image: {
        verticalFit: true,
        titleSrc: function (item) {
          return item.el.find('figcaption').text() || item.el.attr('title');
        }
      },
      zoom: {
        enabled: true
      },
      // duration: 300
      gallery: {
        enabled: true,
        navigateByImgClick: false,
        tCounter: ''
      },
      disableOn: function () {
        return $(window).width() > 640;
      }
    });



    var $grid = $('.grid').isotope({
      masonry: {
        columnWidth: '.gallery-link',
        horizontalOrder: true
      }
    });



    // filter buttons
    $('.filters-button-group').on('click', 'button', function () {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
    });


    $('.button-group').each(function (i, buttonGroup) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on('click', 'button', function () {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
      });
    });

    //$('#all').click();
    

    setTimeout(function () {
      galleryList.show();
      $('#alllll').trigger('click');
      
    }, 1000);
  })();
});

function debounce(fn, threshold) {
  var timeout;
  return function debounced() {
    if (timeout) {
      clearTimeout(timeout);
    }
    function delayed() {
      fn();
      timeout = null;
    }
    timeout = setTimeout(delayed, threshold || 100);
  }
}