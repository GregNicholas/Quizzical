import React from "react";
import Answer from "./Answer";

export default function Question({
  chosenAnswers,
  setChosenAnswers,
  q,
  gameEnd,
  submitAnswers
}) {
  const clickAnswer = (ans) => {
    const updatedChosenAnswers = [...chosenAnswers];
    updatedChosenAnswers[q.index] = ans;
    setChosenAnswers(updatedChosenAnswers);
  };

  const styles = {
    backgroundColor: "#D6DBF5"
  };

  const question = (
    <div key={q.question}>
      <h4 className="question">{q.question}</h4>
      <div className="answers">
        {q.answers.map((a) => {
          return (
            <Answer
              key={a.answer}
              styles={styles}
              index={q.index}
              a={a}
              gameEnd={gameEnd}
              chosenAnswers={chosenAnswers}
              clickAnswer={clickAnswer}
              submitAnswers={submitAnswers}
            />
          );
        })}
      </div>
      <div className="underline"></div>
    </div>
  );
  return question;
}
