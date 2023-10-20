import React from "react"

export default function Die(props){

    const bgcolor = (props.isHeld) ? "#59E391" : "#FFFFFF"
    const setBackground = {
        backgroundColor: bgcolor
    }
    return(
        <div className = "Square" style = {setBackground} onClick={() => props.holdDice(props.id)}>
            <div className = "die--value" style={setBackground}> {props.value} </div>
        </div>
    )
}