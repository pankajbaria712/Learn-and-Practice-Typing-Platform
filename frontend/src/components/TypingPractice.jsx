import { useState, useEffect } from "react";

const sampleText =
  "Practice typing with this sample text to improve your speed and accuracy.";

export default function TypingArea() {
  const [textToType, setTextToType] = useState(sampleText);
  const [typedText, setTypedText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalTypedChars, setTotalTypedChars] = useState(0);
  const [accuracy, setAccuracy] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleTyping = (e) => {
    const value = e.target.value;

    if (!startTime) {
      setStartTime(Date.now());
    }

    setTypedText(value);
    setTotalTypedChars(value.length);

    let correct = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === textToType[i]) {
        correct++;
      }
    }
    setCorrectChars(correct);

    if (value === textToType) {
      calculateResults();
      setIsCompleted(true);
    }
  };

  const calculateResults = () => {
    const endTime = Date.now();
    const timeInMinutes = (endTime - startTime) / 60000;
    const wordCount = textToType.split(" ").length;
    setWpm(Math.round(wordCount / timeInMinutes));

    if (totalTypedChars === 0) {
      setAccuracy(0);
    } else {
      setAccuracy(((correctChars / totalTypedChars) * 100).toFixed(2));
    }
  };

  const handleRestart = () => {
    setTypedText("");
    setStartTime(null);
    setWpm(0);
    setCorrectChars(0);
    setTotalTypedChars(0);
    setAccuracy(null);
    setIsCompleted(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Typing Practice</h2>
      <p>{textToType}</p>
      <textarea
        rows={5}
        cols={60}
        value={typedText}
        onChange={handleTyping}
        disabled={isCompleted}
        placeholder="Start typing here..."
        style={{ marginTop: "10px" }}
      ></textarea>
      <div style={{ marginTop: "10px" }}>
        {isCompleted && (
          <>
            <p>✅ Typing Completed</p>
            <p>WPM: {wpm}</p>
            <p>Accuracy: {accuracy}%</p>
            <button onClick={handleRestart}>Restart Practice</button>
          </>
        )}
      </div>
    </div>
  );
}
