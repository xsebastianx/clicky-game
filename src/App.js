import React, {Component} from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import characters from "./cards.json";
import "./App.css";

class App extends Component {

  state = {
    characters,
    clickedCharacterIds: [],
    score: 0,
    goal: 12,
    status: ""
  };

  shuffleScoreCard = id => {
    let clickedCharacterIds = this.state.clickedCharacterIds;

    if(clickedCharacterIds.includes(id)){
      this.setState({clickedCharacterIds: [], score: 0, status: "Game Over! Try again."});
      return;
    }else{
      clickedCharacterIds.push(id)

      if(clickedCharacterIds.length === 12){
        this.setState({score: 12, status: "Winner winner chicken dinner!", clickedCharacterIds: []});
        console.log("Winner");
        return;
      }

      this.setState({ characters, clickedCharacterIds, score: clickedCharacterIds.length, status:" "});

      for (let i = characters.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
      }
    }
  }


render() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">One Punch Man Clicky Game</h1>
        <p className="App-intro">
          Click different characters to score.  Don't click the same character twice.
        </p>
      </header>
      <Score total={this.state.score}
             goal={12}
             status={this.state.status}
             />
      <Wrapper>
        {this.state.characters.map(character => (
          <Card
            shuffleScoreCard={this.shuffleScoreCard}
            id={character.id}
            key={character.id}
            image={character.image}
            />
        ))}
      </Wrapper>
      <footer>

      </footer>
    </div>
  );
}
}


export default App;
