import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../../Components/Header";
import Title from "../../../Components/TitlePage";
import "../Styles/table.css";

function VerificationPatrimonyTable() {
  const [data, setData] = useState([]);
  const states = useSelector((states) => states);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [patrimonies, SetPatrimonies] = useState([]);
  const Room = sessionStorage.getItem("room")
  const department = sessionStorage.getItem("department")

  function RegisterPatrimony() {
    axios.post(`${process.env.REACT_APP_BACKEND_HOST}:3000/VerifyPatrimonys/${Room}`, patrimonies)
      .then(({data}) => { alert(data.msg) })
      .catch((err) => { console.log(err) })
  }

  function PatrimoniesHandler(value) {
    if(!patrimonies.includes(value)) SetPatrimonies([...patrimonies, value]);
  }
  
  function GetData() {
    axios.get(`${process.env.REACT_APP_BACKEND_HOST}:3000/${department}/patrimonys/${Room}`)
      .then((response) => {
        const arr = response.data[0]?.patrimonies.map((item)=>{
          const patrimony = item;
          patrimony.active = false;
          return patrimony;
        });
        setData(arr);
      })
  }

  function Verification_QRCodes(value){
    for(let i in value){
      if(Number(i)){
        axios.post(`${process.env.REACT_APP_BACKEND_HOST}:3000/verify`,{qrcodes:value[i]},{headers:{"Content-Type":"multipart/form-data"}})
        .then(({data:jsons})=>{PatrimoniesHandler(jsons[0])});
      }
    }
    verifierCheck();
  }

  function verifierCheck(){
    const arrData = data
    patrimonies.forEach((item)=>{
      if(data.includes(item)){
        arrData[data.indexOf(item)].checked = true;
      }
    })
    setData(arrData);
  }

  useEffect(() => {
    setTheme(states.NavData.value.theme);
    GetData();
  }, [states.NavData])

  return (
    <>
      <Header />
      <Title title="Verificação de Patrimônio" />
      <div className="containerUp-v">
        <div className="tableContainer-verification">
          <div className="subContainer">
            <label htmlFor="qrcodes-input" className="btn-add-patrimonio btn-archive">
              Verificar 
            </label>
            <input type="file" accept="image/png, image/gif, image/jpeg" multiple hidden id="qrcodes-input" onChange={(e)=>{
              Verification_QRCodes(e.target.files);
            }}/>
            <table className="table">
              <thead className="thead">
                <tr>
                  <td>N° de identificação</td>
                  <td>Nome/modelo</td>
                  <td>valor</td>
                  <td>Situação</td>
                  <td>N°sala</td>
                  <td>verificar</td>
                </tr>
              </thead>
              <tbody>
                {data.length > 0?
                  data.map((index,i) =>(
                      <tr key={i}>
                        <td>
                          <p className="id-object">{index?.nPatrimony}</p>
                        </td>
                        <td>
                          <span>{index?.type}</span>
                        </td>
                        <td>
                          <span>{index?.value}</span>
                        </td>
                        <td> 
                          <span>{index?.status}</span>
                        </td>
                        <td>
                          <span>{department}: {Room}</span>
                        </td>
                        <td>
                          <input type="checkbox" checked={index.checked} onChange={(e) => {PatrimoniesHandler(index?.nPatrimony) }} />
                        </td>
                      </tr>
                    )
                  )
                :
                <>
                  <h3>Falha ao verificar patrimonios</h3>
                  <p>Certifique-se de que não há nenhum filtro ou entre novamente na página de departamentos</p>
                </>
                } 
              </tbody>
            </table>
          </div>
          <div className="tabbleFooter">
            <div className="pagination"></div>
          </div>
        </div>
        <button onClick={() => { RegisterPatrimony() }} className="btn-finaliza" >Finalizar</button>
      </div>
    </>
  );
}

export default VerificationPatrimonyTable;
