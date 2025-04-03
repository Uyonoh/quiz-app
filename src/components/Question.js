import { useState, useEffect } from 'react';

export default function Question({ question, selectedAnswer, onSelect, onSubmit }) {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  // Shuffle only once when question changes
  useEffect(() => {
    if (question) {
      const allAnswers = [...question.incorrect_answers, question.correct_answer];
      setShuffledAnswers(allAnswers.sort(() => Math.random() - 0.5));
    }
  }, [question]); // Only re-run when question changes

  return (
    <div className="question-container">
      <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
      
      <div className="answers-grid">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            className={`answer-button ${selectedAnswer === answer ? 'selected' : ''}`}
            onClick={() => onSelect(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
      
      <button
        className="submit-button"
        onClick={() => onSubmit(selectedAnswer)}
        disabled={!selectedAnswer}
      >
        Submit
      </button>
    </div>
  );
}