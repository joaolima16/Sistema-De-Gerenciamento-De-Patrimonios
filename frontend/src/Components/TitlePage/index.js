import React from 'react';
import './title.css'

export default function Title(props){
    return(
        <div className='containerTitle'>
            <h1>{props.title}</h1>
        </div>
    )
}