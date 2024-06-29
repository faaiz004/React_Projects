import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import countryData from "../data.json";
import Nav from "./Nav";
import "../menu.css";
function Menu({setRegion}) {
  function handleRegion(e){
    setRegion(e.target.value)
  }
  return (
    <div className="ml-auto w-fit mr-20 mt-4 z-10 absolute right">
      <div className="flex flex-col items-start gap-2  pl-4 pr-28 rounded-lg bg-slate-700 py-2">
        <option value="Africa" className="text-gray-400 font-semibold cursor-pointer hover:text-gray-200" onClick={handleRegion}>Africa</option>
        <option value= "Americas" className="text-gray-400 font-semibold cursor-pointer  hover:text-gray-200"onClick={handleRegion}>Americas</option>
        <option value= "Asia" className="text-gray-400 font-semibold cursor-pointer  hover:text-gray-200"onClick={handleRegion}>Asia</option>
        <option value = "Europe" className="text-gray-400 font-semibold cursor-pointer  hover:text-gray-200"onClick={handleRegion}>Europe</option>
        <option value= "Oceania" className="text-gray-400 font-semibold cursor-pointer  hover:text-gray-200"onClick={handleRegion}>Oceania</option>
      </div>
    </div>
  );
}

export default function Main(props) {
  const [region,setRegion] = useState('')
  const [menu, setMenu] = useState(false);
  const [data, setData] = useState([]);
  function handleClick(name){
    props.setInputCountry(name)
  }
  let displayCountries = data.map((country) => {
    return (
      <div className="flex flex-col gap-2 mt-8 items-start mx-24 bg-slate-700 rounded-lg">
        <img src={country.flags.svg} className = "  rounded-md w-full h-32 object-cover"/>
        <h1 className="text-white  ml-4 mt-2 font-semibold text-lg cursor-pointer" onClick={()=>handleClick(country.name)}>{country.name}</h1>
        <div className="flex flex-col ml-4 text-sm items-start text-white mb-2 font-semibold">
          <span>Population: <span className="text-gray-400">{country.population}</span> </span>
          <span>Region: <span className="text-gray-400">{country.region}</span></span>
          <span>Capital: <span className="text-gray-400">{country.capital}</span></span>
        </div>
        
      </div>
    );
  });
  function handleMenu() {
    setMenu((prevMenu) => !prevMenu);
  }
  function checkNum(arr, country) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === country) {
        return false;
      }
    }
    return true;
  }
  useEffect(() => {
    let randNums = 0;
    let rands = new Array();
    while (randNums < 8) {
      let random = countryData[Math.floor(Math.random() * countryData.length)];
      while (!checkNum(rands, random)) {
        random = countryData[Math.floor(Math.random() * countryData.length)];
      }
      rands.push(random);
      randNums++;
    }
    setData(rands);
  }, []);
  useEffect(() => {

    console.log(data);
  }, [data]);
  
    useEffect(() =>{
      if(region !== ''){
        let randNums = 0;
        let rands = new Array();
        while (randNums < 8) {
          let random = countryData[Math.floor(Math.random() * countryData.length)];
          while (!checkNum(rands, random) || random.region !== region) {
            random = countryData[Math.floor(Math.random() * countryData.length)];
          }
          rands.push(random);
          randNums++;
        }
        setData(rands)
      }
    },[region])

    function handleKeyDown(e){
      if(e.key == "Enter"){
        props.setInputCountry(e.target.value)
      }
    }
  
  return (
    <div>
      <main className="bg-slate-800 pt-20 min-h-screen">
      <div className="search px-20 flex justify-between items-center">
        <div className="flex items-center gap-4 mt-10  p-4 rounded-lg bg-slate-700 lg:w-96">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-gray-400 font-bold"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="focus:outline-none bg-slate-700 text-gray-400 font-semibold"
            placeholder="Search for a country..."
            onKeyDown = {handleKeyDown}
          />
        </div>

        <div
          className="text-gray-400 font-semibold flex items-center mt-10 gap-6 p-4 rounded-lg bg-slate-700 cursor-pointer hover:bg-slate-600 transition ease-linear"
          onClick={handleMenu}
        >
          <span>Filter by Region</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 "
          >
            <path
              fill-rule="evenodd"
              d="M20.03 4.72a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 11.69l6.97-6.97a.75.75 0 011.06 0zm0 6a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 17.69l6.97-6.97a.75.75 0 011.06 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <CSSTransition in={menu} timeout={200} classNames="menu" unmountOnExit>
        <Menu 
          setRegion = {setRegion}
        />
      </CSSTransition>
      <div className="grid grid-cols-2  lg:grid-cols-4 gap-2">{displayCountries}</div>
    </main>
    </div>
    
  );
}
