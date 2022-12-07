import { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { MdLock, MdEmail } from 'react-icons/md';
import Imagem1 from '../../assets/imagemlogin.png';
import Logo from '../../assets/logosenai.png';
import Logo2 from '../../assets/logosenai2.png';
import '../../styles/App.css';
import { useDispatch } from "react-redux";
import axios from 'axios';
import NewPasswordModal from "../../Components/NewPassword";

export default function Login(){
  const [userData, setUserData] = useState({email:'', password:''});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email,SetEmail] = useState();
  const [EmailStatus,SetEmailStatus] = useState();
  const [forgetPass, setForgetPass] = useState(false);
  const [userDataForget, setUserDataForget] = useState("");


  function handlerSubmit(e){
    if(userData.email =="" || userData.password ==""){
      return alert("prencha todos os campos!")
    }
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_HOST}:3000/user/login`,userData)
    .then(({data})=>{
      const userData = {
        name:data.name,
        office:data.office
      };
      sessionStorage.setItem("userData",JSON.stringify(userData));
      sessionStorage.setItem("token",data.token)
      dispatch({type:"ADD_TOKEN", data:data.token})
      navigate("/departments");
    })
    .catch((err)=>{alert("Login incorreto!")})
  }
  
  function ForgetPassModal(state, setState, setModal){
    async function sendEmail(value){
      await axios.post(`${process.env.REACT_APP_BACKEND_HOST}:3000/user/email/${value}`)
      .then(async(response)=>{
          SetEmailStatus(await response.data.emailExists)
          console.log(EmailStatus)
      })
      .catch((err)=>{console.log(err)})
      setModal(false)
    }
  
    return(
      <section className="app-black">
        <section className="content">
          <section className="titleModal">
            <h2>Recadastrar Senha</h2>
            <input type="button" value="X" className="exit-btn" onClick={()=>setModal(false)}/>
          </section>
          <label htmlFor="emailInput">Insira o e-mail</label>
          <input type="text" id="emailInput" placeholder="E-mail cadastrado" value={Email} onChange={(e)=>SetEmail(e.target.value)} />
          <p className="formFieldLink" onClick={()=>setModal(false)}>Fazer login</p>
          <button value="Enviar" id="send-btn" onClick={()=>sendEmail(Email)}>Enviar</button>
        </section>
      </section>
    );
  }
  
  return(
      <section className="App">
      <section className="appAside">
        <img className="logosenai" src={Logo}/>
        <img className="imagemteste" src={Imagem1}/>
      </section>
      <section className="appForm">
        <img className="logosenai2" src={Logo2}/>
        <h1 className="pageSwitcher">GERENCIAMENTO DE PATRIMÔNIO</h1>
        <section className="formTitle">
          <Link to="/" className="formTitleLink-active formTitleLink">
            Entrar
          </Link>
          {" "}ou{" "}
          <Link exact
            to="/register"
            activeClassName="formTitleLink-active"
            className="formTitleLink">
            Cadastrar
          </Link>
        </section>
        <section className="formCenter">
          {error && <p id="errorLogin">{error}</p>}  
          <form className="formFields" onSubmit={(e)=>handlerSubmit(e)}>
            <div className="formField">
              <MdEmail size={30} color="gray"/>
              <input
                type="email"
                id="email"
                className="formFieldInput"
                placeholder="Entre com seu Email"
                name="email"
                value={userData.email}
                onChange={(event)=>setUserData({...userData, email:event.target.value})}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="password">
              </label>
              <MdLock size={30} color="gray"/>
              <input
                type="password"
                id="password"
                className="formFieldInput"
                placeholder="Entre com sua Senha"
                name="password"
                value={userData.password}
                onChange={(event)=>setUserData({...userData, password:event.target.value})}
              />
            </div>
            <div className="formField">
              <button className="formFieldButton" type="submit">Entrar</button>
            </div>
            <p className="formFieldLink" onClick={()=>setForgetPass(true)}>
              Esqueci minha Senha
            </p>
          </form>
        </section>
      </section>
      { EmailStatus ===true? <NewPasswordModal state={true}/>:""}
      {forgetPass && ForgetPassModal(userDataForget, setUserDataForget, setForgetPass)}
    </section>
  );
}