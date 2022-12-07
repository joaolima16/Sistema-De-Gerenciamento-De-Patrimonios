import * as React from "react";
import Modal from "react-modal";
import './style.css'
import { FaRegCheckCircle, FaTimesCircle, FaInfoCircle, FaUserAlt, FaCheck } from "react-icons/fa";


export default function ModalVerification(){
    const [modalIsOpen, setIsOpen ] = React.useState(false);

    function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }

    return(
        <div>
            <button onClick={openModal}>
                <FaCheck size={20} color="#33F46F"/>
            </button>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="exemplo"
            overlayClassName="modal-overlay"
            className="modal-verification-content">
                
                <div className="containerInfoVerification">
                    <div>
                        <p>Deseja permitir o acesso desse usuário?</p>
                    </div>

                    <div className="containerButtonsModalVerification">
                        <div>
                            <label>Sim</label>
                            <button><FaRegCheckCircle size={20} color="#33F46F"/></button>
                        </div>
                        <div>
                            <label>Não Permitir</label>
                            <button><FaTimesCircle size={20} color="red"/></button>
                        </div>
                    </div>
                </div>
            
            </Modal>
        </div>
    )
}