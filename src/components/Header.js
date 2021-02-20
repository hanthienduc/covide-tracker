import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import "./Header.css";
import { useDispatch } from "react-redux";
import { storeCountry } from "../features/countrySlice";
import { storeTable } from "../features/tableSlice";
import { sortData } from "../util";
import {
  storeMapCenter,
  storeMapCountries,
  storeMapZoom,
} from "../features/mapSlice";

function Header({ selectCountry }) {
  const [countries, setCountries] = useState(["USA", "UK", "JAPAN"]);
  const [country, setCountry] = useState("worldwide");
  const dispatch = useDispatch();
  
  // STATE = how to write a variable in REACT <<<<<
  // https://disease.sh/v3/covid-19/countries
  // USEEFFECT = Runs a piece of code
  // baesd on a given condition

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        dispatch(storeCountry(data));
      });
  }, []);

  useEffect(() => {
    // the code inside here will run once
    // when the component loads and not again
    // async -> send a request, wait for it, do something with info

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United Kingdom, United states
            value: country.countryInfo.iso2, // uk usa france
          }));
          const sortedData = sortData(data);

          setCountries(countries);
          dispatch(storeTable(sortedData));
          dispatch(storeMapCountries(data));
          //
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        // All of the data...
        dispatch(storeCountry(data));
        const mapZoom = countryCode !== "worldwide" ? 4 : 1.5;

        const mapCenter = data && countryCode !== "worldwide"
          ? ({
              lat: data.countryInfo.lat,
              lng: data.countryInfo.long,
            })
          : ({
              lat: 0,
              lng: 0,
            });

        dispatch(
          storeMapCenter(mapCenter)
        );
        dispatch(storeMapZoom(mapZoom));
      });
  };

  return (
    <div className="header">
      <h1>COVID 18 TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select onChange={onCountryChange} variant="outlined" value={country}>
          {/* Loop through all the countries and 
            show drop down list of the options */}
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country, index) => (
            <MenuItem key={index} value={country.name}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Header;
