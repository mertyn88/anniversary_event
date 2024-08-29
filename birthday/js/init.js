let question_index = 0;
const init_content = {
  text: "당신은... 나의 아내가 맞는가? 사랑스러운 나의 아내 다영이만 올 수 있는 곳인데... <br>다영이가 맞는지 확인을 해야겠어 !!<br><um style='color: #F44336;font-weight:300;'>내가 내는 문제를 맞춰봐!!</um>",
  data: [
    {
      question: "남편의 생년월일은?! 6자리로 입력",
      answer: "880421",
      message: "다영이가 남편 생일을 몰라? 다영이 아니면 돌아가라",
    },
    {
      question: "우리 연애의 시작일은?! 6자리로 입력",
      answer: "170603",
      message: "다영이가 연애 시작일을 몰라? 너 누구야!",
    },
    {
      question: "우리 결혼날짜는? 6자리로 입력",
      answer: "230520",
      message: "다영이가 아니면 예쁜사진 봤으니 나가라!",
    },
    {
      question: "우리집 비밀번호는?!",
      answer: "1503",
      message: "다영이가 집 비밀번호를 모를리가 없다! 다영이만 와라!",
    },
    {
      question: "이준명 VS 김수현",
      answer: "이준명",
      message: "다영이는 내가 제일 잘생겼다고 했는데...",
    },
  ],
  bg_style: "bg_custom",
  bg_img: "images/2.jpg",
  img_bool: "img_true",
  img_src: "images/1.gif",
};

// 날짜 구하기
var today = new Date();
var year = today.getFullYear(); // 년도
var month = today.getMonth() + 1; // 월
var date = today.getDate(); // 날짜
var day = today.getDay(); // 요일
var hours = today.getHours(); // 시
var minutes = today.getMinutes(); // 분
var seconds = today.getSeconds(); // 초

function date_diff(before_date) {
  before_date = Math.floor(new Date(before_date).getTime() / 1000);
  let now_date = Math.floor(Date.now() / 1000);
  return Math.floor((now_date - before_date) / (60 * 60 * 24)) - 1;
}

const theme_content = {
  pure_words_content: `<br>
${year}년 ${month}월 ${date}일 ${hours}시 ${minutes}분 ${seconds}초, 작성되는 준명이의 편지

To.사랑하는 다영이에게

오늘은 우리가 만난지 <um style='color: #F44336;font-weight: 300;'>${date_diff("2017-06-03")}일</um>, 서로의 인생에 영원한 약속을 한 지  <um style='color: #F44336;font-weight: 300;'>${date_diff("2023-05-20")}일</um>이 되는 날이야. 다영이와 함께한 시간이 나에겐 인생에서 가장 아름다운 날이였어.

가끔 외로움이 있지만 혼자지내는것도 좋다고 말했던 내가, 이제는 혼자보다는 사랑하는 사람과 함께 있는것이 가장 좋다고 말할 수 있어.

항상 다영이를 사랑했지만, 더 커질 수 없다고 느꼈던 사랑이 이제 부부가 됨으로써 더 커지게 된것 같아. 게임으로 치자면 전직????!!!!!

그리고 우리의 커다란 기적, 호떡이가 함께 하면서 더욱 행복해 질거야. 물론 우리도 다른 부부들처럼 육아를 힘들어 하고.. 잠도 제대로 못자고..

서로 예민해지고 의견차이로 인해 싸울 수도 있겠지.. 하지만 그 상황을 슬기롭게 해결할 수 있다면 지금보다도 더한 사랑을, 현재와 앞으로의 미래가 우리의 인생에서 가장

아름다운 날이 될것 같아.

다영이이자 준명이의 아내면서 호떡이의 엄마!

앞으로의 인생이 마냥 핑크빛은 아니지만 우리 함께 하면서 잘 사랑하고, 호떡이도 잘 키워보자!

사랑해 다영아!`,
  typed_bool: "typed_y",
  cursor_char: "cursor_heart",
  bg_style_pure_words: "bg_opacity",
  bg_img: "images/3.jpg",
  simple_page_content: "",
  video_page_content: "",
};

