import React from "react";
import axios from "axios";

var id;
var queenCount = 0;
var hearts = [];
var clubs = [];
var spades = [];
var diamonds = [];
var cardCount = 0;

class App extends React.PureComponent {
  state = {
    cards: []
  };

  constructor() {
    super();

    //obtengo id
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => {
        id = res.data.deck_id;
      })
      .catch(err => console.log(err));
    //*******************************/
  }

  componentDidMount() {
    this.interval = setInterval(
      () => this.addCard(window.scrollTo(0, document.body.scrollHeight)),
      1000
    );
  }

  addCard = () => {
    if (queenCount < 4) {
      const { cards } = this.state;

      axios
        .get("https://deckofcardsapi.com/api/deck/" + id + "/draw/?count=1")
        .then(response => {
          var code;
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
            hearts.push(parseInt(code));
          }

          if (response.data.cards[0].suit == "CLUBS") {
            clubs.push(parseInt(code));
          }

          if (response.data.cards[0].suit == "SPADES") {
            spades.push(parseInt(code));
          }

          if (response.data.cards[0].suit == "DIAMONDS") {
            diamonds.push(parseInt(code));
          }

          if (response.data.cards[0].value == "QUEEN") {
            queenCount++;
            var counter = document.getElementById("counter");
            counter.innerHTML = queenCount;
          }

          const newCard = { name: response.data.cards[0].image };
          const newcards = [...cards, newCard];
          this.setState({ cards: newcards });
        })
        .catch(err => console.log(err));
    } else {
      clearInterval(this.interval);
      hearts = hearts.sort(this.sortNumber);
      diamonds = diamonds.sort(this.sortNumber);
      spades = spades.sort(this.sortNumber);
      clubs = clubs.sort(this.sortNumber);

      document.getElementById("load-a").style.display = "block";
      setTimeout(() => {
        this.sortCard(hearts, diamonds, spades, clubs);
        window.scrollTo(0, 0);
      }, 1000);
    }
  };

  sortCard(hearts, diamonds, spades, clubs) {
    var allCards = document.getElementsByClassName("card");

    for (var j = 0; j < hearts.length; j++) {
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
        "<img class='done hearts' src='https://deckofcardsapi.com/static/img/" +
        hearts[j] +
        "H.png' />";
      cardCount++;
    }

    for (var k = 0; k < clubs.length; k++) {
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

      allCards[cardCount].innerHTML =
        "<img class='done hearts' src='https://deckofcardsapi.com/static/img/" +
        clubs[k] +
        "C.png' />";
      cardCount++;
    }

    for (var y = 0; y < diamonds.length; y++) {
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

      allCards[cardCount].innerHTML =
        "<img class='done hearts' src='https://deckofcardsapi.com/static/img/" +
        diamonds[y] +
        "D.png' />";
      cardCount++;
    }

    for (var a = 0; a < spades.length; a++) {
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

      allCards[cardCount].innerHTML =
        "<img class='done hearts' src='https://deckofcardsapi.com/static/img/" +
        spades[a] +
        "S.png' />";
      cardCount++;
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

const Card = ({ name }) => {
  return (
    <div className="card">
      <img src={name} />
    </div>
  );
};

export default App;
