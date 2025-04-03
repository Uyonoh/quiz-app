import './QuestionTimer.css';

          function QuestionTimer({ timeLeft, totalTime }) {
            const percentage = (timeLeft / totalTime) * 100;
            
            return (
              <div className="timer-container">
                <div 
                  className="timer-progress"
                  style={{
                    background: `conic-gradient(
                      var(--color-primary) ${percentage}%, 
                      var(--color-bg) ${percentage}% 100%
                    )`
                  }}
                >
                  <span>{timeLeft}s</span>
                </div>
              </div>
            );
          }

          export default QuestionTimer;