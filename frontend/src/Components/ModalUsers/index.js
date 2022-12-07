import axios from "axios";
import * as React from "react";
import { FaPen, FaTimes, FaUserEdit } from "react-icons/fa";
import Modal from "react-modal";
import './styles.css';


export default function ModalUser(){
    const [modalIsOpen, setIsOpen ] = React.useState(false);
    const [Data,SetData] = React.useState([])

    function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }
      async function DeleteUser(){
        var email =  sessionStorage.getItem("Email")
        axios.delete(`${process.env.REACT_APP_BACKEND_HOST}:3000/user/del/${email}`)
        .then((response)=>{alert("Usuário deletado")})
        .catch((err)=>{alert("Usuário não deletado!")})
      }
      function UpdateUser(){
        axios.put(`${process.env.REACT_APP_BACKEND_HOST}:3000/user/update`,{...Data,currentEmail:sessionStorage.getItem("Email")})
        .then((response)=>{alert("Dados atualizados")})
        .catch((err)=>{alert("Não foi possível atualizar os dados")})
      }
    return(
        <div>
            <button onClick={openModal}>
                <FaUserEdit size={20}/>
            </button>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="exemplo"
            overlayClassName="modal-overlay"
            className="modal-user-content">
                <p id="titleModalUser">Informações de Usuários</p>
                <div className="containerInfoUser">
                    <div className="infoUser">
                        <label>Email</label>
                        <input onChange={(value)=>{SetData({...Data,email:value.target.value})}} />
                    </div>
                    <div className="infoUser">
                        <label>Nome do usuário</label>
                        <input onChange={(value)=>{SetData({...Data,name:value.target.value})}}/>
                    </div>
                    <div className="container-checkbox">
                        <div className="checkbox">
                            <input type="radio"
                             id="topping1"
                             className="topping1"
                             value="admin"
                             name="typeUser"
                             onChange={(value)=>{SetData({...Data,office:value.target.value})}}
                             />
                             admin
                        </div>
                        <div className="checkbox">
                            <input type="radio"
                             id="topping"
                             className="topping12"
                             value="docente"
                             name="typeUser1" 
                             onChange={(value)=>{SetData({...Data,office:value.target.value})}}
                             />
                             docente
                        </div>
                    </div>
                    

                    <div className="containerButtonsModalUser">
                        <button onClick={()=>{UpdateUser()}}><FaPen size={15} color="blue"/></button>
                        <button onClick={()=>{DeleteUser()}}><FaTimes size={15} color="red"/></button>
                    </div>
                </div>
            
            </Modal>
        </div>
    )
}