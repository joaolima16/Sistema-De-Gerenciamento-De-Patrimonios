import * as React from 'react';
import Modal from 'react-modal';
import './modalInfo.css'
import {FaInfoCircle} from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';

function ModalInfo(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [Data,SetData] = useState([]);
    const state = useSelector((State)=>State) 
    const Patrimony = state.GetValue.value.nPatrimony
    const image = state.GetValue.value.image

    function openModal() {    
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function deletePatrimony() {
        axios.delete(`${process.env.REACT_APP_BACKEND_HOST}:3000/deletePatrimony/${Patrimony}`)
        .then(async(response) => { alert(response.data) })
        .catch((err) => { alert("Não possui permissão para deletar patrimônios") })
    }

    function UpdatePatrimony() {
        axios.put(`${process.env.REACT_APP_BACKEND_HOST}:3000/updatePatrimony/${Patrimony}`, Data)
        .then((response) => { alert("Patrimônio alterado") })
        .catch((err) => { alert("Não possui permissão para editar patrimônios") })
    }

    React.useEffect(()=>{

        //     // axios.get(`${process.env.REACT_APP_BACKEND_HOST}:3000/`)
    },[])

    return (
        <div className="containerModal">
            <button onClick={openModal}>
                <FaInfoCircle size={20} id={props.theme}/>
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                overlayClassName="modal-overlay"
                className="modal-content"
            >
                <div className='headerModal'>
                    <h1>Informaçoes do patrimônio</h1>
                    <p>Neste modal você poderá fazer as seguintes alterações:</p>
                </div>             
                <form>
                    <div className='containerUpModal'>
                        <div className='containerImage'>
                            <img alt="item" id='item' src={image} />
                        </div>
                        <div>
                            <div className='containerRight'>
                                <div>
                                    <label>Modelo</label>
                                    <select onChange={(value) => { SetData({ ...Data, type: value.target.value }) }} defaultValue="cadeira">
                                            <option id='cadeira' value="cadeira" selected>
                                                Cadeira
                                            </option>
                                            <option id='mesa' value="mesa">                                   
                                                Mesa                               
                                            </option>
                                            <option id='computador' value="computador">                
                                                Computador
                                            </option>
                                            <option id='televisao' value="televisao">
                                                Televisão
                                            </option>
                                            <option id='projetor' value="projetor">
                                                Projetor
                                            </option>
                                    </select>
                                </div>
                                <div className='containerInfo'>
                                    <div>
                                        <label>Situação</label>
                                        <select onChange={(value) => { SetData({ ...Data, situation: value.target.value }) }} defaultValue="cadeira">
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
                                <div className='containerInfo'>
                                    <div>
                                        <label>N° de identificação</label>
                                        <input onChange={(value)=>SetData({...Data,numberPatrimony:value.target.value})} />
                                    </div>
                                    <div>
                                        <label>Valor</label>
                                        <input  onChange={(value)=>{SetData({...Data,value:value.target.value})}}/>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className='containerButtons'>
                        <button id='back'>Voltar</button>
                        <button id='delete' onClick={()=>{deletePatrimony()}}> Excluir</button>
                        <button id='edit' onClick={()=>{UpdatePatrimony()}}>Editar</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default ModalInfo;
