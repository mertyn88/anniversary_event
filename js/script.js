function do_process() {
  // 시작 버튼 숨기기
  hideById("ul_start_btn");
  hideById("div_content");

  // 질문 노출
  showQuestion();
  showById("div_answer");
  showById("ul_submit_btn");

  // 마지막
  // oy_go_next();
}

function checkAnswer() {
  if (question_index === init_content["data"].length - 1) {
    //
    console.log("모든 정답 완료");
  }

  console.log();

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

    // 문제 세팅
    showQuestion();
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
