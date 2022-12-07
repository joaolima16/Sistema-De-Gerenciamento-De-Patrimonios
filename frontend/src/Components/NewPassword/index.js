import * as React from 'react';
import Modal from 'react-modal';
import {FaPlus} from 'react-icons/fa'
import './newPassword.css'
import axios  from 'axios';
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
function NewPasswordModal({state,SetState}) {

  const [modalIsOpen, setIsOpen] = useState(false);
  const[Data,SetData] = useState([])
  const states = useSelector((State)=>State)
  const navigate  = useNavigate();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  
  function RefreshPassword(){
     axios.put(`${process.env.REACT_APP_BACKEND_HOST}:3000/user/refresh`,Data)
     .then((response)=>{alert(response.data)
        navigate("/departments")
    })
     .catch((err)=>{alert("senha incorreta!")})
  }

  return (
    <div className="container-new-modal">
    <button>
      {/* <FaPlus size={25}/> */}
          {/* <span className="tooltiptext">Adicionar item</span> */}
    </button>
    <Modal
      isOpen={state}
      onRequestClose={state}
      className="modalContentPatrimonio"
      overlayClassName="modal-overlay"
    >
      <div className='title'>
         <h1 id='title-modal'>Digite sua senha provisória</h1>
      </div>

      <div className='containerThree'>
          <div>
              <label>senha provisória</label>
              <input onChange={(value)=>{SetData({...Data,currentPassword:value.target.value})}}/>
          </div>
          <div>
              <label>nova senha</label>
              <input onChange={(value)=>{SetData({...Data,newPassword:value.target.value})}}/>
          </div>
      </div>

      <div className='containerButton'>
          <button id='new' onClick={()=>RefreshPassword()}>Verificar</button>
      </div>
    </Modal>

  </div>
);
}

export default NewPasswordModal;