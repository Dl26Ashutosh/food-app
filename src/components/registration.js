import React,{useState,useEffect} from 'react';
import axios from 'axios';

function Registration() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [password,setPassword] = useState('');
    const [gender,setGender] = useState('Male');


    const handleName = (e) =>
    {
        setName(e.target.value);
    }
    const handleEmail = (e) =>
    {
        setEmail(e.target.value);
    } 
    const handlePassword = (e) =>
    {
        setPassword(e.target.value);
    }
    const handlePhoneNumber = (e) =>
    {
        setPhoneNumber(e.target.value);
    }
    const handleGender = (e) =>
    {
        setGender(e.target.value);
    }

    const handleSubmit = async (e) =>
    {
            e.preventDefault();
            const URL = 'http://localhost:3012/register';
            const body = {
                name:name,
                email:email,
                password:password,
                phoneNumber:phoneNumber,
                gender:gender
            }
            await axios.post(URL,body).then(
                res=>alert(res.data)
            )
            .catch(err=>console.log(err))
            setName('');
            setEmail('');
            setPhoneNumber('');
            setPassword('');
            setGender('');
    }


    return (
        <div className="registration d-flex justify-content-center align-items-center">

            <div className="col-lg-3 col-md-5 col-6 mt-5" >
            <div className="row tex-center m-2"><input type="text" placeholder="Enter Name" value={name} onChange={(e)=>handleName(e)}/></div>
            <div className="row tex-center m-2"><input type="text" placeholder="Enter Email"   value={email} onChange={(e)=>handleEmail(e)}/></div>
            <div className="row tex-center m-2"><input type="text" placeholder="Enter Phone Number" value={phoneNumber} onChange={(e)=>handlePhoneNumber(e)}/></div>
            <div className="row tex-center m-2"><input type="password" placeholder="Enter Password" value={password} onChange={(e)=>handlePassword(e)}/></div>
            <div className="row tex-center m-2">
                <select className="h-100" placeholder="Select Gender" value={gender} onChange={(e)=>handleGender(e)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="row tex-center m-2"><button className="btn btn-danger" onClick={(e)=>handleSubmit(e)}>Register</button></div>
            </div>
        </div>
    )
}
export default Registration