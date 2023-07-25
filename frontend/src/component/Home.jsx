import React from "react";
import Nav from "./Nav";
import "./home.css";

const Home = () => {
  return (
    <>
      <Nav />
      <div className="home-container">
        <div className="home-intro-container">
          <h1>MasterType</h1>
          <p>
            Experience the ultimate typing speed website! Enhance your typing
            skills through engaging exercises and fun challenges. Track your
            progress with real-time performance metrics and personalized
            feedback. Enjoy a user-friendly interface that caters to learners of
            all levels. Boost your typing accuracy and speed, and become a
            proficient typist in no time. Start your typing journey today!
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