// 클라이언트 디바이스 판단, 메타데이터 쓰기
if (navigator.userAgent.indexOf("Android") != -1) {
  var version = parseFloat(RegExp.$1);
  if (version > 2.3) {
    var width =
      window.outerWidth == 0 ? window.screen.width : window.outerWidth;
    var phoneScale = parseInt(width) / 500;
    document.write(
      '<meta name="viewport" content="width=500, minimum-scale = ' +
        phoneScale +
        ", maximum-scale = " +
        phoneScale +
        ', target-densitydpi=device-dpi">',
    );
  } else {
    document.write(
      '<meta name="viewport" content="width=500, target-densitydpi=device-dpi, user-scalable=0">',
    );
  }
} else if (navigator.userAgent.indexOf("iPhone") != -1) {
  var phoneScale = parseInt(window.screen.width) / 500;
  document.write(
    '<meta name="viewport" content="width=500, min-height=750, initial-scale=' +
      phoneScale +
      ", maximum-scale=" +
      phoneScale +
      ', user-scalable=0" /> ',
  ); //0.75   0.82
} else {
  document.write(
    '<meta name="viewport" content="width=500, height=750, initial-scale=0.64" /> ',
  ); //0.75  0.82
}

var music_json = {
  music_select: "m_online",
  m_online_id: "7",
  m_online_url: "images/디에이드-묘해 너와.mp3",
  m_upload_name: "null",
  m_upload_url: "null",
};
console.log(music_json);
var record_json = {
  record_bool: "r_false",
  r_wechat_time: "null",
  r_wechat_url: "null",
  r_wechat_amr: "null",
};
console.log(record_json);

var main_title = "I Love You ❤️";

// console.log(main_title);
if (main_title == "" || main_title == "null") {
  // 제목이 빈 경우 아래 타이틀 삽입
  document.title = "I Love You ❤️";
}

var window_height = $(window).height();
console.log("window_height ->" + window_height);
var pure_words_content = theme_content["pure_words_content"];
var str_cursorChar;
var typed_bool;
var interval_pw_height;
var height_div_pw = $(".div_pure_words_height").height();

function init_pure_words() {
  $(".div_pure_words_height").html(pure_words_content); // 복사 내용을 초기화하고 문서 높이를 늘립니다
  // div의 bg 그림 초기화 설정
  if (
    typeof theme_content["bg_style_pure_words"] != "undefined" &&
    theme_content["bg_style_pure_words"] == "bg_opacity"
  ) {
    if (
      typeof theme_content["bg_img"] != "undefined" &&
      theme_content["bg_img"] != ""
    ) {
      $(".div_pure_words_bg").css({
        "background-image": "url(" + theme_content["bg_img"] + ")",
      });
    }
  }
  // 다음은 타이핑 효과의 js입니다.
  if (
    typeof theme_content["cursor_char"] != "undefined" &&
    theme_content["cursor_char"] != ""
  ) {
    switch (
      theme_content["cursor_char"] // 타이핑 커서 스타일 설정
    ) {
      case "cursor_heart":
        str_cursorChar = '<um style="color: #F44336;">❤</um>';
        break;
      case "cursor_sub":
        str_cursorChar = "_";
        break;
      case "cursor_music":
        str_cursorChar = "♫";
        break;
      case "cursor_star":
        str_cursorChar = "★";
        break;
      case "cursor_sun":
        str_cursorChar = "☀";
        break;
      default:
        str_cursorChar = "|";
    }
  } else {
    // 새로운 작품을 처리하고, 기본적으로 타이핑 효과를 표시합니다.
    str_cursorChar = "❤";
  }

  // 사용자가 타이핑 효과를 선택했는지 여부를 판단하다
  if (
    typeof theme_content["typed_bool"] != "undefined" &&
    theme_content["typed_bool"] != ""
  ) {
    typed_bool = theme_content["typed_bool"] == "typed_y" ? true : false;
  } else {
    typed_bool = false; // 기본적으로 타이핑 효과 보이기
  }

  display_pure_words();
  $(".div_pure_words").fadeIn();

  interval_pw_height = setInterval(function () {
    console.log(
      "div_pure_words_height -> " + $(".div_pure_words_height").height(),
    );
    var least_height_div_pw = $(".div_pure_words_height").height();
    if (least_height_div_pw > height_div_pw) {
      height_div_pw = least_height_div_pw;
    } else {
      clearInterval(interval_pw_height);
      $(".div_pure_words_height").height(least_height_div_pw + 100);
      if ($(".div_pure_words_height").height() < window_height) {
        $(".div_pure_words_height").height(window_height); // 창 높이보다 작을 수 없음
        console.log("let us be high as window");
      }
    }
  }, 100);
}

