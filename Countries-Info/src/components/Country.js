import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import data from "../data.json";

export default function Country({ inputCountry, setInputCountry }) {
  const [country, setCountry] = useState({});
  const [borders,setBorders] = useState([])
  const [displayBorder,setDisplayBorder] = useState()
  console.log(borders)
  console.log(displayBorder)
  useEffect(() => {
    data.map((coun) => {
      if (coun.name === inputCountry) {
        setCountry(coun);
        setBorders(coun.borders)
      }
    });
  }, [inputCountry]);
  function handleSetInputCountry(Country){
    setInputCountry(Country)
  }
  useEffect(()=>{
    let borderCountries = new Array();
    borders.map(border =>{
        data.map(coun =>{
            if(coun.alpha3Code == border){
                borderCountries.push(coun.name)
            }
        })
    })
    setDisplayBorder(borderCountries.map(borderCountry =>{
        return (
            <div className="p-2 mx-2 mb-2 mt-1 bg-slate-700 rounded-lg text-white font-semibold text-sm cursor-pointer hover:bg-slate-500 transition ease-linear" onClick={() => handleSetInputCountry(borderCountry)}>{borderCountry}</div>
        )
    }))
  },[borders])
  function handleBack() {
    setInputCountry("");
  }
  return (
    <div className="bg-slate-800 min-h-screen max-h-fit pt-32">
      <div
        className="ml-24 flex items-center gap-4 bg-slate-700 w-fit px-4 py-3 rounded-lg shadow-xl cursor-pointer  hover:bg-slate-500 transition ease-linear"
        onClick={handleBack}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-white font-semibold"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <span className="text-white font-semibold text-2xl">Back</span>
      </div>
      <div className="grid grid-cols-2 ml-24 mt-16 gap-20 h-48">
        <div>
          {country.flags && (
            <img
              src={country.flags.svg}
              className="h-56 w-full object-cover shadow-xl lg:h-96 lg:w-9/12"
            />
          )}
        </div>

        {country && (
          <div className="mt-4 lg:mt-10 px-6 lg:px-32">
            <span className="text-white font-bold text-3xl lg:text-4xl w-fit block mr-auto tracking-wide">
              {country.name}
            </span>
            <div className="text-white font-semibold text-xs lg:text-sm flex justify-between">
              <div className="flex flex-col mt-4 lg:mt-8 items-start lg:gap-4">
                <span>
                  Native Name:{" "}
                  <span className="text-gray-400">{country.nativeName}</span>
                </span>
                <span>
                  Population:{" "}
                  <span className="text-gray-400">{country.population}</span>
                </span>
                <span>
                  Region:{" "}
                  <span className="text-gray-400">{country.region}</span>
                </span>
                <span>
                  Sub Region:{" "}
                  <span className="text-gray-400">{country.subregion}</span>
                </span>
                <span>
                  Capital:{" "}
                  <span className="text-gray-400">{country.capital}</span>
                </span>
              </div>
              <div className="flex flex-col mt-4 lg:mt-8 items-start lg:gap-4">
                <span>
                  Top Level Domain:{" "}
                  <span className="text-gray-400">
                    {country.topLevelDomain && country.topLevelDomain[0]}
                  </span>
                </span>
                <span>
                  Currencies:{" "}
                  <span className="text-gray-400">
                    {country.currencies &&
                      country.currencies[0] &&
                      country.currencies[0].name}
                  </span>
                </span>
                <span>
                  Language:{" "}
                  <span className="text-gray-400">
                    {country.languages &&
                      country.languages[0] &&
                      country.languages[0].name}
                  </span>
                </span>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap lg:justify-between items-center">
                <span className="text-white block font-semibold">Border Countries:</span>
                {displayBorder}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
