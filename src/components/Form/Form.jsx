import React from 'react';
import { useState,useEffect } from 'react';
import { useForm,  Controller } from 'react-hook-form';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import {setIsEdit } from '../../actions/actions';
import Calendar from 'react-calendar';
import axios from 'axios';
import './Form.css';
import 'react-calendar/dist/Calendar.css';
import Header from '../../components/Header/Header';


function Form() {
    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
    const navigateToSummary = useNavigate();
    const navigateToSignUp = useNavigate();
    const navigateToHome = useNavigate();
    const [showCalendar, setShowCalendar] = useState(false);
    const [dateOfService, setDateOfService] = useState(''); 
    const navigateToForm = useNavigate();
    const dispatch = useDispatch();
    const isEditVal = useSelector((state) => state.form.isEdit);
    const [receivedFormData, setReceivedFormData] = useState('');
    const today = new Date();

    function onChangeDate (calDate) {
        if(calDate)
        {
            setDateOfService(calDate.toLocaleDateString());
            setShowCalendar(false);
        }
    }

    const onSubmit = (formData) => {
        console.log('Form submitted!');
        console.log('Form data:', formData);

        formData.dateofservice = new Date(formData.dateofservice).toLocaleDateString();
        const email = sessionStorage.getItem("activeSessionEmail");
        const currentID = sessionStorage.getItem("currentID");

        if(email !== null)
        {
            if(currentID === null)
            {
                axios.post('https://donationmadesimple-default-rtdb.firebaseio.com/postData/' + email+'.json', JSON.stringify(formData), {
                    headers: {
                    'Content-Type': 'application/json'
                    }
                    })
                    .then((response) => {
                    console.log('Data successfully saved to Firebase!');
                    dispatch(setIsEdit(false));
                    navigateToSummary('/summary');
                    sessionStorage.setItem("currentID",response.data.name);
                    })
                    .catch((error) => {
                    console.error('Error saving data to Firebase:', error);
                    alert(error);
                    });
            }
            else
            {
                axios.patch(`https://donationmadesimple-default-rtdb.firebaseio.com/postData/${email}/${currentID}.json`, JSON.stringify(formData), {
                    headers: {
                    'Content-Type': 'application/json'
                    }
                    })
                    .then((response) => {
                    console.log('Data successfully updated!');
                    dispatch(setIsEdit(false));
                    navigateToSummary('/summary');
                    })
                    .catch((error) => {
                    console.error('Error updating data to Firebase:', error);
                    alert(error);
                    });
            }
        }
        else
        {
            alert("Please Sign Up!");
            navigateToSignUp('/');
        }

    };


    const onEdit = () => {
        let activeSession = sessionStorage.getItem("activeSessionEmail");
        if(activeSession !== "")
        {
            dispatch(setIsEdit(true));
            navigateToForm(-1);
        }
        else
        {
            alert("Please Sign Up!");
            navigateToSignUp('/'); 
        }
      };
    
    const checkValReceivedData =() => {
        if(receivedFormData.dateofservice !== undefined)  
            return receivedFormData.dateofservice;
        return '';    
    }

    const isDateDisabled = (date) => {
        return date < today;
    };

    const isPositiveNumber = (value) => {
        return /^[0-9]+$/.test(value);
    };
    
    useEffect(() => {

        if (receivedFormData) {
            Object.keys(receivedFormData).forEach((fieldName) => {
              setValue(fieldName, receivedFormData[fieldName]);
            });
          }
      }, [receivedFormData]);

    useEffect(() => {
        let activeSession = sessionStorage.getItem("activeSessionEmail");
        const currentID = sessionStorage.getItem("currentID");
        if(currentID !== null && activeSession !== null)
        {
            const url = `https://donationmadesimple-default-rtdb.firebaseio.com/postData/${activeSession}/${currentID}.json`;
            axios.get(url
            ).then((response) => {
                console.log(response.data);
                setReceivedFormData(response.data);
            })
            .catch((error) => {
                alert("Error loading data. Please try again!");
                navigateToHome('/homeNGO');
              });
        }

        if(activeSession === null)
            navigateToSignUp('/');
    }, []);  


  return (
    <div>
        <Header/>
    <div className='d-flex justify-content-center custom-box'>   

        <form onSubmit={handleSubmit(onSubmit)}>
            
            {isEditVal && <h4 style={{color:"black"}}>Please Enter the Details:</h4>}
            {!isEditVal && <h4 style={{color:"black"}}>Please Confirm the Details</h4>}
            <br/>

            {/* Contact Person Field */}
            <div className="form-group row">
                <label className="col-sm-5 col-form-label">
                    Contact Person:
                </label>  

                <div className="col-sm-7">
                    <input type="text" className="form-control" 
                    disabled={!isEditVal}
                    {...register("c_name",{required: 'Full Name is required',
                    pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: 'Only alphabet characters are allowed',}})} 
                    />
                    {errors.c_name && <p style={{color:"red"}}>{errors.c_name.message}</p>}
                </div>
            </div>  
            <br />

            {/* Contact Number Field */}
            <div className="form-group row">
                <label className="col-sm-5 col-form-label">
                    Contact Number:
                </label>  
                <div className="col-sm-7">
                    <input type="text" className="form-control"
                    disabled ={!isEditVal}
                    {...register('c_number', {
                        required: 'Mobile number is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Please enter a valid 10-digit mobile number'
                        }
                      })} />
                    {errors.c_number && <p style={{color:"red"}}>{errors.c_number.message}</p>}
                </div>    
            </div>
            <br />  

            {/* Requirement Field */}
            <div className="form-group row">
                <label className="col-sm-5 col-form-label">
                    Requirement:
                </label>  

                <div className="col-sm-7">
                    <input type="text" className="form-control"  
                    disabled={!isEditVal}
                    {...register("requirement",{ required: true })} 
                    />
                    {errors.requirement && <span style={{color:"red"}}>Please mention the requirement</span>}
                </div>    
            </div>  
            <br/>

            {/* Latest By Field */}
            <div className="form-group row">
                <label className="col-sm-5 col-form-label">
                    Latest By:
                </label> 

                <div className="col-sm-7">

                    {( <Controller control={control} name="dateofservice"
                    rules={{ required: true }} render={({ field }) => (
                    <> 
                    <input type="text" className="form-control" onClick={() => setShowCalendar(true)}
                    value={dateOfService!=="" ? dateOfService : checkValReceivedData(receivedFormData)} 
                    disabled ={!isEditVal}
                    onChange={field.onChange} readOnly />
                    {errors.dateofservice && <span style={{color:"red"}}>Date is required</span>}
                    </>)}
                    />)}

                    {showCalendar && ( <div className="calendar-popup">
                    <Controller control={control} name="dateofservice" render={({ field }) => (
                    <Calendar className="form-control" 
                    onChange={(date) => {
                    field.onChange(date);
                    onChangeDate(date);
                    }}
                    value={dateOfService!=='' ? dateOfService : checkValReceivedData(receivedFormData)} 
                    tileDisabled={({ date }) => isDateDisabled(date)}
                    />
                    )}
                    />
                    </div> )}
                </div>
            </div>
            <br />

            {/* Number of Items Field */}
            <div className="form-group row">
                <label className="col-sm-5 col-form-label">
                    Number of Items:
                </label>  
                <div className="col-sm-7">
                    <input type="text" className="form-control"
                    disabled ={!isEditVal}
                    {...register('items', {
                        required: 'Number is required',
                        validate: {
                          positiveNumber: (value) =>
                            isPositiveNumber(value) || 'Invalid number'
                        }
                      })} />
                    {errors.items && <p style={{color:"red"}}>{errors.items.message}</p>}
                </div>    
            </div>
            <br />  

            {/* Buttons */}
            {isEditVal && <button type="submit" className="btn btn-custom">Submit</button>}
            {!isEditVal && <button type="submit" className="btn btn-custom" onClick={onEdit}>Edit</button>}

        </form>
    </div> 
   </div>  

  );
}

export default Form;
