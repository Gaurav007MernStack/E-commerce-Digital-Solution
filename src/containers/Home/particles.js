import React, { Component } from "react";
import Particles from "react-particles-js";

class Particle extends Component {
  state = { width: "0px", height: "0px" };
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }
  updateWindowDimensions = () => {
    this.setState({
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`
    });
  };
  render() {
    const { width, height } = this.state;
    console.log(width, height);
    return (
      <div style={{background: "#000"}}>
          <Particles
        {...this.state}
        params={{
                    "particles": {
                        "number": {
                            "value": 100
                        },
                        "size": {
                            "value": 3
                        },
                        "color": {
                            "value": "#e4e4e4"
                          }
                    },
                    "interactivity": {
                        "events": {
                            "onHover": {
                                "enable": true,
                                "mode": "repulse"
                            }
                        }
                    }
                }}
                id="particle"
      />
      </div>
    );
  }
}

export default Particle;
