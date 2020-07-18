import React from "react";
import "bulma/bulma.sass";
import "./App.scss";

class PokeWeather extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      coords: '',
      coords_submitted: false
    };
  }

  validateCoords(coords) {
    var coordRe = /^-?\d*.\d*,\s?-?\d*.\d*\n?$/
    coords = coords.split("\n")
    for (const index in coords) {
      if (!(coordRe.test(coords[index])))
        return false;
    }
    return true;
  }

  handleChange = (event) => {
    this.setState({ coords: event.target.value });
  }

  handleSubmit = (event) => {
    if (this.validateCoords(this.state.coords)) {
      alert('Coords sumbmited please wait: ' + this.state.coords);
      this.setState({coords_submitted: true})
    }
    else
      alert('Wrong format');
  event.preventDefault();
}


render() {
  return (
    <div class="App">

      <h1 class="title is-1"> PokeWeather </h1>
      <h2 class="subtitle"> Enter list of coords </h2>̥̥
      <textarea class="textarea" placeholder="43.45651,-73.5615" value={this.state.coords} onChange={this.handleChange}></textarea>
      <br></br>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" onClick={this.handleSubmit}>SUBMIT</button>
        </div>
      </div>

    </div>
  );
}
}

function App() {
  return <PokeWeather />;
}
export default App;
