import React, { Component } from 'react';
import { withRouter } from 'react-router';
import BackgroundImage from '../../images/background@3x.png';
const inputFormatAlert = 'Please enter a city and valid state in the following format Portland, OR';
const stateRegex = new RegExp(
  '^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$'
);

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { cityState: '' };
    this.submit = this.submit.bind(this);
  }
  validateCity(city) {
    if (!city) {
      return false;
    }
    return true;
  }
  validateState(state) {
    let validState = true;
    if (!state || !stateRegex.test(state)) {
      validState = false;
    }
    return validState;
  }
  submit() {
    if (this.state.cityState.indexOf(',') < 0) {
      alert(inputFormatAlert);
      return;
    }
    const cityStateParts = this.state.cityState.split(',');
    const city = cityStateParts[0].trim();
    const state = cityStateParts[1].trim();
    const isCityValid = this.validateCity(city);
    const isStateValid = this.validateState(state);

    if (!isCityValid || !isStateValid) {
      alert(inputFormatAlert);
      return;
    }
    const { history } = this.props;
    history.push(`/weather?city=${city}&state=${state}`);
  }
  render() {
    return (
      <section
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        className="hero is-fullheight"
      >
        <div className="hero-body">
          <div className="container">
            <h1 className="title has-text-white is-1">How's the weather?</h1>
            <div className="columns">
              <div className="column is">
                <div className="field is-grouped">
                  <p className="control is-expanded">
                    <input
                      value={this.state.cityState}
                      onChange={e => this.setState({ cityState: e.target.value })}
                      className="search input is-medium is-rounded"
                      type="text"
                      placeholder="Enter City, State (eg: Portland, OR)"
                    ></input>
                  </p>
                  <p className="control">
                    <button onClick={this.submit} className="button is-medium submit">
                      <span>Let’s check</span>
                      <span className="icon is-small">
                        <i className="fas fa-long-arrow-alt-right"></i>
                      </span>
                    </button>
                  </p>
                </div>
              </div>
              <div className="column"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(LandingPage);
