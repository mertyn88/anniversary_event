function do_process() {
  // 시작 버튼 숨기기
  hideById("ul_start_btn");
  hideById("div_content");

  // 질문 노출
  showQuestion();
  showById("div_answer");
  showById("ul_submit_btn");

  $("#input_answer").focus();
  // 마지막
  // oy_go_next();
}

function checkAnswer() {
  let question = init_content["data"][question_index]["question"];
  let answer = init_content["data"][question_index]["answer"];
  let input_answer = $("#input_answer").val();

  console.log(question);
  console.log(answer);
  if (input_answer === answer) {
    // Next step
    console.log("정답");
    $("#input_answer").val("");
    question_index += 1;

    if (question_index === init_content["data"].length) {
      console.log("모든 정답 완료");
      // 페이지 이동
      oy_go_next();
      return;
    } else {
      // 문제 세팅
      showQuestion();
    }
  } else {
    // 답변 틀렸을 경우
    alert("다영이가 아니면 예쁜사진 봤으니 나가라!");
    $("#input_answer").val("");
  }
}

function hideById(_id) {
  $("#" + _id).hide();
}

function showById(_id) {
  $("#" + _id).show();
}

function showQuestion() {
  $("#p_question").text(init_content["data"][question_index]["question"]);
  $("#input_answer").focus();
}

function oy_show_note() {
  $("#div_oy_note").show();
}

function oy_hide_note() {
  $("#div_oy_note").hide();
}

function oy_go_next() {
  //$("#div_oy_yes").show();

  alert("다영이가 맞구나!! 여보!! ㅠㅠ");

  setTimeout(function () {
    $("#div_onlyyou").fadeOut();
    init_theme();
  }, 1000);
  setTimeout(function () {
    $("#div_onlyyou").remove();
  }, 2000);
}
