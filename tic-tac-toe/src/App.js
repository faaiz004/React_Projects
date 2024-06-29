import logo from './logo.svg';
import './App.css';
import Data from './Data';
import React, { useEffect, useState } from "react"
function Game() {
  const [gameData, setGameData] = useState(Data)
  const [turn, setTurn] = useState(true)
  const [result,setResult] = useState('')
  const game = gameData.map(data => {
    return (
      <div className= { data.data === "O"?'Box player1': 'Box player2'}  onClick={() => handleClick(data.id)}>{data.data}</div>
    )

  })
  function handleClick(id) {
    gameData.map(data =>{
      if(data.id == id){
        if(data.on === false){
          setTurn(!turn)
        }
      }
    })
    setGameData(prevGameData => {
      const newGameData = prevGameData.map(data => {
        if (data.on === false) {
          if (data.id === id) {
            if (turn) {

              return { ...data, on: true, data: "O" }
            } else {

              return { ...data, on: true, data: "X" }
            }
          } else {

            return { ...data }
          }
        } else {

          return { ...data }
        }
      })
      return newGameData
    })
  }
  function handleRestard() {
    setTurn(true)
    setResult('')
    setGameData(prevGameData => gameData.map(data => {
      return (
        { ...data, on: false, data: "" }
      )
    }))
  }

  useEffect(() => {
    let GameWin = []
    for (let x = 0; x < 9; x += 3) {
      let check = 0;
      for (let y = x + 1; y <= x + 2; y++) {
        if (gameData[x].data != "") {
          if (gameData[x].data == gameData[y].data) {
            check++
          }
          if (check === 2) {
            GameWin.push(true)
            GameWin.push(gameData[x].data == "O" ? "Player 1 Won" : "Player 2 Won")
          }
        }
      }
    }
    for (let y = 0; y < 3; y++) {
      let check = 0;
      for (let x = y + 3; x <= y + 6; x += 3) {
        if (gameData[y].data != "") {
          if (gameData[y].data == gameData[x].data) {
            check++
          }
          if (check === 2) {
            GameWin.push(true)
            GameWin.push(gameData[x].data == "O" ? "Player 1 Won" : "Player 2 Won")
          }
        }
      }
    }

    if (gameData[0].data === gameData[4].data && gameData[0].data === gameData[8].data && gameData[0].data != "") {
      GameWin.push(true)
      GameWin.push(gameData[0].data == "O" ? "Player 1 Won" : "Player 2 Won")
    }
    if (gameData[6].data === gameData[4].data && gameData[6].data === gameData[2].data && gameData[4].data != "") {
      GameWin.push(true)
      GameWin.push(gameData[4].data == "O" ? "Player 1 Won" : "Player 2 Won")
    }


    if (GameWin.length > 1) {
      setResult(GameWin[1])
      if (GameWin[0] === true) {
        setTimeout(handleRestard,2000)
      }
    }

  }, [gameData])

  return (
    <main>
      <h3 className={turn ? 'player1':'player2'}>{turn ? "Player 1's turn" : "Player 2's turn"}</h3>
      <div className='Game'>
        {game}
        <div className='Result'>{result}</div>
      </div>
      <button onClick={handleRestard} >Restart</button>
    </main>
  )
}
function App() {

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <Game />
    </div>
  );
}

export default App;
