import React from 'react';
import '../PageVerification/StylesVerification/mainPageVerifications.css'
import Header from '../../Components/Header';
import TableVerification from './TableVerification';


export default function mainPageVerification() {
    return (
        <>
            <Header />
            <div className='mainPageVerifications'>
                <TableVerification />
            </div>
        </>
    )
}