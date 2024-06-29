import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Main from './components/Main';
import Country from './components/Country';
import {Routes,Router,Route} from 'react-router-dom'
import { useState } from 'react';
function App() {
  const [inputCountry,setInputCountry] = useState('')
  return (
    <div className="App bg-slate-800 min-h-screen">
      <Nav/>
      {
        inputCountry === '' ?  <Main
        setInputCountry = {setInputCountry}
        inputCountry = {inputCountry}
      /> :  <Country inputCountry = {inputCountry} setInputCountry = {setInputCountry}/>
      }

    </div>
  );
}

export default App;
