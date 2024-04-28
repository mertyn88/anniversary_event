/**
 * 주석이 다소 어색할 수 있습니다. 중국어(간체)의 파파고 번역을 복붙했습니다.
 * 해당 파일에서 특별히 수정이 필요한 건 없습니다.
 * 굳이 수정 한다면 아래의 "재생중", "중지함" 메세지일 것입니다.
 */
const musicPlayMessage = "재생중";
const musicPauseMessage = "중지함";

var audio_music = document.getElementById("audio_music");
var audio_record = document.getElementById("audio_record");

if (
  typeof music_json["music_select"] != "undefined" &&
  music_json["music_select"] != "null" &&
  music_json["music_select"] != ""
) {
  if (
    music_json["music_select"] == "m_online" &&
    music_json["m_online_url"] != "null" &&
    music_json["m_online_url"] != ""
  ) {
    // 온라인 목록 선택
    $("#audio_music").attr("src", music_json["m_online_url"]);
  }
  if (
    music_json["music_select"] == "m_upload" &&
    music_json["m_upload_url"] != "null" &&
    music_json["m_upload_url"] != ""
  ) {
    // 온라인 리스트를 선택해서 노래를 올렸거든요
    $("#audio_music").attr("src", music_json["m_upload_url"]);
  }
  if (
    music_json["music_select"] == "m_upload" &&
    (music_json["m_upload_url"] == "null" || music_json["m_upload_url"] == "")
  ) {
    // 온라인 목록을 선택했는데 노래가 안 올라왔어요
    console.log(
      "music_select m_upload but m_upload_url is null, set defaulted music"
    );
    var random_music = random_music_as();
    $("#audio_music").attr("src", random_music);
  }
  if (theme != "audio_list" || (theme == "audio_list" && start_id != "null")) {
    audio_music.play(); //자동으로 음악 재생하기
  } else {
    audio_music.pause();
    console.log("audio_list && no start");
  }
} else {
  // 새로운 작품 혹은 빈 작품
  console.log("set random music");
  var random_music = random_music_as();
  $("#audio_music").attr("src", random_music);
  if (theme != "audio_list" || (theme == "audio_list" && start_id != "null")) {
    audio_music.play(); //자동으로 음악 재생하기
  } else {
    audio_music.pause();
    console.log("audio_list && no start");
  }
}

if (
  typeof record_json["record_bool"] != "undefined" &&
  record_json["record_bool"] != "null" &&
  record_json["record_bool"] != ""
) {
  if (
    record_json["record_bool"] == "r_true" &&
    record_json["r_wechat_url"] != "null" &&
    record_json["r_wechat_url"] != ""
  ) {
    // 음성 선택
    $("#audio_record").attr("src", record_json["r_wechat_url"]);
  }
  if (
    record_json["record_bool"] == "r_true" &&
    (record_json["r_wechat_url"] == "null" || record_json["r_wechat_url"] == "")
  ) {
    //음성 선택, 음성을 녹음하지 않았어요
    $("#div_record").hide(); // 보이지 않음
    $("#div_record_tips").hide();
  }
  if (record_json["record_bool"] == "r_false") {
    // 음성을 사용하지 않으면 표시되지 않음
    $("#div_record").hide();
    $("#div_record_tips").hide();
  }
} else {
  if (theme_content["bool_save"] == false) {
    // 새로운 작품 또는 저장되지 않은 내용, 음성이 정의되지 않음
    console.log("set random record");
    $("#audio_record").attr(
      "src",
      "http://cdn.aitetu520.com/chongqin_shenlin.mp3"
    );
  } else {
    // 새로운 작품이 아니거나 저장된 내용이지만 음성이 정의되지 않은 경우 음성이 표시되지 않습니다
    $("#div_record").hide();
    $("#div_record_tips").hide();
  }
}

