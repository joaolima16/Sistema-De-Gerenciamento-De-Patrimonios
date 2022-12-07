import { useState } from "react";
import { Link } from "react-router-dom";
import { MdLock, MdEmail } from 'react-icons/md';
import Imagem1 from '../../assets/imagemlogin.png';
import Logo from '../../assets/logosenai.png';
import Logo2 from '../../assets/logosenai2.png';
import '../../styles/App.css';
import axios from 'axios';

export default function Register() {
  const [userDatas, setUserDatas] = useState({ email: '', password: '', name: '', confirmPass: '', office: 'docente' });
  const [status, setStatus] = useState({ type: "", msg: "" });

  function handlerSubmit(e) {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_HOST}:3000/request/create`, { ...userDatas })
      .then(({ data: { status, msg } }) => {
        alert("Pré cadastro concluido! aguarde ser aprovado")
        setStatus({ type: status, msg }
        )
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="App">
      <div className="appAside">
        <img className="logosenai" src={Logo} />
        <img className="imagemteste" src={Imagem1} />
      </div>
      <div className="appForm">
        <img className="logosenai2" src={Logo2} />
        <div className="pageSwitcher">
          GERENCIAMENTO DE PATRIMÔNIO
        </div>
        <div className="formTitle">
          <Link
            to="/"
            className="formTitleLink"
          >
            Entrar
          </Link>
          {" "}ou{" "}
          <Link
            exact
            to="/register"
            className="formTitleLink-active formTitleLink"
          >
            Cadastrar
          </Link>
        </div>
        <div className="formCenter">
          <form onSubmit={(e) => handlerSubmit(e)} className="formFields">
            <div className="formField">
              <input
                type="text"
                id="name"
                className="formFieldInput"
                placeholder="Nome Completo"
                value={userDatas.name}
                onChange={(event) => setUserDatas({ ...userDatas, name: event.target.value })}
              />
            </div>
            <div className="formField">
              <input
                type="text"
                id="cpf"
                className="formFieldInput"
                placeholder="Insira seu cpf"
                name="cpf"
                minLength={11}
                maxLength={11}
                value={userDatas.cpf}
                onChange={(event) => setUserDatas({ ...userDatas, cpf: event.target.value })}
              />
            </div>
            <div className="formField">
              <MdEmail className="senha" size={20} color="gray" />
              <input
                type="text"
                id="name"
                className="formFieldInput"
                placeholder="Insira seu e-mail"
                name="name"
                value={userDatas.email}
                onChange={(event) => setUserDatas({ ...userDatas, email: event.target.value })}
              />
            </div>
            <div className="formField">
              <MdLock className="senha" size={20} color="gray" />
              <input
                type="password"
                id="password"
                className="formFieldInput"
                placeholder="Senha"
                name="password"
                value={userDatas.password}
                onChange={(event) => setUserDatas({ ...userDatas, password: event.target.value })}
              />
            </div>
            <div className="formField">
              <MdLock className="senha" size={20} color="gray" />
              <input
                type="password"
                id="password1"
                className="formFieldInput"
                placeholder="Confirme sua Senha"
                name="password1"
                value={userDatas.confirmPass}
                onChange={(event) => setUserDatas({ ...userDatas, confirmPass: event.target.value })}
              />
            </div>
            <div className="topping">
              <div className="topping3">
                <input
                  type="checkbox"
                  id="topping"
                  className="topping1"
                  value="Teste"
                  name="typeUser"
                  checked={userDatas.office == 'docente'}
                  onChange={() => setUserDatas({ ...userDatas, office: 'docente' })}
                />Docente
              </div>
              <div className="topping3">
                <input
                  type="checkbox"
                  id="topping2"
                  className="topping2"
                  value="Teste"
                  name="typeUser"
                  checked={userDatas.office == 'admin'}
                  onChange={() => setUserDatas({ ...userDatas, office: 'admin' })}
                />Administrador
              </div>
            </div>
            {console.log(status)}
            {status.msg &&
              <div className="formField">
                <p className={status.type === "error" ? "error" : "success"}>{status.msg}</p>
              </div>
            }
            <div className="formField">
              <button className="formFieldButton2" type="submit" onClick={handlerSubmit}>Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};