import React, { useState } from 'react';
import { withRouter } from 'react-router';
import BackgroundImage from '../../images/background@3x.png';
const inputFormatAlert = 'Please enter a city and valid state in the following format Dallas, TX';
const stateRegex = new RegExp(
  '^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$'
);

const LandingPage = props => {
  const [cityState, setCityState] = useState('');

  const validateCity = city => {
    if (!city) {
      return false;
    }
    return true;
  };

  const validateState = state => {
    let validState = true;
    if (!state || !stateRegex.test(state)) {
      validState = false;
    }
    return validState;
  };

  const submit = () => {
    if (cityState.indexOf(',') < 0) {
      alert(inputFormatAlert);
      return;
    }
    const cityStateParts = cityState.split(',');
    const city = cityStateParts[0].trim();
    const state = cityStateParts[1].trim();
    const isCityValid = validateCity(city);
    const isStateValid = validateState(state);

    if (!isCityValid || !isStateValid) {
      alert(inputFormatAlert);
      return;
    }
    const { history } = props;
    history.push(`/weather?city=${city}&state=${state}`);
  };

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
                    value={cityState}
                    onChange={e => setCityState(e.target.value)}
                    className="search input is-medium is-rounded"
                    type="text"
                    placeholder="Enter City, State (eg: Dallas, TX)"
                  ></input>
                </p>
                <p className="control">
                  <button onClick={submit} className="button is-medium submit">
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
};

export default withRouter(LandingPage);
