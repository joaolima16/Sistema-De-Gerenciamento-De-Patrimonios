import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalInfo from "../../../Components/ModalInfo";
import NewPatrimonioModal from '../../../Components/newpatrimoniomodal';
import Title from "../../../Components/TitlePage";
import "../Styles/table.css";

function Tables() {
  const [data, SetDatas] = useState([]);
  const [departments,setDepartments] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [Filter, SetFilter] = useState([]);
  const states = useSelector((states)=>states);    
  const [theme, setTheme] = useState("light")
  const dispatch = useDispatch();
  const Room = sessionStorage.getItem("room")
  const Department = sessionStorage.getItem("department")
  
  function toggleTheme(){
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }

  function GetDepartments(){
    axios.get(`${process.env.REACT_APP_BACKEND_HOST}:3000/department`)
    .then((response)=>setDepartments(response.data))
  }

  function GetRooms(value) {
    axios.get(`${process.env.REACT_APP_BACKEND_HOST}:3000/department?department=${value}`)
    .then((response) => { setRooms(response.data[0].rooms) })
  }

  async function filterResult() {
    SetDatas([])
    if(Room && Department){
      if (Filter.length>0) {
        await axios.post(`${process.env.REACT_APP_BACKEND_HOST}:3000/${Room}/filterPatrimony/${Department}/${Filter}`)
          .then((response) => {
            SetDatas(response.data.FilterPatrimony[0].rooms[0]?.patrimonies)
          })
          .catch((err) => { console.log(err) })
      }
      else{
         axios.get(`${process.env.REACT_APP_BACKEND_HOST}:3000/${Department}/patrimony/${Room}`)
        .then((response) => {
          SetDatas(response.data?.rooms[0].patrimonies)
        })
      }
    }
  }

  useEffect(()=>{
    setTheme(states.NavData.value.theme);
    GetDepartments();
    filterResult();
  },[Filter])

  return (
    <>
      <Title title="Tabela de Patrimônios"/>
      <div className="containerUp" >
        <div className="row">
          <table>
            <tbody>
              <div className="col">
                <text className="textclass">Filtro</text>
                <button className="checkbtn" onClick={() => SetFilter("all")}>
                  All
                </button>
                <button
                  className="checkbtn"
                  onClick={() => SetFilter("cadeira")}
                >
                  Cadeira
                </button>
                <button className="checkbtn" onClick={() => SetFilter("projetor")}>
                  Projetor 
                </button>
                <button
                  className="checkbtn"
                  onClick={() => SetFilter("computador")}
                >
                  Computador
                </button>
                <button
                  className="checkbtn"
                  onClick={() => SetFilter("televisao")}
                >
                  Televisão
                </button>
                <button
                  className="checkbtn"
                  onClick={() => SetFilter("mesa")}
                >
                  Mesa
                </button>
              </div>
            </tbody>
          </table>
        </div>
        <div className="tableContainer">
          <button className="btn-add-patrimonio">
            <NewPatrimonioModal Rooms={rooms} GetRooms={GetRooms}  Departments={departments} theme={theme}/>
          </button>
          <div className="subContainer">
            <table className="table">
              <thead className="thead">
                <tr>
                  <td></td>
                  <td>N° de identificação</td>
                  <td>Nome/modelo</td>
                  <td>Situação</td>
                  <td>Valor</td>              
                </tr>
              </thead>
              <tbody>
              {data.length > 0 ?
              data.map((index)=>(
                <tr>
                  <td>
                    <div>  
                      <button onClick={()=>{dispatch({type:'ADD_VALUE',data:{nPatrimony:index?.nPatrimony,image:index?.image}})}}>
                        <ModalInfo theme={theme} />
                        </button>
                    </div>
                  </td>
                  <td >
                    <div>
                      <div>
                        <p className="id-object">{index?.nPatrimony}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span >{index?.type}</span>
                  </td>
                  <td>
                    <span>{index?.status}</span>
                  </td>
                  <td >
                    <span >{index?.value}</span>
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
      </div>
    </>
  );
}

export default Tables;
