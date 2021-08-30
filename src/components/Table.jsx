import React, {useEffect, useState} from "react";
//import Row from "./Row";
import {AgGridColumn, AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function Table(){

    const[ships, setShips] = useState(null);
    let rowData = null;
    useEffect( () => {
        getData();
        //Using async/await to fetch this data
        async function getData() {
            const response = await fetch("https://api.spacexdata.com/v4/launches");
            const data = await response.json();

            if(data === null || data === undefined){
                alert("No data was returned from Space X API.")
            }


            //store data in our useState set.
            setShips(data);
            console.log(data);
        }

    }, []);
    //Map data to be used by Ag Grid
    /*rowData = ships && ships.map(function(row){
        return {"Flight Number":  row.flight_number, "Launch Date": row.date_utc, "Launch Name": row.name, "Rocket Name": row.rocket, "Details": row.details, "Press Kit": row.links.presskit !== undefined ? row.links.presskit : ""}
    })*/

    //Simplified map.
    rowData = ships && ships.map((row) =>
        ({
                "Flight Number":  row.flight_number,
                "Launch Date": row.date_utc.substring(0,10),
                "Launch Name": row.name, "Rocket Name": row.rocket,
                "Details": row.details !== null ? row.details : "No Available",
                "Press Kit": row.links.presskit !== null ? row.links.presskit : "No Available"}
    ));


    function callMe(e){
        window.open(e.data["Press Kit"]);
    }

    //Using a conventional table.
    /* return(
         <table className="table">
             <thead>
             <tr>
                 <td>Flight Number</td>
                 <td>Launch Year</td>
                 <td>Launch Name</td>
                 <td>Rocket Name</td>
                 <td>Details</td>
             </tr>
             </thead>
             <tbody>
             { ships && ships.map((spaShip, index) => (
                 <Row key={spaShip.id} flightNumber={spaShip.flight_number} launchDate={spaShip.date_utc} launchName={spaShip.name} rocketName={spaShip.rocket} details={spaShip.details} />
             ))
             }
             </tbody>
         </table>

     );*/
    return (
        <div className="ag-theme-alpine" style={{height: 600, width: 1600}}>
            <AgGridReact rowData={rowData} onRowClicked={callMe} pagination={true}>
                <AgGridColumn maxWidth={150} resizable={true} field="Flight Number"></AgGridColumn>
                <AgGridColumn maxWidth={150} resizable={true} field="Launch Date" sortable={true}></AgGridColumn>
                <AgGridColumn resizable={true} field="Launch Name" sortable={true}></AgGridColumn>
                <AgGridColumn minWidth={300} resizable={true} field="Rocket Name"></AgGridColumn>
                <AgGridColumn minWidth={500} resizable={true} field="Details"></AgGridColumn>
                <AgGridColumn minWidth={500} resizable={true} field="Press Kit"></AgGridColumn>
            </AgGridReact>
        </div>
    );

}

export default Table;