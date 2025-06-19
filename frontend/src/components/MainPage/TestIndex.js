import "../../App.css";
import "../../assets/styles/TestIndex.css";
import { useState, useCallback } from "react";
import {
  QUIZ_QUESTIONS,
  COST_RANGES,
  DISCLAIMER_TEXT,
} from "../Constants/Questions.js";

export default function TattooCostEstimator() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Храним выбранные ответы {questionId: points}

  const handleAnswerSelect = useCallback(
    (questionId, points) => {
      // Обновляем баллы: сначала вычитаем старый балл за этот вопрос (если был), потом добавляем новый
      const previousPointsForQuestion = selectedAnswers[questionId] || 0;
      const newTotalPoints = totalPoints - previousPointsForQuestion + points;

      setTotalPoints(newTotalPoints);
      setSelectedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: points,
      }));

      // Автоматический переход к следующему вопросу (можно сделать кнопку "Далее")
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < QUIZ_QUESTIONS.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        // Если это был последний вопрос
        // Небольшая задержка перед показом результата для UX
        setTimeout(() => setShowResult(true), 300);
      }
    },
    [currentQuestionIndex, totalPoints, selectedAnswers]
  );

  const handleGoBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      // Баллы пересчитаются при следующем выборе ответа на предыдущем шаге
    }
  }, [currentQuestionIndex]);

  const handleRestart = useCallback(() => {
    setCurrentQuestionIndex(0);
    setTotalPoints(0);
    setSelectedAnswers({});
    setShowResult(false);
  }, []);

  const calculateCostRange = (points) => {
    const resultRange = COST_RANGES.find(
      (range) => points >= range.minPoints && points <= range.maxPoints
    );
    return resultRange
      ? resultRange.range
      : "Не удалось рассчитать (свяжитесь с нами)";
  };

  return (
    <div className="tattoo-estimator">
      <h1>Калькулятор стоимости тату (Примерный)</h1>

      {!showResult ? (
        <>
          <div className="progress-indicator">
            Вопрос {currentQuestionIndex + 1} из {QUIZ_QUESTIONS.length}
          </div>
          <Question
            question={QUIZ_QUESTIONS[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            selectedPoints={
              selectedAnswers[QUIZ_QUESTIONS[currentQuestionIndex].id]
            } // Передаем выбранный ответ для подсветки
          />
          <div className="navigation-buttons">
            {currentQuestionIndex > 0 && (
              <button onClick={handleGoBack} className="nav-button back-button">
                Назад
              </button>
            )}
          </div>
        </>
      ) : (
        <Result
          costRange={calculateCostRange(totalPoints)}
          totalPoints={totalPoints}
          disclaimer={DISCLAIMER_TEXT}
          onRestart={handleRestart}
        />
      )}
      <p className="estimator-disclaimer">{!showResult && DISCLAIMER_TEXT}</p>
    </div>
  );
}

const Question = ({ question, onAnswerSelect, selectedPoints }) => {
  if (!question) return null; // Защита на случай отсутствия вопроса

  return (
    <div className="question-container">
      <h2>{question.text}</h2>
      <div className="options-container">
        {question.options.map((option) => (
          <button
            key={option.text}
            className={`option-button ${
              selectedPoints === option.points ? "selected" : ""
            }`}
            onClick={() => onAnswerSelect(question.id, option.points)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

const Result = ({ costRange, totalPoints, disclaimer, onRestart }) => {
  return (
    <div className="result-container">
      <h2>Примерная оценка стоимости:</h2>
      <div className="cost-range">{costRange}</div>
      {/* <p>(Набрано баллов: {totalPoints})</p> */}
      <p className="result-disclaimer">{disclaimer}</p>
      <button onClick={onRestart} className="restart-button">
        Пройти тест заново
      </button>
    </div>
  );
};
