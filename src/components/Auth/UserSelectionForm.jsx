import React from "react";
import { useNavigate} from 'react-router-dom';
import Header from '../Header/Header';
import './UserSelectionForm.css';

function UserSelectionForm () {

    const navigateToSignUpCustomer = useNavigate();
    const navigateToSignUpNGO = useNavigate();

    const onAsNGOClick=() => {
        navigateToSignUpNGO('/signUpNGO'); 
    };

    const onAsCustomerClick=() => {
        navigateToSignUpCustomer('/signUpCustomer'); 
    };


    return(
        <div>
            <Header/>
            <div className=" custom-box-selection">
                <div>
                    {/* Buttons */}
                    <div>
                        <button type="submit" className="btn btn-ngo-custom" onClick={onAsNGOClick}>Login/SignUp as NGO worker</button>
                    </div>

                    <div style={{ margin: '10%' }}>
                        <button type="submit" className="btn btn-customer-custom" onClick={onAsCustomerClick}>Login/SignUp as Donator</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserSelectionForm;