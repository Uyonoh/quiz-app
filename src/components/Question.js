import { useState } from 'react';

          function Question({ question, selectedAnswer, onSelect, onSubmit }) {
            const allAnswers = [...question.incorrect_answers, question.correct_answer]
              .sort(() => Math.random() - 0.5);
            
            return (
              <div className="question-container">
                <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
                
                <div className="answers-grid">
                  {allAnswers.map((answer, index) => (
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

          export default Question;