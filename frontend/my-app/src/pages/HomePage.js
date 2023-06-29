import React from 'react';
import {  signOut } from "firebase/auth";
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Calculator } from '../components/Calculator';
 
const Home = () => {
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
   
    return(
        <>
            <nav>
                <p>
                    Welcome Home
                </p>
 
                <div>
        			<button onClick={handleLogout}>
                        Logout
                    </button>
        		</div>
            </nav>
            <Calculator></Calculator>
        </>
        
    )
}
 
export default Home;