import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../../Components/Header";
import Title from "../../../Components/TitlePage";
import "../Styles/table.css";


function TrashPatrimonyTable() {
  const [data, setData] = useState([]);
  const states = useSelector((states)=>states);    
  const [theme, setTheme] = useState(localStorage.getItem("theme"));


  function GetData(){
    axios.get(`${process.env.REACT_APP_BACKEND_HOST}:3000/patrimony/trash`)
    .then((response)=>{
      console.log(response.data)
      setData(response.data)})
  }

  useEffect(()=>{
    setTheme(states.NavData.value.theme);
    GetData()
  },[states.NavData])
  
  return (
    <>
    <Header/>
    <Title title="Lixeira de patrimônios"/>
      <div className="containerUp-v">
        {/* <FilterTable /> */}
        <div className="tableContainer-verification">
          <button className="btn-add-patrimonio">
          </button>
          <div className="subContainer">
            <table className="table">
              <thead className="thead">
                <tr>
                  <td>Id</td>
                  <td>N° de identificação</td>
                  <td>Nome/modelo</td>
                  <td>valor</td>
                  <td>Situação</td>
                </tr>
              </thead>
              <tbody>
              {data.map(({id,nPatrimony,value,type,status})=>{
              return(
                <tr>
                  <td>
                    <span>{id}</span>
                  </td>
                  <td>
                    <p className="id-object">{nPatrimony}</p>
                  </td>
                  <td>
                    <span>{type}</span>
                  </td>
                  
                  <td >
                  <span>{value}</span>
                  </td> 
                  <td >
                  <span>{status}</span>
                  </td> 
                </tr>
                  )
              })}
              </tbody>
            </table>
          </div>
          <div className="tabbleFooter">
            <div className="pagination"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default  TrashPatrimonyTable;
