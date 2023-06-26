import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate} from 'react-router-dom';
import {loginAuth} from '../AuthService';
import { useState } from 'react';
import Header from '../../Header/Header';
import axios from 'axios';
import './LoginFormNGO.css'



function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigateToSignUp = useNavigate();
    const [errorMsg, setErrorMsg] = useState(false);
    const [keyExists, setkeyExists] = useState(true);
    const navigateToHome = useNavigate();



    const updateData = (formData,key) => {

        if(formData.address !== undefined && formData.ngo_name !== undefined)
        {
            const ngo = {
                name : formData.ngo_name,
                address: formData.address,
            };
        axios.put(`https://donationmadesimple-default-rtdb.firebaseio.com/postData/${key}.json`, JSON.stringify(ngo),{
        })
        .then((response) => {
        console.log('Data successfully saved to Firebase!');
        setkeyExists(true);
        navigateToHome('/homeNGO');
        sessionStorage.setItem("activeSessionEmail", key);
        sessionStorage.setItem("userType", "NGO");
        })
        .catch((error) => {
        alert("Error saving data");
        });

        }        
    }


    const onSubmit = (formData) => {

        let email = encodeURIComponent(formData.username);
        const key = email.replace(/\./g, "%40");

        loginAuth(formData.username, formData.password)
        .then((response) => {
            console.log("success!");

            const url = `https://donationmadesimple-default-rtdb.firebaseio.com/postData.json`;
                axios.get(url
                ).then((response) => {
                    if(response.data !== null)
                    {
                        console.log(response.data);
                        Object.keys(response.data).map((recordKey) => {
                            let record = decodeURIComponent(key);
                            if(recordKey === record)
                            {
                                setkeyExists(true);
                                sessionStorage.setItem("activeSessionEmail", key);
                                sessionStorage.setItem("userType", "NGO");
                                navigateToHome('/homeNGO');
                            }
                            else
                            {
                                setkeyExists(false);
                                updateData(formData,key);
                            }
                        })
                    }
                    else
                    {
                        setkeyExists(false);
                        updateData(formData,key);
                    }
                })
                .catch((error) => {
                    alert("Error loading. Please try again!");
                });

            })
            .catch((error) => {
                alert("Error logging in, please try again!");
                setErrorMsg(error);
                return;
            });    
        };
    
    const handleSignUp = () => {
        navigateToSignUp('/signUpNGO');
    };

    return (
        <div>
            <Header/>
            <div className="container d-flex justify-content-center custom-boxLogin">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4>Login</h4><br/>
    
                    <div className="form-group">
                    <label>UserName:</label>
                    <input type="text" className="form-control" 
                    {...register('username', {
                        required: 'Email is required',
                        pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address'
                        }
                    })}
                    />
                    {errors.username && <span style={{color:"red"}}>{errors.username.message}</span>}
                    </div>
    
                    <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control"
                    {...register("password",{ required: true })}
                    />
                    {errors.password && <span style={{color:"red"}}>Password is required</span>}
                    </div>
                    <br/>

                    {errorMsg !== null && (
                    <div style={{ color: 'red' }}>{errorMsg}</div>
                    )}

                    {/* NGO name Field */}
                    {!keyExists && <div className="form-group">
                    {!keyExists && <label>
                    NGO name:
                    </label> } 
                    {!keyExists && <input type="text" className="form-control"
                    {...register("ngo_name",{required: 'Name is required',})} 
                    />}
                    {errors.ngo_name && <p style={{color:"red"}}>{errors.ngo_name.message}</p>}
                    </div> } 
                    <br />

                    {/* Address Field */}
                    {!keyExists && <div className="form-group">
                    {!keyExists && <label>
                    NGO Address:
                    </label>  }

                    {!keyExists && <input type="text" className="form-control" 
                    {...register("address",{ required: true })} 
                    />}
                    {errors.address && <span style={{color:"red"}}>Address is required</span>}   
                    </div>}  
                    <br/>
    
                    <button type="submit" className="btn btn-loginBtn-custom">Login</button><br/><br/>
                    <button type = "button" className="btn btn-signUpBtn-custom" onClick={handleSignUp}>Don't have an account? Sign Up!</button>
                </form>
            </div>
     </div>
    );
}

export default LoginForm;