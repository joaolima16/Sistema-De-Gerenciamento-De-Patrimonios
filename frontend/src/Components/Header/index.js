import * as React from "react";
import { BiLogIn } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Senai from '../../assets/senai.png';
import Sidebar from "../Sidebar";
import "./styleHeader.css";
export default function Header(props){

    const [sidebar, setSidebar] = React.useState(false);
    const showSidebar = () => setSidebar(!sidebar)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function LogoutUser(){
        navigate("/")
        dispatch({type:"REMOVE_TOKEN"})
    }
    
    return(
        <>
            <header className="header-light">
                <div className="header-content-left">
                    <FaBars size={25} id="menu-button" onClick={showSidebar}/>
                    <img id="senai-logo" src={Senai} alt="" />
                </div>
                <div>
                    <button id="button-exit">
                        <BiLogIn size={30}  onClick={()=>{LogoutUser()}}/>
                    </button>
                </div>
            </header>
            <div>
                {sidebar && <Sidebar active={setSidebar} tema={props.tema}/>}
            </div>
        </>
    );
}