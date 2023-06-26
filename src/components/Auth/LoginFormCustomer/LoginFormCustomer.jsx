import React  from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate} from 'react-router-dom';
import { loginAuth} from '../AuthService';
import { useState } from 'react';
import Header from '../../Header/Header';
import './LoginFormCustomer.css'



function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigateToSignUp = useNavigate();
    const navigateToHome = useNavigate();
    const [errorMsg, setErrorMsg] = useState(false);

    const onSubmit = (formData) => {

        let email = encodeURIComponent(formData.username);
        const key = email.replace(/\./g, "%40");

        loginAuth(formData.username, formData.password)
        .then((response) => {
            console.log("success!");
            sessionStorage.setItem("userType", "Customer");
            sessionStorage.setItem("activeSessionEmail", key);
            navigateToHome('/homeCustomer');
            })
            .catch((error) => {
            // alert("Error logging in, please try again!");
            setErrorMsg(error);
            });
    };
    
    const handleSignUp = () => {
        navigateToSignUp('/signUpCustomer');
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
 
                 <button type="submit" className="btn btn-loginBtn-custom">Login</button><br/><br/>
                 <button type = "button" className="btn btn-signUpBtn-custom" onClick={handleSignUp}>Don't have an account? Sign Up!</button>
             </form>
         </div>
     </div>
    );
}

export default LoginForm;