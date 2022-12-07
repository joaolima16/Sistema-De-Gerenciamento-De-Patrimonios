import * as React from 'react';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa'
import './newpatrimonio.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
function ModalExcel() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [Data, SetData] = React.useState([])
    const [Excel,SetExcel] = React.useState();
    const states = useSelector((State) => State)

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    async function uploadArchive(e){
        const formData = new FormData();
        formData.append("excel",Excel)
        formData.append("colcodes",Data?.columnOne);
        formData.append("colnames",Data?.columnTwo);
        formData.append("initialLine",Data?.initialColumn)
        axios.post(`${process.env.REACT_APP_BACKEND_HOST}:3000/byexcel`,formData)
        .then((response)=>{console.log(response)})
        .catch((err)=>{console.log(err)})
    }
    return (
        <div className="container-new-modal">
            <button onClick={openModal}>
                {/* <FaPlus size={25} /> */}
                Upload de arquivo excel
                {/* <span className="tooltiptext">Adicionar item</span> */}
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modalContentPatrimonio"
                overlayClassName="modal-overlay"
            >
                <div className='title'>
                    <h1 id='title-modal'>Upload de arquivo excel</h1>
                    <p id='info-modal'>Neste modal você poderá fazer as seguintes alterações:</p>
                </div>
                <div className='containerOne'>
                    <div>
                        <label>Adicionar arquivo excel</label>
                        <input type="file"  accept='.xlsx'  onChange={(value)=>{SetExcel(value.target.files[0])}}/>
                    </div>
                </div>
                <div className='containerThree'>
                    <div>
                        <label>Colunas do excel</label>
                        <input onChange={(value) => { SetData({ ...Data, columnTwo: value.target.value }) }} />
                    </div>
                    <div>
                        <label>Linha inicial</label>
                        <input onChange={(value) => { SetData({ ...Data, initialColumn: value.target.value }) }} />
                    </div>
                    <div>
                        <label>nome da excel</label>
                        <input onChange={(value) => { SetData({ ...Data, columnOne: value.target.value }) }} />
                    </div>
                </div>

                <div className='containerButton'>
                <button id="back">Voltar</button>
                    <button id='new' onClick={() => uploadArchive()}>Cadastrar patrimonio</button>
                   
                </div>
            </Modal>

        </div>
    );
}

export default ModalExcel;