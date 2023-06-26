import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsEdit } from '../../actions/actions';
import Header from '../../components/Header/Header';
import axios from 'axios';
import './Home.css';

function Home() {

    const navigateToForm = useNavigate();
    const navigateToSignUp = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const onSubmit = () => {
        const userSession = sessionStorage.getItem("activeSessionEmail");

        if(userSession !== "")
        {
            dispatch(setIsEdit(true));
            navigateToForm('/form');
        }
        else
        {
           alert("Please Sign Up!");
           navigateToSignUp('/'); 
        }
    };

    useEffect(() => {
        const userSession = sessionStorage.getItem("activeSessionEmail");
        sessionStorage.removeItem("currentID");
        const url = `https://donationmadesimple-default-rtdb.firebaseio.com/postData/${userSession}.json`;
        axios.get(url
        ).then((response) => {
            console.log(response.data);
            setData(response.data);
        })
        .catch((error) => {
            alert("Error loading data. Please try again!");
          });
    },[]);


    return (
        <div>
            <Header />
         <div>   
            <div className="row">
                <div className="col-lg-3 col-md-4 offset-lg-9 offset-md-8">
                    <button className="btn add-data-btn" onClick={onSubmit}>Add New Data</button>
                </div>
            </div>

            <div className="row">
            {data !== null &&  Object.keys(data).map((recordKey)  => {
                const record = data[recordKey];
                if(recordKey === "address" || recordKey === "name")
                    return null;
                return(
                <div className=" col-lg-4 col-md-6 col-sm-12" key={recordKey}>
                    <div className="box bg-white custom-box">
                        <div className="table-container">    
                            <table style={{ borderCollapse: 'collapse' }}>
                                <tbody>
                                    <tr>
                                    <td style={{ fontWeight: 'bold', textAlign:'left' }}>Contact Person:</td>
                                    <td style={{ textAlign: 'center' }}>{record.c_name}</td>
                                    </tr>
                                    <tr>
                                    <td style={{ fontWeight: 'bold', textAlign:'left' }}>Contact Number:</td>
                                    <td style={{ textAlign: 'center' }}>{record.c_number}</td>
                                    </tr>
                                    <tr>
                                    <td style={{ fontWeight: 'bold', textAlign:'left' }}>Requirements:</td>
                                    <td style={{ textAlign: 'center' }}>{record.requirement}</td>
                                    </tr>
                                    <tr>
                                    <td style={{ fontWeight: 'bold', textAlign:'left' }}>Number of Items:</td>
                                    <td style={{ textAlign: 'center' }}>{record.items}</td>
                                    </tr>   
                                    <tr>
                                    <td style={{ fontWeight: 'bold', textAlign:'left' }}>Latest By:</td>
                                    <td style={{ textAlign: 'center' }}>{record.dateofservice}</td>
                                    </tr>   
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <br/>
                </div>
                )})}
            </div>
        </div>
        </div>
    );

}

export default Home;