import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Die from "../components/Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import useWindowSize from "@rooks/use-window-size"

export default function App() {

  const[dice, setDice] = useState(allNewDice())
  const[tenzies, setTenzies] = useState(false)

  function allNewDice(){
    const newDice = []
    for(let i = 0; i < 10; i++){
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }

    return newDice
  }

  
  function holdDice(id){
    setDice(function(prevState){

      const temp = prevState

      return temp.map(function(item){
        return item.id === id ? {...item, isHeld: !item.isHeld} : item
      })

    })
  }

  function rollDice(){
    setDice(function(prevState){

      const temp = prevState

      return temp.map(function(item){
        return item.isHeld ? item : {value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid()}
      })
    })
  }

  
  const diceElements = dice.map(function(item){
    return <Die
    key = {item.id} 
    id = {item.id}
    value = {item.value}
    isHeld = {item.isHeld} 
    holdDice = {holdDice}
    />
  })

  useEffect(function(){
    let isAllHeld = dice.every(item => item.isHeld)
    let isAllSame = dice.every(item => item.value === dice[0].value)

    if(isAllHeld && isAllSame){
      setTenzies(true)
      console.log("Yay, won")
    }
    else{
      setTenzies(false)
    }

  }, [dice])
  
  const button_val = tenzies ? "New Game" : "Roll" 
  const {width, height} = useWindowSize()

  return(
    <div>
      {tenzies && <Confetti width={width} height={height} />} 
      <h1 className = "title">Tenzies</h1>
      <p className = "instructions">
      Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className = "all--dice">
        {diceElements}
      </div>
      <button className = "button" onClick = {function(){
        if(tenzies)
          return setDice(allNewDice())
        else
          return rollDice()
      }}>{button_val}</button>
    </div>

  )
}

