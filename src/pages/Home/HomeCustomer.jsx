import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import axios from 'axios';
import './Home.css';

function Home() {

    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');


    useEffect(() => {
        const url = `https://donationmadesimple-default-rtdb.firebaseio.com/postData.json`;
        axios.get(url
        ).then((response) => {
            if(response.data !== null)
            {
                console.log(response.data);
                setData(response.data);
            }
        })
        .catch((error) => {
            alert("Error loading data. Please try again!");
          });
    },[]);


    return (
        <div>
            <Header/>
         <div>   
            <div className="row">
            {data !== null &&  
                Object.keys(data).map((recordKey)  => {
                return Object.keys(data[recordKey]).map((innerKey) => {
                    const dataRecord = data[recordKey][innerKey];
                if(innerKey === "address" || innerKey === "name")
                    return null;
                return(
                <div className=" col-lg-4 col-md-6 col-sm-12" key={innerKey}>
                    <div className="box bg-white custom-box">
                        <div className="table-container">    
                            <table style={{ borderCollapse: 'collapse' }}>
                                <tbody>
                                    <tr>
                                    <td style={{ fontWeight: 'bold', textAlign:'left' }}>NGO Name:</td>
                                    <td style={{ textAlign: 'center' }}>{data[recordKey]["name"]}</td>
                                    </tr>
                                    <tr>
                                    <td style={{  fontWeight: 'bold', textAlign:'left' }}>NGO Address:</td>
                                    <td style={{ textAlign: 'center' }}>{data[recordKey]["address"]}</td>
                                    </tr>
                                    <tr>
                                    <td style={{ fontWeight: 'bold', textAlign:'left' }}>Contact Person:</td>
                                    <td style={{ textAlign: 'center' }}>{dataRecord.c_name}</td>
                                    </tr>
                                    <tr>
                                    <td style={{ fontWeight: 'bold', textAlign:'left' }}>Contact Number:</td>
                                    <td style={{ textAlign: 'center' }}>{dataRecord.c_number}</td>
                                    </tr>
                                    <tr>
                                    <td style={{ fontWeight: 'bold', textAlign:'left' }}>Requirements:</td>
                                    <td style={{ textAlign: 'center' }}>{dataRecord.requirement}</td>
                                    </tr>
                                    <tr>
                                    <td style={{  fontWeight: 'bold', textAlign:'left' }}>Number of Items:</td>
                                    <td style={{ textAlign: 'center' }}>{dataRecord.items}</td>
                                    </tr>   
                                    <tr>
                                    <td style={{ fontWeight: 'bold', textAlign:'left' }}>Latest By:</td>
                                    <td style={{ textAlign: 'center' }}>{dataRecord.dateofservice}</td>
                                    </tr>   
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <br/>
                </div>
                )})})}
            </div>
        </div>
        </div>
    );

}

export default Home;