import React from "react";

export const InputField = ({
  formData,
  isAnswerCorrect,
  handleFormSubmit,
  handleFormChange,
}) => {
  return (
    <form className="input-field-section" onSubmit={handleFormSubmit}>
      <div>
        {isAnswerCorrect !== null && (
          <span
            style={{
              color: isAnswerCorrect ? "#16d394ff" : "#cf3737ff",
              fontSize: "1.2rem",
            }}
          >
            {isAnswerCorrect ? "Correct!" : "Incorrect! Try again."}
          </span>
        )}
      </div>
      <div className="input-field-container">
        <label htmlFor="guess">Guess your answer:</label>
        <input
          name="guess"
          id="guess"
          type="text"
          value={formData.guess}
          onChange={handleFormChange}
          placeholder="Type here..."
          className="input-field"
          required
        />
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </div>
    </form>
  );
};
