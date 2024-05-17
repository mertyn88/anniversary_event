function init_onlyyou() {
  // 두 div의 높이를 초기화
  $("#div_onlyyou").css({ height: $(window).height() + "px" });
  //$("#div_oy_inner").css({ height: $(window).height() + 260 + "px" });

  $("#div_onlyyou").css({
    "background-image": "url(" + start_content["bg_img"] + ")",
    "background-repeat": "no-repeat",
  }); // 사용자 정의 배경 설정
  $(".div_oy_text .p_oy_text").html(start_content["text"]); // 사용자 정의 불러오기 - 내용
  $(".img_oy_text").attr("src", start_content["img_src"]); // 사용자 정의 불러오기 - 이미지
}

function do_process() {
  alert("start");
}

function showQuestion() {
  $("#question").text(
    start_content["question"][start_content["question_index"]].question,
  );
  $("#answer").val("");
}

function oy_show_note() {
  $("#div_oy_note").show();
}

function oy_hide_note() {
  $("#div_oy_note").hide();
}

function oy_go_next() {
  $("#div_oy_yes").show();
  setTimeout(function () {
    $("#div_onlyyou").fadeOut();
    init_theme();
  }, 2000);
  setTimeout(function () {
    $("#div_onlyyou").remove();
  }, 3000);
}
