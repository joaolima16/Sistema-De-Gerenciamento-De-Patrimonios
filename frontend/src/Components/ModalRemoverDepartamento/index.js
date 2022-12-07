import axios from 'axios';
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import './style.css';
Modal.setAppElement("#root")

function ModalRemoverDepartamento() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [Departments, SetDepartments] = useState([]);
  const [Rooms, SetRooms] = useState([])
  const [DeleteRoom, SetDeleteRoom] = useState([])
  const [modalDeparment, setModalDeparment] = useState(false);
  const [Data, SetData] = useState([])
  const [IdDep, SetIdDep] = useState()
  const navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
  }

  function GetDepartments() {
    axios.get(`${process.env.REACT_APP_BACKEND_HOST}:3000/department`)
      .then((response) => { SetDepartments(response.data) })
      .catch((err) => { navigate("/departments") })
  }

  function DeleteRooms() {
    axios.delete(`${process.env.REACT_APP_BACKEND_HOST}:3000/room/${DeleteRoom}`)
      .then((response) => { alert(response.data.msg) })
      .catch((err) => { navigate("/departments") })
  }

  function DeleteDepartment() {
    axios.delete(`${process.env.REACT_APP_BACKEND_HOST}:3000/department/${IdDep}`)
      .then((response) => { alert(response.data)})
      .catch((err) => { navigate("/departments") })
  }

  function GetRooms(value) {
    console.log(value)
    axios.get(`${process.env.REACT_APP_BACKEND_HOST}:3000/department?department=${value}`)
      .then(({data}) => { SetRooms(data[0].rooms) })
      .catch((err) => { navigate("/departments") })
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_HOST}:3000/department`)
      .then((response) => { SetData(response.data) })
      .catch((err) => { navigate("/departments") })
  }, [])


  function modalRemoveDeparment() {
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="exemplo"
        overlayClassName="modal-overlay-dep"
        className="modal-content-dep">
        <h1 className="titulo">Remover Departamento</h1>
        <div className='container-info-novo'>
          <div className='container-nome-novo'>
            <label>Nome do departamento</label>
            <select className='select' onChange={(e) => { SetIdDep(e.target.value) }}>
              <option value="0" hidden selected>--choose an department --</option>
              {Data.map(({ id, name }) => (<option value={id}>{name}</option>))}
            </select>
          </div>
        </div>
        <div className='container-button'>
          <button className='btn-remover' onClick={() => { DeleteDepartment() }}>Remover</button>
          <button onClick={() => setModalDeparment(false)} className='btn-voltar'>voltar</button>
        </div>
      </Modal>);
  };

  useEffect(() => {
    GetDepartments();
  }, [])

  return (
    <div className='container-remover'>
      <button
        className="btn-remover-etiqueta"
        onClick={openModal}> Remover Departamento
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="exemplo"
        overlayClassName="modal-overlay-dep"
        className="modal-content-dep">
        <h1 className="titulo">Remover Ambiente</h1>
        <div className='container-menu'>
          <label>Departamento</label>
          <select className="select" onChange={(e) => { GetRooms(e.target.value) }}>
            <option value="0" hidden selected>--choose an department --</option>
            {Departments.map((index) => (<option value={index?.name}>{index?.name}</option>))}
          </select>
        </div>
        <p href='#' className='link-remover' onClick={() => {
          setModalDeparment(true);
        }}>Remover departamento</p>
        <div className='container-info-cad'>
          <div className='container-identificacao'>
            <label>N° de identificação</label>
            <select onChange={(e) => { SetDeleteRoom(e.target.value) }}>
              <option value="0" hidden selected>--choose an room --</option>
              {Rooms.map((index) =>(<option value={index?.id}>{index?.nRoom}</option>))}
            </select>
          </div>
        </div>
        <div className='container-button'>
          <button onClick={() => { DeleteRooms() }} className='btn-remover'>Remover</button>
          <button onClick={closeModal} className='btn-voltar'>voltar</button>
        </div>
      </Modal>
      {modalDeparment && modalRemoveDeparment()}
    </div>
  );
}

export default ModalRemoverDepartamento;

