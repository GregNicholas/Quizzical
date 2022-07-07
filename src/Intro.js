import React from "react";
import GameForm from "./GameForm";

export default function Intro(props) {
  return (
    <div className="intro-container">
      <div className="title">Quizzical!</div>
      <p className="tag-line">The hottest quiz game on Earth...</p>
      <GameForm
        setQuizLink={() => props.setQuizLink}
        handleSubmit={props.handleSubmit}
      />
    </div>
  );
}
