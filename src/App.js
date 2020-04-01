import React from "react";
import axios from "axios";
import Card from "./components/Card.js"

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

  componentDidMount() {
    //get id of deck
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => {
        this.setState({ id: res.data.deck_id })
      })
      .catch(err => console.log(err));

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
          /* obtain code value of card */
          switch (response.data.cards[0].value) {
            case "QUEEN":
              code = 12;
              //increment Queen counter 
              this.setState((state) => ({
                queenCount: state.queenCount + 1
              }));
              let counter = document.getElementById("counter");
              counter.innerHTML = this.state.queenCount;
              break;
            case "JACK":
              code = 11;
              break;
            case "KING":
              code = 13;
              break;
            case "ACE":
              code = 14;
              break;
            default:
              code = response.data.cards[0].value;
              break;
          }
          
          /* save card in its suite */
          switch (response.data.cards[0].suit) {
            case "HEARTS":
              this.setState(state => ({
                hearts: [...state.hearts, parseInt(code)]
              }));
              break;
            case "CLUBS":
              this.setState(state => ({
                clubs: [...state.clubs, parseInt(code)]
              }));
              break;
            case "SPADES":
              this.setState(state => ({
                spades: [...state.spades, parseInt(code)]
              }));
              break;
            case "DIAMONDS":
              this.setState(state => ({
                diamonds: [...state.diamonds, parseInt(code)]
              }));
              break;
          }

          //add new card into the deck of cards
          const newCard = { name: response.data.cards[0].image };
          this.setState(state => ({
            cards: [...state.cards, newCard]
          }));
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

  sortNumber(a, b) {
    return a - b;
  }

  sortCard = (hearts, diamonds, spades, clubs) => {
    let allCards = document.getElementsByClassName("card");

    for (let i = 0; i < hearts.length; i++) {
      //Replace code for letter to obtain the image
      switch (hearts[i]) {
        case 14:
          hearts[i] = "A";
          break;
        case 13:
          hearts[i] = "K";
          break;
        case 12:
          hearts[i] = "Q";
          break;
        case 11:
          hearts[i] = "J";
          break;
        case 10:
          hearts[i] = "0";
          break;
      }
      
      allCards[i].innerHTML =
        "<img class='done' src='https://deckofcardsapi.com/static/img/" + hearts[i] + "H.png' />";
      this.setState((state) => ({
        cardCount: state.cardCount + 1
      }));
    }

    for (let i = 0; i < clubs.length; i++) {
      //Replace code for letter to obtain the image
      switch (clubs[i]) {
        case 14:
          clubs[i] = "A";
          break;
        case 13:
          clubs[i] = "K";
          break;
        case 12:
          clubs[i] = "Q";
          break;
        case 11:
          clubs[i] = "J";
          break;
        case 10:
          clubs[i] = "0";
          break;
      }

      allCards[this.state.cardCount].innerHTML =
        "<img class='done' src='https://deckofcardsapi.com/static/img/" + clubs[i] + "C.png' />";
      this.setState((state) => ({
        cardCount: state.cardCount + 1
      }));
    }

    for (let y = 0; y < diamonds.length; y++) {
      switch (diamonds[y]) {
        case 14:
          diamonds[y] = "A";
          break;
        case 13:
          diamonds[y] = "K";
          break;
        case 12:
          diamonds[y] = "Q";
          break;
        case 11:
          diamonds[y] = "J";
          break;
        case 10:
          diamonds[y] = "0";
          break;
      }

      allCards[this.state.cardCount].innerHTML =
        "<img class='done' src='https://deckofcardsapi.com/static/img/" + diamonds[y] + "D.png' />";

      this.setState((state) => ({
        cardCount: state.cardCount + 1
      }));
    }

    for (let a = 0; a < spades.length; a++) {
      switch (spades[a]) {
        case 14:
          spades[a] = "A";
          break;
        case 13:
          spades[a] = "K";
          break;
        case 12:
          spades[a] = "Q";
          break;
        case 11:
          spades[a] = "J";
          break;
        case 10:
          spades[a] = "0";
          break;
      }

      allCards[this.state.cardCount].innerHTML =
        "<img class='done' src='https://deckofcardsapi.com/static/img/" + spades[a] + "S.png' />";

      this.setState((state) => ({
        cardCount: state.cardCount + 1
      }));
    }
  }

  render() {
    return (
      <div className="app">
        { this.state.cards.map((t, i) => (
          <Card key={i} name={t.name} /> ))
        }
      </div>
    );
  }
}

export default App;
