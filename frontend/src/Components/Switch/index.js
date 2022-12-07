import React from "react";
import './styleSwitch.css'
import {BsSunFill, BsFillMoonFill} from 'react-icons/bs';
import Switch from 'react-switch';

export default function SwitchComp(props){
    return(
        <div className="containerSwitch">
          <BsSunFill />
          <Switch 
              onColor="#232240"
              onChange={props.theme}
              checked={props.dark === "dark"}
              uncheckedIcon=''
              checkedIcon=''
          />
          <BsFillMoonFill />
        </div>
    )
}
