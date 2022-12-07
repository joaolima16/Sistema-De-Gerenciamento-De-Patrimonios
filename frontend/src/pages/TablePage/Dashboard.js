import Header from '../../Components/Header';
import './Styles/dashboard.css';
import Tables from './Tables/Table';


export default function Dashboard() {
    return (
        <>
        <Header />
            <main className='main'>                   
                <Tables/>
            </main>
        </>
    )
}