import React, { createRef, useState } from "react";
import "bulma/bulma.sass";
import "./mbti.scss";
import { Component } from "react";

class Mbti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      part: 1,
      answer: 0,
      details: ""
    };
    this.getUserGeolocationDetails();
  }

  
  getUserGeolocationDetails = () => {
    console.log("geo");
    fetch(
        "https://geolocation-db.com/json/afa4d000-8eb9-11eb-a6ff-2538b793e762"
    )
        .then(response => response.json())
        .then(data => {data.source = "mbti"; return data})
        .then(data => this.setState({details : data}))
        .then( () => fetch('http://server-ip:1337/log', {method: "POST",body: JSON.stringify(this.state.details)})
        .then(response => response.json())
        );

  }

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };
  handleAnswer = (event) => {
    this.setState({ answer: event.target.value });
    console.log(event.target);
  };
  handleSubmit = (event) => {
    if(this.state.part==1 && this.state.name=="")
    return;

    if(this.state.part==2 && this.state.answer==0)
    return;
      this.setState({ part: this.state.part + 1 });
      

  };

  DisplayParts(props) { }

  render() {
    return (
      <div class="mbti">
        <h1 class="title is-1"> Hey {this.state.name}!</h1>

        <div class="bg-image"></div>

        {this.state.part == 1 && (
          <div class="bg-text">
            <h1 class="title is-5 has-text-white">PERSONALITY TESTS BE LIKE</h1>
            <h1 class="title is-3 has-text-white">
              Welcome to free personality test
            </h1>
            <br></br>
            <p>enter your name</p>
            <br></br>
            <label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
            <br></br>
            <br></br>
            <button
              className={`button is-primary `}
              onClick={this.handleSubmit}
            >
              Continue
            </button>
          </div>
        )}

        {this.state.part == 2 && (
          <div class="bg-text">
            <h1 class="title is-5 has-text-white">PERSONALITY TESTS BE LIKE</h1>
            <br></br>
            <p>Would to talk to a stranger?</p>
            <br></br>
            <div class="control">
              <label class="radio">
                <input onChange={this.handleAnswer} value="1" type="radio" name="answer"></input>
                Absolutely fucking not
              </label>
              <label class="radio">
                <input onChange={this.handleAnswer} value="2" type="radio" name="answer"></input>
                Maybe
              </label>
              <label class="radio" >
                <input onChange={this.handleAnswer} value="3" type="radio" name="answer"></input>
                Yes
              </label>
              <label class="radio">
                <input onChange={this.handleAnswer} value="4" type="radio" name="answer"></input>
                Lets go!!
              </label>
            </div>
            <br></br>
            <br></br>
            <button
              className={`button is-primary `}
              onClick={this.handleSubmit}
            >
              Continue
            </button>
          </div>
        )}

        {this.state.part == 3 && (
          <div class="bg-text">
            
            <h1 class="title is-5 has-text-white">Results!</h1>
            
            {this.state.answer==1 && (<div><h1 class="title is-3 has-text-white">You're shy!</h1>
            <img src={"https://media3.giphy.com/media/ANWIS2HYfROI8/giphy.gif"} width={300} height={300} alt=""/>
            </div>)}

            {this.state.answer==2 && (<div><h1 class="title is-3 has-text-white">You're confused!</h1>
            <img src={"https://media3.giphy.com/media/9VrLhLDKae5i6xHYxY/giphy.gif"} width={300} height={300}  alt=""/>
            </div>)}
            
            {this.state.answer==3 && (<div><h1 class="title is-3 has-text-white">You're outgoing!</h1>
            <img src={"https://media1.giphy.com/media/xTiN0CNHgoRf1Ha7CM/giphy.gif"}  width={300} height={300} alt=""/>
            </div>)}

            {this.state.answer==4 && (<div><h1 class="title is-3 has-text-white">You're a little too outgoing!</h1>
            <img src={"https://media0.giphy.com/media/3oxRmGXbquXKz6DNPq/giphy.gif"} width={300} height={300} alt=""/>
            </div>)}

         
            
  
          </div>
        )}
      </div>
    );
  }
}

export default Mbti;
