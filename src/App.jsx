import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Card } from "./components/Card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import cpuImage from "./assets/images/cpu.png";
import binarySearchImage from "./assets/images/binary_search.jpg";
import apiImage from "./assets/images/api.jpg";
import sqlImage from "./assets/images/sql.jpg";
import functionalProgrammingImage from "./assets/images/functional_programming.jpg";
import alanTuringImage from "./assets/images/alan_turing.jpg";
import networkImage from "./assets/images/network.jpg";
import httpImage from "./assets/images/http_img.jpg";
import gpuImage from "./assets/images/gpu.jpg";
import encryptionImage from "./assets/images/encryption_img.jpg";
import { InputField } from "./components/InputField";

const trivias = [
  {
    question: "What does CPU stand for?",
    answer: "Central Processing Unit",
    imagePath: cpuImage,
    difficulty: "easy",
    isAnswered: false,
  },
  {
    question:
      "In Big-O notation, what is the time complexity of binary search?",
    answer: "O(log n)",
    imagePath: binarySearchImage,
    difficulty: "medium",
    isAnswered: false,
  },
  {
    question: "What data structure uses FIFO (First In, First Out)?",
    answer: "Queue",
    imagePath: "",
    difficulty: "easy",
    isAnswered: false,
  },
  {
    question: "What does the acronym SQL stand for?",
    answer: "Structured Query Language",
    imagePath: sqlImage,
    difficulty: "easy",
    isAnswered: false,
  },
  {
    question:
      "Which sorting algorithm has the worst-case time complexity of O(n²) but is often faster in practice for small datasets?",
    answer: "Insertion Sort",
    imagePath: "",
    difficulty: "medium",
    isAnswered: false,
  },
  {
    question:
      "What is the main characteristic of a functional programming language?",
    answer:
      "Functions are treated as first-class citizens and avoid mutable state",
    imagePath: functionalProgrammingImage,
    difficulty: "hard",
    isAnswered: false,
  },
  {
    question:
      "Which computer scientist is known as the father of theoretical computer science and artificial intelligence?",
    answer: "Alan Turing",
    imagePath: alanTuringImage,
    difficulty: "medium",
    isAnswered: false,
  },
  {
    question: "What type of machine learning algorithm is K-Means?",
    answer: "Unsupervised learning (clustering)",
    imagePath: "",
    difficulty: "hard",
    isAnswered: false,
  },
  {
    question: "In networking, what does DNS stand for?",
    answer: "Domain Name System",
    imagePath: networkImage,
    difficulty: "easy",
    isAnswered: false,
  },
  {
    question:
      "What does the term 'polymorphism' mean in object-oriented programming?",
    answer:
      "The ability of different objects to respond to the same method call in different ways",
    imagePath: "",
    difficulty: "medium",
    isAnswered: false,
  },
  {
    question: "What does HTTP stand for?",
    answer: "HyperText Transfer Protocol",
    imagePath: httpImage,
    difficulty: "easy",
    isAnswered: false,
  },
  {
    question: "Which data structure is used in a Depth-First Search (DFS)?",
    answer: "Stack (can be implemented with recursion or an explicit stack)",
    imagePath: "",
    difficulty: "medium",
    isAnswered: false,
  },
  {
    question: "What is the default port number for HTTPS?",
    answer: "443",
    imagePath: "",
    difficulty: "easy",
    isAnswered: false,
  },
  {
    question: "Which programming paradigm does Java primarily follow?",
    answer: "Object-Oriented Programming (OOP)",
    imagePath: "",
    difficulty: "easy",
    isAnswered: false,
  },
  {
    question: "What is the worst-case time complexity of QuickSort?",
    answer: "O(n²)",
    imagePath: "",
    difficulty: "medium",
    isAnswered: false,
  },
  {
    question: "Which layer of the OSI model handles routing of data packets?",
    answer: "Network Layer",
    imagePath: "",
    difficulty: "medium",
    isAnswered: false,
  },
  {
    question: "What does API stand for?",
    answer: "Application Programming Interface",
    imagePath: apiImage,
    difficulty: "easy",
    isAnswered: false,
  },
  {
    question:
      "Which scheduling algorithm in operating systems is also known as 'first come, first served'?",
    answer: "FCFS (First-Come, First-Served)",
    imagePath: "",
    difficulty: "medium",
    isAnswered: false,
  },
  {
    question: "What does GPU stand for?",
    answer: "Graphics Processing Unit",
    imagePath: gpuImage,
    difficulty: "easy",
    isAnswered: false,
  },
  {
    question:
      "Which encryption algorithm is widely used for secure communications on the web?",
    answer: "AES (Advanced Encryption Standard)",
    imagePath: encryptionImage,
    difficulty: "hard",
    isAnswered: false,
  },
];

