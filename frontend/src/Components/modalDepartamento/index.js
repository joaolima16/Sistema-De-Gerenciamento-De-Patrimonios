import axios from 'axios';
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import './style.css';

Modal.setAppElement("#root")

function ModalDepartamento(props) {
  const [modalIsOpen, setIsOpen ] = useState(false);
  const [modalCreateDeparment, setModalCreateDeparment] = useState(false);
  const [Items,SetItems] = useState();
  const [Data,SetData] = useState([]);
  const [Departments,SetDepartments] = useState([])
  const navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  
  function GetDepartments(){
    axios.get(`${process.env.REACT_APP_BACKEND_HOST}:3000/department`)
    .then((response)=>{SetDepartments(response.data)})
  }

  function CountPatrimonys(){
    axios.get(`${process.env.REACT_APP_BACKEND_HOST}:3000/count/patrimonys`)
    .then((response)=>{SetItems(response.data)})
  }
  
  function CreateDepartment(){
    axios.post(`${process.env.REACT_APP_BACKEND_HOST}:3000/department`,Data)
    .then((response)=>{
      alert(response.data.msg)
      GetDepartments();
    })
    .catch((err) => { navigate("/departments") })
  }

  function CreateRoom(){
    axios.post(`${process.env.REACT_APP_BACKEND_HOST}:3000/room/insert`,Data)
    .then((response)=>{alert(response.data)})
    .catch((err) => { navigate("/departments")})
  }

  useEffect(()=>{
    GetDepartments();
    CountPatrimonys()
  },[])

  function modalCriarDeparment(){ 
    return(
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="exemplo"
      overlayClassName="modal-overlay-dep"
      className="modal-content-dep">
        
        <h1 className="titulo">Criar Departamento</h1>
        <div className='container-info-novo'>
          <div className='container-nome-novo'>
            <label>Nome do departamento</label>
            <input className="input-nome-novo" onChange={(e)=>{SetData({...Data,name:e.target.value})}}></input>
          </div>
        </div>
        <div className='container-button'>
          <button onClick={() => {CreateDepartment()}} className='btn-cadastrar'>criar</button>
          <button onClick={()=>setModalCreateDeparment(false)} className='btn-voltar'>voltar</button>
        </div>
      </Modal>
    );
  };

  return (
    <div className='container'>
      <div className='container-etiquetas'>
        <div className='card-total-itens'>
            <h1>Total de itens</h1>
            <p>{Items}</p>
        </div>
        <button className="btn-ver" onClick={openModal}>
          <img src='../assets/cadastro.png' alt='' className='icon-cadastro'/>
          Cadastrar Departamento
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="exemplo"
        overlayClassName="modal-overlay-dep"
        className="modal-content-dep">
          <h1 className="titulo">Cadastrar novo ambiente </h1>
          <div className='container-menu'>
            <label>Departamento</label>
            <select className="select" onChange={(e)=>{SetData({...Data,department:e.target.value})}}>
            <option value="0" hidden selected>--choose an department --</option>
              {Departments.map((index)=>(<option value={index?.id} key={index?.id}>{index?.name}</option>))}
            </select>
            <p href='#' className='link-criar' onClick={()=>setModalCreateDeparment(true)}>criar departamento</p>
          </div>
          <div className='container-info-cad'>
            <div className='container-identificacao'>
              <label>N° de identificação</label>
              <input className="input-ident"  onChange={(e)=>SetData({...Data,nRoom:e.target.value})}></input>
            </div>
          </div>
          <div className='container-button'>
            <button onClick={()=>CreateRoom()} className='btn-cadastrar'>Cadastrar</button>
            <button onClick={()=>closeModal()} className='btn-voltar'>voltar</button>
          </div>
      </Modal>
      {modalCreateDeparment && modalCriarDeparment()}
    </div>
  );
}

export default ModalDepartamento;

