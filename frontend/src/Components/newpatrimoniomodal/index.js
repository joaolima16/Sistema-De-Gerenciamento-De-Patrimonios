import * as React from 'react';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa'
import './newpatrimonio.css'
import axios from 'axios';

function NewPatrimonioModal(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [Data, SetData] = React.useState([])
  const token = sessionStorage.getItem("token")
  // const [excel,setExcel] = React.useState(null);
  

  function openModal() {
    setIsOpen(true);
  }
  
  function closeModal() {
    setIsOpen(false);
  }
  
  // function CreateByExcel(){
  //   const formData = new FormData();
  //   formData.append("excel",excel[0])
  //   formData.append("","");

  //   axios.get(`${process.env.REACT_APP_BACKEND_HOST}:3000/room?room=${Data.room}`)
  //   .then(({data})=>{
  //     axios.post(`${process.env.REACT_APP_BACKEND_HOST}:3000/byexcel/${data.id}`,formData)
  //     .then((response)=>console.log(response));
  //   });
  // }

  // React.useEffect(()=>{
  //   if(excel) CreateByExcel();
  // },[excel]);

  async function NewPatrimony() {
    console.log(Data)
    await axios.post(`${process.env.REACT_APP_BACKEND_HOST}:3000/insertPatrimony`, Data, { headers: { "x-access-token": token } })
      .then((response) => { alert(response.data) })
      .catch((err) => {
        alert("Falha ao criar o patrimônio")
      })

  }

  return (
    <div className="container-new-modal">
      <button onClick={openModal}>
        <FaPlus size={25} id={props.theme} />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modalContentPatrimonio-light"
        overlayClassName="modal-overlay">

        <div className='title'>
          <h1>Cadastrar novo patrimônio</h1>
          <p id='info-modal'>Neste modal você poderá fazer as seguintes alterações:</p>
        </div>

        <div className='containerOne'>
          <div>
            <label>Situação</label>
            <select id='selectSituation' onChange={(value) => { SetData({ ...Data, situation: value.target.value }) }}>
              <option value="ativo" hidden selected>-- choose an situation --</option>
              <option id='ativo' value="ativo">
                Ativo
              </option>
              <option id='manutencao' value="manutencao">
                Manutenção
              </option>
              <option id='danificado' value="danificado">
                Danificado
              </option>
              <option id='movido' value="movido">
                Movido
              </option>
            </select>
          </div>
        </div>

        <div className='containerTwo'>
          <label>Modelo</label>
          <select onChange={(value) => { SetData({ ...Data, type: value.target.value }) }} defaultChecked="cadeira">
            <option value="cadeira" hidden selected>--choose an model --</option>
            <option value="cadeira">
              Cadeira
            </option>
            <option value="projetor">
              Projetor
            </option>
            <option value="computador">
              Computador
            </option>
            <option value="televisao">
              Televisão
            </option>
          </select>
          <label>Departamento</label>
          <select onChange={(e)=>{
            SetData({...Data,department:e.target.value})
            props.GetRooms(e.target.value);
          }}>
            <option value="0" hidden selected>--choose an department --</option>
            {props.Departments.map((index)=>(<option value={index?.name} key={index?.id}>{index?.name}</option>))}
          </select>
          <label>N° da sala </label>
          <select onChange={(value) => { SetData({ ...Data, room: value.target.value }) }}>
            <option value="0" hidden selected>--choose an Room --</option>
            {props.Rooms.map((index)=>(<option value={index?.nRoom} key={index?.id}>{index?.nRoom}</option>))}
          </select>
        </div>

        <div className='containerThree'>
          <div>
            <label>N° de identificação</label>
            <input value={Data.codePatrimony} onChange={(value) => { SetData({ ...Data, codePatrimony: value.target.value }) }} />
          </div>
          <div>
            <label>Valor</label>
            <input value={Data.valuePatrimony} onChange={(value) => { SetData({ ...Data, valuePatrimony: value.target.value }) }} />
          </div>
        </div>
        <div className='containerButton'>
          <button id='new' onClick={() => NewPatrimony()}>Cadastrar patrimonio</button>
          {/* <label id='new' htmlFor='fileHidden' className="green">Cadastrar por Excel</label>
          <input onChange={(e)=>setExcel(e.target.files)} type="file" id="fileHidden" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" hidden />
          <p className="alert">(Insira uma sala antes de inserir o arquivo de excel)</p> */}
        </div>
      </Modal>
    </div>
  );
}

export default NewPatrimonioModal;