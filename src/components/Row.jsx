import React from "react";

function Row(props){

    function changeBackground(event){
        event.target.style.background = "yellow";
    }

    function changeBackgroundBack(event){
        event.target.style.background =" white";
    }

    return(
       <tr onMouseOver={changeBackground} onMouseOut={changeBackgroundBack}>
           <td>{props.flightNumber}</td>
           <td>{props.launchDate}</td>
           <td>{props.launchName}</td>
           <td>{props.rocketName}</td>
           <td>{props.details}</td>
       </tr>

    )
}

export default Row;