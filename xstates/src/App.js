import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [state, setState] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((value) => value.json())
      .then((value) => {
        setCountry(value);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      )
      .then((res) => {
        setState(res.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [selectedCountry]);

  useEffect(() => {
    axios
      .get(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      )
      .then((res) => {
        setCity(res.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [selectedState]);
  return (
    <div className="App">
      <div>
        <h1>Select Location</h1>
      </div>
      <div>
        <select
          label="select contry"
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setSelectedState("");
          }}
        >
          <option value={""} disabled>
            Select Country
          </option>
          {country.map((count) => (
            <option value={count}>{count}</option>
          ))}
        </select>
        {selectedCountry ? (
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity("");
            }}
          >
            <option value={""} disabled>
              Select State
            </option>
            {state.map((value) => (
              <option value={value}>{value}</option>
            ))}
          </select>
        ) : (
          <select value={""} disabled>
            <option value={""} disabled>
              Select State
            </option>
          </select>
        )}
        {selectedState ? (
          <select
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
            }}
          >
            {city.map((value) => (
              <option value={value}>{value}</option>
            ))}
          </select>
        ) : (
          <select value={""} disabled>
            <option value={""}>Select City</option>
          </select>
        )}
      </div>
      {selectedCountry && (selectedState && selectedCity) ? (
        <div>
          You selected <span>{selectedCity},</span>{" "}
          <span>{selectedState},</span> <span>{selectedCountry}</span>{" "}
        </div>
      ) : null}
    </div>
  );
}

export default App;
