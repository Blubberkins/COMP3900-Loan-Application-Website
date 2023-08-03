import React from 'react';
import {  signOut } from "firebase/auth";
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Calculator } from '../components/Calculator';
import Navbar from '../components/Navbar';
 
const Home = () => {
    const userName = window.sessionStorage.getItem('userName');
    const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/login");
            console.log("Signed out successfully")
            window.sessionStorage.setItem('isLogged', false);
        }).catch((error) => {
        // An error happened.
        });
    }
    const handleappointment = () => {               
        signOut(auth).then(() => {
            navigate("/appointment");
        }).catch((error) => {
        // An error happened.
        });
    }
   
    return(
        <>
        <Navbar/>
            <nav>
                <p>
                    Welcome Home
                </p>
 
                <div>
        			<button>
                        {userName}
                    </button>
        		</div>
                <div>
        			<button onClick={handleappointment}>
                        Make appointment
                    </button>
        		</div>
            </nav>
        </>
        
    )
}
 
export default Home;