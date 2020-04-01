import React from "react";
import axios from "axios";
import Card from "./components/Card"

class App extends React.PureComponent {
  state = {
    cards: [], 
    id: 0, 
    queenCount: 0, 
    hearts: [],
    clubs: [],
    spades: [],
    diamonds: [],
    cardCount: 0
  };

  constructor() {
    super();

    //get id 
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => {
        console.log(res)
        this.setState({ id: res.data.deck_id })
      })
      .catch(err => console.log(err));
    //*******************************/
  }

  componentDidMount() {
    this.interval = setInterval(
      () => this.addCard(window.scrollTo(0, document.body.scrollHeight)),
      1000);
  }

  addCard = () => {
    if (this.state.queenCount < 4) {
      axios
        .get("https://deckofcardsapi.com/api/deck/" + this.state.id + "/draw/?count=1")
        .then(response => {
          let code;
          /* CHANGE TO SWITCH */
          if (response.data.cards[0].value == "QUEEN") {
            code = 12;
          } else if (response.data.cards[0].value == "JACK") {
            code = 11;
          } else if (response.data.cards[0].value == "KING") {
            code = 13;
          } else if (response.data.cards[0].value == "ACE") {
            code = 14;
          } else {
            code = response.data.cards[0].value;
          }

          
          if (response.data.cards[0].suit == "HEARTS") {
            this.setState(state => ({
              hearts: [...state.hearts, parseInt(code)]
            }));
            //hearts.push(parseInt(code));
          }

          if (response.data.cards[0].suit == "CLUBS") {
            this.setState(state => ({
              clubs: [...state.clubs, parseInt(code)]
            }));
            //clubs.push(parseInt(code));
          }

          if (response.data.cards[0].suit == "SPADES") {
            this.setState(state => ({
              spades: [...state.spades, parseInt(code)]
            }));
            //spades.push(parseInt(code));
          }

          if (response.data.cards[0].suit == "DIAMONDS") {
            this.setState(state => ({
              diamonds: [...state.diamonds, parseInt(code)]
            }));
            //diamonds.push(parseInt(code));
          }

          if (response.data.cards[0].value == "QUEEN") {
            this.setState((state) => ({
              queenCount: state.queenCount + 1
            }));
            //queenCount++;
            let counter = document.getElementById("counter");
            counter.innerHTML = this.state.queenCount;
          }

          const newCard = { name: response.data.cards[0].image };
          console.log(newCard)
          this.setState(state => ({
            cards: [...state.cards, newCard]
          }));

          /* const newcards = [...copyCards, newCard];
          this.setState({ cards: newcards }); */
        })
        .catch(err => console.log(err));
    } else {
      clearInterval(this.interval);
      let hearts = this.state.hearts.sort(this.sortNumber);
      let diamonds = this.state.diamonds.sort(this.sortNumber);
      let spades = this.state.spades.sort(this.sortNumber);
      let clubs = this.state.clubs.sort(this.sortNumber);

      document.getElementById("load-a").style.display = "block";
      setTimeout(() => {
        this.sortCard(hearts, diamonds, spades, clubs);
        window.scrollTo(0, 0);
      }, 1000);
    }
  };

  sortCard = (hearts, diamonds, spades, clubs) => {
    let allCards = document.getElementsByClassName("card");

    for (let j = 0; j < hearts.length; j++) {
      if (hearts[j] == "14") {
        hearts[j] = "A";
      } else if (hearts[j] == "13") {
        hearts[j] = "K";
      } else if (hearts[j] == "12") {
        hearts[j] = "Q";
      } else if (hearts[j] == "11") {
        hearts[j] = "J";
      } else if (hearts[j] == "10") {
        hearts[j] = "0";
      }

      allCards[j].innerHTML =
        "<img class='done hearts' src='https://deckofcardsapi.com/static/img/" + hearts[j] + "H.png' />";
      this.setState((state) => ({
        cardCount: state.cardCount + 1
      }));
    }

    for (let k = 0; k < clubs.length; k++) {
      if (clubs[k] == "14") {
        clubs[k] = "A";
      } else if (clubs[k] == "13") {
        clubs[k] = "K";
      } else if (clubs[k] == "12") {
        clubs[k] = "Q";
      } else if (clubs[k] == "11") {
        clubs[k] = "J";
      } else if (clubs[k] == "10") {
        clubs[k] = "0";
      }

      allCards[this.state.cardCount].innerHTML =
        "<img class='done hearts' src='https://deckofcardsapi.com/static/img/" + clubs[k] + "C.png' />";
      this.setState((state) => ({
        cardCount: state.cardCount + 1
      }));
    }

    for (let y = 0; y < diamonds.length; y++) {
      if (diamonds[y] == "14") {
        diamonds[y] = "A";
      } else if (diamonds[y] == "13") {
        diamonds[y] = "K";
      } else if (diamonds[y] == "12") {
        diamonds[y] = "Q";
      } else if (diamonds[y] == "11") {
        diamonds[y] = "J";
      } else if (diamonds[y] == "10") {
        diamonds[y] = "0";
      }

      allCards[this.state.cardCount].innerHTML =
        "<img class='done hearts' src='https://deckofcardsapi.com/static/img/" + diamonds[y] + "D.png' />";

      this.setState((state) => ({
        cardCount: state.cardCount + 1
      }));
    }

    for (let a = 0; a < spades.length; a++) {
      if (spades[a] == "14") {
        spades[a] = "A";
      } else if (spades[a] == "13") {
        spades[a] = "K";
      } else if (spades[a] == "12") {
        spades[a] = "Q";
      } else if (spades[a] == "11") {
        spades[a] = "J";
      } else if (spades[a] == "10") {
        spades[a] = "0";
      }

      allCards[this.state.cardCount].innerHTML =
        "<img class='done hearts' src='https://deckofcardsapi.com/static/img/" + spades[a] + "S.png' />";
    
      this.setState((state) => ({
        cardCount: state.cardCount + 1
      }));
    }
  }

  sortNumber(a, b) {
    return a - b;
  }

  render() {
    return (
      <div className="app">
        {this.state.cards.map((t, i) => (
          <Card key={i} name={t.name} />
        ))}
      </div>
    );
  }
}

export default App;
