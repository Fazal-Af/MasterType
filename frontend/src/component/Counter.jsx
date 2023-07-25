import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import { generate } from "random-words";
import { useNavigate } from "react-router-dom";
import ReplyIcon from '@mui/icons-material/Reply';

const Number_Words = 200;

const Counter = () => {
  const navigate = useNavigate();
  const [words, setWords] = useState([]);
  const [totalSeconds, setTotalSeconds] = useState(60);
  const [currInput, setCurrInput] = useState("");
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState("waiting");
  const textInput = useRef(null);

  useEffect(() => {
    setWords(generateWords());
  }, []);

  useEffect(() => {
    if (status === "started") {
      textInput.current.focus();
    }
  }, [status]);

  function generateWords() {
    return new Array(Number_Words).fill(null).map(() => generate());
  }

  function start() {
    if (status === "finished") {
      setWords(generateWords());
      setCurrWordIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setCurrCharIndex(-1);
      setCurrChar("");
    }
    if (status !== "started") {
      setStatus("started");
      let interval = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => {
          if (prevTotalSeconds <= 0) {
            clearInterval(interval);
            setStatus("finished");
            setCurrInput("");
            return 0;
          } else {
            return prevTotalSeconds - 1;
          }
        });
      }, 1000);
    }
  }

  function handlekeyDown({ keyCode, key }) {
    // space bar
    if (keyCode === 32) {
      checkMatch();
      setCurrInput("");
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(-1);
    } else if (keyCode === 8) {
      setCurrCharIndex(setCurrCharIndex - 1);
      setCurrChar("");
    } else {
      setCurrCharIndex(currCharIndex + 1);
      setCurrChar(key);
    }
  }

  function checkMatch() {
    const wordToCompare = words[currWordIndex];
    const doesItMatch = wordToCompare === currInput.trim();
    if (doesItMatch) {
      setCorrect(correct + 1);
    } else {
      setIncorrect(incorrect + 1);
    }
  }

  function getCharClass(wordIdx, charIdx, char) {
    if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex &&
      currChar &&
      status !== "finished"
    ) {
      if (char === currChar) {
        return "has-background-success";
      } else {
        return "has-background-danger";
      }
    } else if (
      wordIdx === currWordIndex &&
      currCharIndex >= words[currWordIndex].length
    ) {
      return "has-background-danger";
    } else {
      return "";
    }
  }

  function getMinutes() {
    return Math.floor(totalSeconds / 60);
  }

  function getSeconds() {
    return totalSeconds % 60;
  }

  const selectHandle = (val) => {
    setTotalSeconds(val);
  };

  const homeHandle = () => {
    navigate("/");
  };

  return (
    <div className="app">
      <div className="section">
        <button onClick={homeHandle} className="to-home-btn">
          <ReplyIcon/>
        </button>
        <div className="is-size-1 has-text-centered has-primary">
          <select
            value={totalSeconds}
            onChange={(e) => setTotalSeconds(parseInt(e.target.value))}
           className="select-options">
            <option value="0"> Select Time </option>
            <option value="60">1 min </option>
            <option value="120">2 min</option>
            <option value="180">3 min</option>
            <option value="240">4 min</option>
            <option value="300">5 min</option>
            {/* Add more options as needed */}
          </select>
          <h3>{`${getMinutes()}:${getSeconds()}`}</h3>
        </div>
      </div>
      <div className="control is-expanded section">
        <input
          ref={textInput}
          disabled={status !== "started"}
          type="text"
          className="input"
          onKeyDown={handlekeyDown}
          value={currInput}
          onChange={(e) => setCurrInput(e.target.value)}
        />
      </div>
      <div className="section">
        <button className="button is-info is-fullwidth" onClick={start}>
          Start
        </button>
      </div>
      {status === "started" && (
        <div className="section">
          <div className="card">
            <div className="card-content">
              <div className="content">
                {words.map((word, i) => (
                  <span key={i}>
                    <span>
                      {word.split("").map((char, idx) => (
                        <span className={getCharClass(i, idx, char)} key={idx}>
                          {char}
                        </span>
                      ))}
                    </span>
                    <span> </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {status === "finished" && (
        <div className="section">
          <div className="columns">
            <div className="column has-text-centered">
              <div className="is-size-5"> No of words </div>
              <p className="has-text-primary is-size-1">{correct}</p>
            </div>
            <div className="column has-text-centered ">
              <div className="is-size-5">Accuracy </div> ٖ
              <p className="has-text-info is-size-1">
                {Math.round((correct / (correct + incorrect)) * 100 || 100)} %
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Counter;