function App() {
  const [currentTriviaIndex, setCurrentTriviaIndex] = useState(0);
  const [shuffledOrder, setShuffledOrder] = useState(
    trivias.map((_, index) => index)
  );
  const [triviaQuestion, setTriviaQuestion] = useState(
    trivias[shuffledOrder[currentTriviaIndex]]
  );
  const [hasFlipped, setHasFlipped] = useState(false);

  const [formData, setFormData] = useState({
    guess: "",
  });

  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  // Card handlers
  const handleFlip = () => {
    if (!triviaQuestion.isAnswered) {
      alert("Please answer the question before flipping the card!");
      return;
    }

    setHasFlipped(!hasFlipped);
  };

  // Trivia setup and shuffling
  const setUpTriviaQuestion = (index, newOrder) => {
    setCurrentTriviaIndex(index);
    setHasFlipped(false);
    setTriviaQuestion(trivias[newOrder[index]]);
    setIsAnswerCorrect(null);
    setFormData({ guess: "" });
  };

  const shuffleRandomizedArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };
  const generateRandomTriviaOrder = () => {
    const newOrder = shuffleRandomizedArray(trivias.map((_, index) => index));
    setShuffledOrder(newOrder);
    setUpTriviaQuestion(0, newOrder);
  };

  // Navigation handlers
  const goToPreviousQuestion = () => {
    if (currentTriviaIndex === 0) return;
    setUpTriviaQuestion(currentTriviaIndex - 1, shuffledOrder);
  };

  const goToNextQuestion = () => {
    if (currentTriviaIndex === trivias.length - 1) return;
    setUpTriviaQuestion(currentTriviaIndex + 1, shuffledOrder);
  };

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const isAnswerClose = (guess, answer) => {
    const normalizedText = (text) =>
      text.toLowerCase().replace(/[^\w]/g, "").trim();

    const normalizedGuess = normalizedText(guess);
    const normalizedAnswer = normalizedText(answer);

    return normalizedGuess === normalizedAnswer;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    console.log("User's guess:", formData.guess);
    setFormData({ [name]: [value] });

    if (isAnswerClose(formData.guess, triviaQuestion.answer)) {
      setIsAnswerCorrect(true);
      setCurrentStreak(currentStreak + 1);
    } else {
      setIsAnswerCorrect(false);
      setCurrentStreak(0);
    }
    setLongestStreak(Math.max(longestStreak, currentStreak));
    triviaQuestion.isAnswered = true;

    setFormData({
      guess: "",
    });
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="header">
            <h1 className="header-title">CompSci Quizzer</h1>
            <p className="header-description">
              Test your computer science knowledge!
            </p>
            <p>Total number of questions: {trivias.length}</p>
            <p className="streak-text">
              <span>Current streak: {currentStreak} </span>{" "}
              <span>Longest streak: {longestStreak}</span>
            </p>
          </div>
          <Card
            question={triviaQuestion.question}
            answer={triviaQuestion.answer}
            imagePath={triviaQuestion.imagePath}
            difficulty={triviaQuestion.difficulty}
            hasFlipped={hasFlipped}
            handleFlip={handleFlip}
          />
          <InputField
            formData={formData}
            isAnswerCorrect={isAnswerCorrect}
            handleFormChange={handleChange}
            handleFormSubmit={handleSubmit}
          />
          <div className="btn-container">
            <div className="arrow-btns">
              <button className="btn" onClick={goToPreviousQuestion}>
                <ArrowLeft />
              </button>
              <button className="btn" onClick={goToNextQuestion}>
                <ArrowRight />
              </button>
            </div>

            <div>
              <button onClick={generateRandomTriviaOrder} className="btn">
                <span>Shuffle question</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
