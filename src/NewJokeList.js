import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import NewJoke from "./NewJoke";
import "./JokeList.css";

const NewJokeList = ({ numJokesToGet = 5 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    async function getJokes() {
      let j = [...jokes];
      let seenJokes = new Set();

      try {
        while (j.length < numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" },
          });

          let { ...joke } = res.data;

          if (!seenJokes.has(joke.id)) {
            seenJokes.add(joke.id);
            j.push({ ...joke, votes: 0 });
          } else {
            console.log("duplicateS found!");
          }
        }
        console.log(j);
        setJokes(j);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        console.error(err);
      }
    }
    if (jokes.length === 0) {
      getJokes();
    }
  }, [jokes, numJokesToGet]);

  const generateNewJokes = () => {
    setIsLoading(true);
    setJokes([]);
  };

  const vote = (id, action) => {
    setJokes((jokes) =>
      jokes.map((joke) =>
        joke.id === id ? { ...joke, votes: joke.votes + action } : joke
      )
    );
  };

  if (isLoading) {
  return (
      <div className="loading">
      <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
  )
  }

  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  console.log(sortedJokes);
  return (
    <div className="JokeList">
      <button className="JokeList-getmore" onClick={generateNewJokes}>
        Get New Jokes
      </button>

      {sortedJokes.map(({ joke, id, votes }) => (
        <NewJoke text={joke} key={id} id={id} votes={votes} vote={vote} />
      ))}
    </div>
  );
};

export default NewJokeList;
