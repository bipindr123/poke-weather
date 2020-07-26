import React from "react";
import "bulma/bulma.sass";
import "./App.scss";

class PokeWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: "",
      coords_submitted: false,
      is_loading: false,
      res_coords: [],
    };
  }

  validateCoords(coords) {
    var coordRe = /^-?\d*.\d*,\s?-?\d*.\d*\n?$/;
    coords = coords.split("\n");
    for (const index in coords) {
      if (!coordRe.test(coords[index])) return false;
    }
    return true;
  }

  handleChange = (event) => {
    this.setState({ coords: event.target.value });
  };

  handleSubmit = (event) => {
    if (this.validateCoords(this.state.coords)) {
      alert("Coords sumbmited please wait: " + this.state.coords);
      this.setState({ coords_submitted: true });
      this.showResults();
    } else alert("Wrong format");
    event.preventDefault();
  };

  showResults() {
    var res_list = [];
    console.log("Called");
      var ws = new WebSocket("ws://localhost:8000/feed");

      ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log("connected");
        this.setState({ is_loading:true });
        ws.send(this.state.coords);
      };

      ws.onmessage = (evt) => {
        // listen to data sent from the websocket server
        const message = JSON.parse(evt.data);
        res_list.push([message["coords"],message["weather"]]);
        console.log(res_list);
        this.setState({ res_coords: res_list });
      };

      ws.onclose = () => {
        console.log("disconnected");
        this.setState({ is_loading:false });
        // automatically try to reconnect on connection loss
      };
    }

  render() {
    var lisIttems = this.state.res_coords.map((number) => <li>{number[0] + " is " + number[1]}</li>);
    return (
      <div class="App">
        <h1 class="title is-1"> PokeWeather </h1>
        <h2 class="subtitle"> Enter list of coords </h2>̥̥
        <textarea
          class="textarea"
          placeholder="43.45651,-73.5615"
          value={this.state.coords}
          onChange={this.handleChange}
        ></textarea>
        <br></br>
        <div class="field is-grouped">
          <div class="control">
            <button className={`button is-primary ${this.state.is_loading ? "is-loading" : ""}` } onClick={this.handleSubmit}>

              SUBMIT
            </button>
          </div>
        </div>
        <div class="Results">
        <h2 class="title is-2"> Results </h2>
        <hr />
        <ul>{lisIttems}</ul>
      </div>
      </div>
    );
  }
}



function App() {
  return <PokeWeather />;
}
export default App;
