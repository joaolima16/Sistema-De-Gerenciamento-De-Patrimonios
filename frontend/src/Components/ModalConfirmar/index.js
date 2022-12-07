import './style.css';
import { useState } from "react";
import Modal from "react-modal";
import ImagemVerifica from "../../assets/imagem.png" 

Modal.setAppElement("#root")

function ModalConfirmar() {
  const [modalIsOpen, setIsOpen ] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className='container-modal-confirmar'>
      <button 
        className="btn-salvar" 
        onClick={openModal}> Salvar
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="exemplo"
        overlayClassName="modal-overlay"
        className="modal-content-confirmar">

          <img src={ImagemVerifica} id="imagemVerifica"/>
          <h1>Salvar informações?</h1>
          <div className='container-button'>
            <button onClick={() => {}} className='btn-confirmar'>Cadastrar</button>
            <button onClick={closeModal} className='btn-voltar'>voltar</button>
          </div>
        </Modal>
    </div>
  );
}

export default ModalConfirmar;

