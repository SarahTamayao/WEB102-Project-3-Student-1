import React, { useState } from "react";
import { Sparkle } from "lucide-react";

const difficultyLevels = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export const Card = ({
  question,
  answer,
  imagePath,
  difficulty,
  hasFlipped,
  handleFlip,
}) => {
  return (
    <div className="card-container">
      <div
        onClick={handleFlip}
        className={`card ${hasFlipped ? "flipped" : ""}`}
      >
        <div className="trivia-question">
          <div className="trivia-image-container">
            {imagePath !== "" && (
              <img src={imagePath} alt="Card Image" className="trivia-image" />
            )}
          </div>
          <p className="trivia-text">{question}</p>
          <div className="difficulty-container">
            <span className="difficulty-text">Difficulty: </span>
            {Array.from({ length: difficultyLevels[difficulty] }).map(
              (_, key) => (
                <Sparkle key={key} size={26} color="gold" strokeWidth={2} />
              )
            )}
          </div>
        </div>

        {hasFlipped && (
          <div className="trivia-answer">
            <p className="trivia-text">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};
