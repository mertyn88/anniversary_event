var audio_music = document.getElementById("audio_music");

$("#audio_music").attr("src", music_json["m_online_url"]);
//audio_music.play(); //자동으로 음악 재생하기

// 음악 재생 일시 중지 제어
function music_switch() {
  // 화면을 빠르게 바꾸다. 전환하다.
  audio_music.play();
}
