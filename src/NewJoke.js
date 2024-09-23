import React from "react";
import "./Joke.css";

const NewJoke = ({vote, votes, text, id}) => { 
    const voteUP = () => {
        vote(id, +1)
    }
    const voteDown = () => {
        vote(id, -1)
    }
    return(
        <div className="Joke">
        <div className="Joke-votearea">
          <button onClick={voteUP}>
            <i className="fas fa-thumbs-up" />
          </button>

          <button onClick={voteDown}>
            <i className="fas fa-thumbs-down" />
          </button>

          {votes}
        </div>

        <div className="Joke-text">{text}</div>
      </div>
    )
}
export default NewJoke