import React from 'react';
import { useForm } from 'react-hook-form';
import {signUpAuth} from '../AuthService';
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Header from '../../Header/Header';
import './SignUpFormNGO.css';

function SignUpForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [usernameExists, setUsernameExists] = useState(false);
    const navigateToHome = useNavigate();
    const navigateToLogin = useNavigate();


    const onSubmit = (formData) => {

        signUpAuth(formData.username, formData.password)
        .then((response) => {
            console.log("success!");
            setUsernameExists(false);

            //Post the required data
            let email = encodeURIComponent(formData.username);
            const key = email.replace(/\./g, "%40");
            const ngo = {
                    name : formData.ngo_name,
                    address: formData.address,
              };
            axios.put(`https://donationmadesimple-default-rtdb.firebaseio.com/postData/${key}.json`, JSON.stringify(ngo),{
            })
            .then((response) => {
            console.log('Data successfully saved to Firebase!');
            navigateToHome('/homeNGO');
            sessionStorage.setItem("activeSessionEmail", key);
            sessionStorage.setItem("userType", "NGO");
            })
            .catch((error) => {
            alert("Error saving data");
            });

        })
        .catch((error) => {
            alert(error);
            if(error === "Email already exists")
                setUsernameExists(true);
        });

    };

    const handleLogin = () => {
        navigateToLogin('/loginNGO');
    };

    return (
    <div>
        <Header/>
        <div className="container d-flex justify-content-center custom-boxSignUp">
            <div className='row col-sm-4'>
                <form onSubmit={handleSubmit(onSubmit)}>
                <h4>SignUp!</h4><br/>

                    <div className="form-group">
                    <label>Email:</label>
                    <input type="text" className="form-control" 
                    {...register('username', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Invalid email address'
                        }
                      })}/>
                    {errors.username && <span style={{color:"red"}}>{errors.username.message}</span>}
                    {usernameExists && (
                    <div style={{ color: 'red' }}>Email already registered</div>
                    )}
                    </div>

                    <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters long'
                        }
                      })}
                    />
                    {errors.password && <span style={{color:"red"}}>{errors.password.message}</span>}
                    </div>
                    <br/>

                    {/* NGO name Field */}
                    <div className="form-group">
                    <label>
                    NGO name:
                    </label>  
                    <input type="text" className="form-control" 
                    {...register("ngo_name",{required: 'Name is required',})} 
                    />
                    {errors.ngo_name && <p style={{color:"red"}}>{errors.ngo_name.message}</p>}
                    </div>  
                    <br />

                    {/* Address Field */}
                    <div className="form-group">
                    <label>
                    NGO Address:
                    </label>  

                    <input type="text" className="form-control"  
                    {...register("address",{ required: true })} 
                    />
                    {errors.address && <span style={{color:"red"}}>Address is required</span>}   
                    </div>  
                    <br/>

                    <button type="submit" className="btn btn-signUp-custom">Sign Up</button><br/><br/>   
                </form>
                <button type ="button" className="btn btn-login-custom" onClick={handleLogin}>Already have an account? Login!</button>
            </div>    
        </div>
            
        </div>
    );
}

export default SignUpForm;