function random_music_as() {
  // 템플릿 그림 무작위로 가져오기
  // console.log('random_words_as');
  var random_num = Math.floor(Math.random() * array_as_music.length); //随机取值
  var random_music = array_as_music[random_num];
  return random_music;
}

// 음악 재생 일시 중지 제어
var img_music = document.getElementById("img_music");
var timeout_music;
function music_switch() {
  // 화면을 빠르게 바꾸다. 전환하다.
  clearTimeout(timeout_music);
  if (audio_music.paused) {
    console.log("switch music to play");
    audio_music.play();
    audio_record.pause(); // 음악을 재생할 때 녹음은 반드시 일시 정지한다.
    img_music.style.webkitAnimation = "music_play_rotate 1s linear infinite";
    $(".div_music_tips").html(musicPlayMessage).show();
    timeout_music = setTimeout(function () {
      $(".div_music_tips").hide();
    }, 2500);
  } else {
    console.log("switch music to paused");
    audio_music.pause();
    // audio_record.play();
    img_music.style.webkitAnimation = "";
    $(".div_music_tips").html(musicPauseMessage).show();
    timeout_music = setTimeout(function () {
      $(".div_music_tips").hide();
    }, 2500);
  }
}

var timeout_record;
var div_record = document.getElementById("div_record");
function record_switch() {
  // 화면을 빠르게 바꾸다. 전환하다.
  clearTimeout(timeout_record);
  if (audio_record.paused) {
    console.log("switch record to play");
    audio_record.play();
    audio_music.pause(); //
    img_music.style.webkitAnimation = "";
    div_record.style.webkitAnimation = "btn_rotate 1s linear infinite";
    $(".div_record_tips").html(musicPlayMessage).show();
    timeout_record = setTimeout(function () {
      $(".div_record_tips").hide();
    }, 2500);
  } else {
    console.log("switch record to pause");
    audio_record.pause(); // 음악을 재생할 때 녹음은 반드시 일시 정지한다.
    audio_music.play();
    img_music.style.webkitAnimation = "music_play_rotate 1s linear infinite";
    div_record.style.webkitAnimation = "";
    $(".div_record_tips").html(musicPauseMessage).show();
    timeout_record = setTimeout(function () {
      $(".div_record_tips").hide();
    }, 2500);
  }
}

wx.ready(function () {
  console.log("wx.ready success to start");
  audio_music.play(); // 자동으로 음악 재생하기
  wx.checkJsApi({
    jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function (res) {
      console.log("wx.checkJsApi success");
      if (
        theme != "audio_list" ||
        (theme == "audio_list" && start_id != "null")
      ) {
        audio_music.play(); // 자동으로 음악 재생하기
      } else {
        audio_music.pause();
        console.log("audio_list && no start");
      }
    },
    complete: function (res) {
      console.log("wx.checkJsApi complete");
      if (
        theme != "audio_list" ||
        (theme == "audio_list" && start_id != "null")
      ) {
        audio_music.play(); // 자동으로 음악 재생하기
      } else {
        audio_music.pause();
        console.log("audio_list && no start");
      }
    },
  });
});

wx.error(function (res) {
  console.log("wx.error -> " + res);
  audio_music.play();
  wx.checkJsApi({
    jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"], // 검사가 필요한 JS 인터페이스 목록, 모든 JS 인터페이스 목록은 부록 2와 같다.
    success: function (res) {
      console.log("wx.checkJsApi success");
      if (
        theme != "audio_list" ||
        (theme == "audio_list" && start_id != "null")
      ) {
        audio_music.play(); // 자동으로 음악 재생하기
      } else {
        audio_music.pause();
        console.log("audio_list && no start");
      }
    },
    complete: function (res) {
      console.log("wx.checkJsApi complete");
      if (
        theme != "audio_list" ||
        (theme == "audio_list" && start_id != "null")
      ) {
        audio_music.play(); // 자동으로 음악 재생하기
      } else {
        audio_music.pause();
        console.log("audio_list && no start");
      }
    },
  });
});
