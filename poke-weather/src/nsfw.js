import React, { Component } from 'react';
import "./nsfw.scss";
import bgvideo from "./rickroll.mp4"

class Nsfw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activate: 0,
        };

    }

    componentDidMount() {
        document.getElementById(`navbar`).remove();
    }


    handleSubmit = (event) => {
        this.setState({ activate: 1 });


    };




    render() {
        return (
            <div class="nsfw">
                {
                    this.state.activate == 0 &&
                    <button
                        className={`button is-primary center`}
                        onClick={this.handleSubmit}
                    >
                        Are you sure you trust me?
                    </button>
                }
                {
                    this.state.activate > 0 &&
                    <video autoPlay loop id="video">
                        <source src={bgvideo} type='video/mp4' />
                    </video>
                }

            </div>
        );
    }
}

export default Nsfw;
