import { useQuiz } from '../context/QuizContext';

          function Results() {
            const { state, dispatch } = useQuiz();
            
            const score = state.answers.filter(a => a.isCorrect).length;
            const total = state.answers.length;
            
            const restartQuiz = () => {
              dispatch({ type: 'RESTART_QUIZ' });
            };
            
            return (
              <div className="results-container">
                <h1>Quiz Completed!</h1>
                <h2>Your Score: {score}/{total}</h2>
                
                <div className="results-grid">
                  {state.answers.map((answer, index) => (
                    <div 
                      key={index} 
                      className={`result-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}
                    >
                      <h3>Question {index + 1}</h3>
                      <p dangerouslySetInnerHTML={{ __html: answer.question }} />
                      <div className="answer-comparison">
                        <p>Your answer: <span dangerouslySetInnerHTML={{ __html: answer.userAnswer }} /></p>
                        {!answer.isCorrect && (
                          <p>Correct answer: <span dangerouslySetInnerHTML={{ __html: answer.correctAnswer }} /></p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button onClick={restartQuiz} className="restart-button">
                  Start New Quiz
                </button>
              </div>
            );
          }

          export default Results;