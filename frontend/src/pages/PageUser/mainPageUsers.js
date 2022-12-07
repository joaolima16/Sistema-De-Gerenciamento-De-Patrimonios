import React from 'react';
import '../PageUser/StylesUsers/mainPage.css'

import Header from '../../Components/Header';
import TableUser from './TableUser';


export default function mainPageUsers() {
    return (
        <>
        <Header />
            <div className='mainPage'>
                <TableUser />
            </div>
        </>
    )
}