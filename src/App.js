import { Card, CardContent } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import LineGraph from "./components/LineGraph";
import Map from "./components/Map";
import Table from "./components/Table";
import {
  selectCasesType,
  selectCountry,
  storeCasesType,
} from "./features/countrySlice";
import { prettyPrintStat } from "./util";

function App() {
  const countryInfo = useSelector(selectCountry);
  const casesType = useSelector(selectCasesType);
  const dispatch = useDispatch();

  return (
    <div className="app">
      {/* header => Title + select input dropdown field */}
      <div className="app__left">
        <Header />
        {!countryInfo ? (
          <div className="app__stats">
            <InfoBox title="Coronavirus Cases" cases={0} total={0} />
            <InfoBox title="Recovered" cases={0} total={0} />
            <InfoBox title="Deaths" cases={0} total={0} />
          </div>
        ) : (
          <div className="app__stats">
            <InfoBox
              isRed
              active={casesType === "cases"}
              onClick={(e) => dispatch(storeCasesType("cases"))}
              title="Coronavirus Cases"
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={prettyPrintStat(countryInfo.cases)}
            />
            <InfoBox
              active={casesType === "recovered"}
              onClick={(e) => dispatch(storeCasesType("recovered"))}
              title="Recovered"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={prettyPrintStat(countryInfo.recovered)}
            />
            <InfoBox
              isRed
              active={casesType === "deaths"}
              onClick={(e) => dispatch(storeCasesType("deaths"))}
              title="Deaths"
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={prettyPrintStat(countryInfo.deaths)}
            />
          </div>
        )}

        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table />
          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
          <LineGraph className="app__graph"/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
