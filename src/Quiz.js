import React from "react";
import Question from "./Question";

export default function Quiz(props) {
  const [chosenAnswers, setChosenAnswers] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [score, setScore] = React.useState(0);

  const submitAnswers = () => {
    let submitIfZero = 0;
    const length = chosenAnswers.length;
    for (let i = 0; i < length; i++) {
      if (chosenAnswers[i] === undefined) {
        ++submitIfZero;
        i = length;
      }
    }
    if (chosenAnswers.length === props.questions.length && submitIfZero === 0) {
      setScore(chosenAnswers.filter((a) => a.isCorrect === true).length);
      setIsSubmitted(true);
    }
    if (isSubmitted) {
      setChosenAnswers([]);
      setScore(0);
      setIsSubmitted(false);
      props.setNewQuestions();
      props.resetGame();
    }
  };

  const questionDisplay = props.questions
    ? props.questions.map((q) => {
        return (
          <Question
            key={q.question}
            chosenAnswers={chosenAnswers}
            setChosenAnswers={setChosenAnswers}
            q={q}
            gameEnd={isSubmitted}
            submitAnswers={() => submitAnswers()}
          />
        );
      })
    : "";

  return (
    <div className="quiz-container">
      {props.quizLink && questionDisplay}
      <div className="game-info">
        {isSubmitted && (
          <div className="game-results">
            You scored {score}/{props.questions.length} correct answers
            {score === props.questions.length ? "!" : ""}
          </div>
        )}
        <button onClick={submitAnswers} className="check-answers-btn">
          {isSubmitted ? "Play Again" : "Check Answers"}
        </button>
      </div>
    </div>
  );
}
