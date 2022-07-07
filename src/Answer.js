import React from "react";

export default function Answers({
  a,
  index,
  clickAnswer,
  chosenAnswers,
  submitAnswers,
  gameEnd,
  selected
}) {
  const btnStyles = {};
  if (chosenAnswers[index]) {
    if (a.answer === chosenAnswers[index].answer) {
      btnStyles.backgroundColor = gameEnd ? "#F8BCBC" : "#D6DBF5";
      btnStyles.border = "none";
    }
  }
  if (gameEnd) {
    btnStyles.cursor = "default";
    if (a.isCorrect) {
      btnStyles.backgroundColor = "#94D7A2";
      btnStyles.border = "none";
    }
  }
  const handleClick = () => {
    if (!gameEnd) {
      clickAnswer(a);
    }
  };

  return (
    <>
      <div style={btnStyles} onClick={handleClick} className="answer-btn">
        <div className="answer">{a.answer} </div>
      </div>
    </>
  );
}
