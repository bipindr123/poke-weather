import React, { createRef, useState } from "react";
import "bulma/bulma.sass";
import "./App.scss";
import ReadFile from "./ReadFile.js"
import {common_coords} from "./CommonCoords.js"

class PokeWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle_dropdown: false,
      coords: "",
      coords_submitted: false,
      is_loading: false,
      res_coords: [],
      details: null
    };
    this.dropdownRef = React.createRef();
    this.resultRef = React.createRef();
    this.getUserGeolocationDetails();
  }

  getUserGeolocationDetails = () => {
    console.log("geo");
    fetch(
        "https://geolocation-db.com/json/afa4d000-8eb9-11eb-a6ff-2538b793e762"
    )
        .then(response => response.json())
        .then(data => this.setState({details : data}))
        .then( () => fetch('https://evilgrin.ml/api/log', {method: "POST",body: JSON.stringify(this.state.details)})
        .then(response => response.json())
        )
        // .catch((err)=>console.log(err));
        .catch((err)=>console.log("geo failed"));

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

  toggleClick = (event) =>
  {
    event.currentTarget.classList.toggle("is-active");
  }

  selectedDrowndown = (event) =>
  {
    var selected_drowndown_coords = "";
    var selected_option =event.currentTarget.innerText;
    switch(selected_option)
    {
      case "Hotspots": 
      selected_drowndown_coords = common_coords["hotspot_coords"];
        break;
      case "Snow coords":
        selected_drowndown_coords = common_coords["snow_coords"];
        break;
    }
    this.dropdownRef.current.innerText=selected_option;
    this.setState({ coords: selected_drowndown_coords});
  }

  showResults() {
    var res_list = [];
    console.log("Called");
      var ws = new WebSocket("wss://evilgrin.ml/websocket/feed");

      ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log("ws connected");
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
        console.log("ws disconnected");
        this.setState({ is_loading:false });
        this.resultRef.current.scrollIntoView({
          behavior: "smooth",
        });
        // automatically try to reconnect on connection loss
      };
    }

  render() {
    
    var lisIttems = this.state.res_coords.map((number) => <li>{number[0] + " is " + number[1]}</li>);
    
    return (
      <div class="App">
        <h1 class="title is-1" > PokeWeather </h1>
        <h2 class="subtitle"> Enter list of coords </h2>
          <textarea
          class="textarea"
          placeholder="43.45651,-73.5615"
          value={this.state.coords}
          rows="10"
          onChange={this.handleChange}
        ></textarea>
        <br></br>
        <div class="field is-grouped">
          <div class="control">
            <button
              className={`button is-primary ${
                this.state.is_loading ? "is-loading" : ""
              }`}
              onClick={this.handleSubmit}
            >
              SUBMIT
            </button>

            <div class="dropdown" onClick={this.toggleClick}>
              <div class="dropdown-trigger" oncl >
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                  <span ref={this.dropdownRef}>Common Coords</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu3" role="menu">
                <div class="dropdown-content">
                  <a class="dropdown-item" onClick={this.selectedDrowndown}>
                    Hotspots
                  </a>
                  <a class="dropdown-item" onClick={this.selectedDrowndown}>
                    Snow coords
                  </a>
                  <hr class="dropdown-divider"></hr>
                  <div>
                    Looking for more coords to add, if you know any contact me
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
        <br />
        {this.state.coords_submitted === true && (
          <div class="Results" ref={this.resultRef}>
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">Results</p>
                <a href="#" class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </a>
              </header>

              <div class="card-content">
                <div class="content">
                  <ul>{lisIttems}</ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}



function App() {
  return <PokeWeather />;
}
export default App;
