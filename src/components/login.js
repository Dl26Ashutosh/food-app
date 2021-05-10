import React,{useState} from 'react';
import axios from 'axios';

function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const handleEmail = (e) =>
    {
        setEmail(e.target.value);
    } 
    const handlePassword = (e) =>
    {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) =>
    {
            e.preventDefault();
            const URL = "http://localhost:3012/login";
            const body = {
                email:email,
                password:password
            }
            await axios.post(URL,body).then(
                res=>
                 {
                    localStorage.setItem('token',res.data.token);
                        alert(res.data.message);
                        window.location.assign('/Restaurant/find');
                }
                ).catch(err=>alert(err.response.data.message))
            setEmail('');
            setPassword('');
    }


    return (
        <div className="registration d-flex justify-content-center align-items-center">
            <div className="col-lg-3 col-md-5 col-6 mt-5" >
                <div className="row tex-center m-2"><input type="text" placeholder="Enter Email"   value={email} onChange={(e)=>handleEmail(e)}/></div>
                <div className="row tex-center m-2"><input type="password" placeholder="Enter Password" value={password} onChange={(e)=>handlePassword(e)}/></div>
                <div className="row tex-center m-2"><button className="btn btn-danger" onClick={(e)=>handleSubmit(e)}>LOGIN</button></div>
            </div>
        </div>
    )
}
export default Login