function display_pure_words() {
  if (typed_bool) {
    var typed_pure_words = new Typed("#span_pw_typed", {
      strings: [pure_words_content], // 내용 입력, HTML 태그 지원
      typeSpeed: 80, // 타이핑 속도
      cursorChar: str_cursorChar, // 커서 스타일 바꾸기
      contentType: "html", // 값이 html일 경우 인쇄된 텍스트 라벨을 html 라벨로 직접 해석
      onComplete: function (abc) {
        // console.log(abc);
        console.log("finished typing words");
        // console.log($('#span_pw_typed').height()-$(".div_pure_words_height").height());
      },
    });
  } else {
    // 타이핑이 필요하지 않으면 바로 표시
    $("#span_pw_typed").html(pure_words_content).fadeIn();
  }
  init_attachment();
}

var start_id;
$(function () {
  // 이 이벤트는 인터랙티브한 아이디어를 촉발합니다
  start_id = "onlyyou"; // null일 수 있음
  init_start(start_id);
});

function init_start(start_id) {
  console.log("init_start ->" + start_id);
  switch (start_id) {
    case "loveformat":
      $(".div_loveformat").show();
      init_loveformat();
      break;
    case "hearttree":
      $("#div_hearttree").show();
      init_hearttree();
      break;
    case "courage":
      $("#div_courage").show();
      init_courage();
      break;
    case "birthdaycake":
      $("#div_dbcake").show();
      init_birthdaycake();
      break;
    case "intersect":
      $("#div_intersect").show();
      init_intersect();
      break;
    case "onlyyou":
      $("#div_onlyyou").show();
      init_onlyyou();
      break;
    default:
      init_theme();
  }
}

// 애니메이션 본체 시작
function init_theme() {
  console.log("init_theme");

  // 날짜 구하기
  year = today.getFullYear(); // 년도
  month = today.getMonth() + 1; // 월
  date = today.getDate(); // 날짜
  day = today.getDay(); // 요일
  hours = today.getHours(); // 시
  minutes = today.getMinutes(); // 분
  seconds = today.getSeconds(); // 초

  $("#div_start_bg").fadeOut();
  init_pure_words();
}
var attachment = "null"; // null일 수 있음
var attached_content = {
  bool_save: false,
}; // null일 수 있음
console.log(attached_content);

function init_attachment() {
  // attachment 시작
  console.log("init_attachment ->" + attachment);
  switch (attachment) {
    case "timer":
      init_at_timer();
      break;
    default:
      return;
  }
}

function init_onlyyou() {
  // 두 div의 높이를 초기화
  $("#div_onlyyou").css({ height: $(window).height() + "px" });
  //$("#div_oy_inner").css({ height: $(window).height() + 260 + "px" });

  $("#div_onlyyou").css({
    "background-image": "url(" + init_content["bg_img"] + ")",
    "background-repeat": "no-repeat",
  }); // 사용자 정의 배경 설정
  $("#div_content").html(init_content["text"]); // 사용자 정의 불러오기 - 내용
  $(".img_oy_text").attr("src", init_content["img_src"]); // 사용자 정의 불러오기 - 이미지
}
