import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from 'react-icons/ai';
import { FaDoorClosed } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import Header from "../../Components/Header";
import ModalDepartamento from "../../Components/modalDepartamento";
import ModalRemoverDepartamento from "../../Components/ModalRemoverDepartamento";
import Title from "../../Components/TitlePage";
import "./styleDrop.css";

function Departamentos() {
  const states = useSelector((state)=>state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [departmentTypes, setDepartmentTypes] = useState([]);
  const [theme, setTheme] = useState("Departmentlight");
  
  useEffect(()=>{
    const token = states.Token.value !== "" ? states.Token.value : sessionStorage.getItem("token");
    if(states.Token.value === "") dispatch({type:"ADD_TOKEN", data:token});
      axios.get(`${process.env.REACT_APP_BACKEND_HOST}:3000/department`,{headers:{"x-access-token":token}})
      .then(({data})=>setDepartmentTypes(data))
      .catch(()=>navigate("/"));
  },[])

  function nextPage(nRoom,department){
    dispatch({type:"ADD_NAV_DATA", data:{nRoom}})
    sessionStorage.setItem("room",nRoom)
    sessionStorage.setItem("department",department)
    navigate("/table");
  }

  function Selector({name, rooms}){
    return(
        <div className="drop-all">
         {rooms &&
          <Select placeholder={name}
            options={rooms}
            onChange={(e)=>nextPage(e.nRoom,name)}
            getOptionLabel={(e)=>(
              <div className="option-selector">
                <FaDoorClosed size={15}/>
                <p>{e.nRoom}</p>
              </div>
            )}
          />
         }
        </div>
    );
  };
  
  function toggleTheme(){
    setTheme((curr) => (curr === "Departmentlight" ? "Departmentdark" : "Departmentlight"));
  }

  return (
    <>
      <Header/>
       <Title title="Departamentos"/>
      <div className="etiquetas">
        <ModalDepartamento /> 
        <ModalRemoverDepartamento/>
        <AiFillDelete size={50} onClick={()=>{navigate("/trash")}}/>
      </div>
      {departmentTypes.length !== 0 &&
        <section id="selectors">
          {departmentTypes.map(({id, name, rooms})=>(<Selector key={id} name={name} rooms={rooms} id={id} />))} 
        </section>
      }
    </>
  );
}

export default Departamentos;