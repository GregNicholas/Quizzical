import React from "react";
import Intro from "./Intro";
import Quiz from "./Quiz";

export default function App() {
  const [enterQuiz, setEnterQuiz] = React.useState(false);
  const [quizData, setQuizData] = React.useState();
  const [newQuestions, setNewQuestions] = React.useState(true);
  const [quizLink, setQuizLink] = React.useState("");

  React.useEffect(() => {
    fetch(quizLink)
      .then((res) => res.json())
      .then((data) => setQuizData(data.results));
  }, [quizLink, newQuestions]);

  const handleSubmit = (formData) => {
    const linkRoot = "https://opentdb.com/api.php?amount=5";
    const category = formData.category
      ? "&category=" +
        formData.category.slice(formData.category.indexOf("_") + 1)
      : "&category=9";
    const difficulty = formData.difficulty
      ? "&difficulty=" + formData.difficulty
      : "&difficulty=easy";
    setQuizLink(linkRoot + category + difficulty + "&type=multiple");
    setEnterQuiz(true);
  };

  const shuffleAnswers = (answers) => {
    //Fisher-Yates shuffle
    for (let i = answers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
  };

  //html character codes were displaying on page
  const htmlDecode = (input) => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  };

  let questions;
  if (quizData) {
    questions = quizData.map((q, i) => {
      const incorrect = q.incorrect_answers.map((a) => {
        return { answer: htmlDecode(a), isCorrect: false };
      });
      const correct = { answer: htmlDecode(q.correct_answer), isCorrect: true };
      const allAnswers = [...incorrect, correct];
      shuffleAnswers(allAnswers);
      return {
        ...q,
        index: i,
        question: htmlDecode(q.question),
        answers: allAnswers
      };
    });
  }

  return (
    <div className="main">
      {!enterQuiz && (
        <Intro setQuizLink={() => setQuizLink} handleSubmit={handleSubmit} />
      )}
      {enterQuiz && (
        <Quiz
          questions={questions}
          quizData={quizData}
          setQuizLink={setQuizLink}
          quizLink={quizLink}
          setNewQuestions={() => setNewQuestions((prev) => !prev)}
          resetGame={() => setEnterQuiz(false)}
        />
      )}
    </div>
  );
}
