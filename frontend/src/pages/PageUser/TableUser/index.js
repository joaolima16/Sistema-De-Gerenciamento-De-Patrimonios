import axios from "axios";
import * as React from "react";
import ModalUser from "../../../Components/ModalUsers";
import Title from "../../../Components/TitlePage";
import '../StylesUsers/tableUser.css';

export default function TableUser(){
    const [datas,Setdatas] = React.useState([])

    function GetData(){
        axios.get(`${process.env.REACT_APP_BACKEND_HOST}:3000/users`)
        .then((response)=>{Setdatas(response.data)})
    }

    React.useEffect(()=>{
        GetData();
    },[])

    return(
        <>
            <Title title="Tabela de Usuários"/>
            <div className="containerUsersUp">
                <div className="tableUsersContainer">
                <div className="subContainerUsers">
                    <table className="tableUsers">
                        <thead className="theadUsers">
                            <tr>
                                <th>Email</th>
                                <th>Nome de Usuário</th>
                                <th>Cargo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {datas.map((values,i) => (
                            <tr key={i}>
                                <td>
                                    <div>
                                        <p id="id-object">{values?.email}</p>
                                    </div>
                                </td>
                                <td>
                                    <span >{values?.name}</span>
                                </td>
                                <td>
                                {values?.office}
                                </td>
                                <td >
                                    <div>
                                        <button onClick={()=>{sessionStorage.setItem("Email",values?.email)}}>
                                            <ModalUser />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            )
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="tableUsersFooter">
                    <div className="paginationUsers">
                
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}