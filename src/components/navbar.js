import React,{useState,useEffect} from 'react';
import axios from 'axios'

function Navbar() {
    // const [user, setUser] = useState('');

    
    const [authorisedUser,setAuthUser] = useState();


    useEffect(async ()=>{
         const newURL = `http://localhost:3012/protected`;
        await axios.get(newURL,{
            headers:{
                token:localStorage.getItem('token')
            }
        }).then(
            (res)=>{setAuthUser(res.data.message)}
        ).catch(err=>{setAuthUser(err.response.data.message)});
    },[])
    
    const handleLogout = async () =>
    {
        localStorage.removeItem('token');
        window.location.reload(true);
    }
    return (
        <div className="header">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">FOOD APP</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mx-auto ">
        <li className="nav-item px-3">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item px-3">
          <a className="nav-link" href="/aboutus">About</a>
        </li>
        <li className="nav-item px-3">
          <a className="nav-link" href="/service">Services</a>
        </li>
        <li className="nav-item px-3">
          <a className="nav-link" href="/register">Registration</a>
        </li>
        {
        authorisedUser===true?
        (<button className="btn btn-danger px-3" onClick={()=>handleLogout()}>Logout</button>):(<button className="btn btn-danger px-3"  onClick={()=>window.location.assign('/login')}>LOGIN</button>)
        }

      </ul>
    </div>
  </div>
</nav>        
        </div>
    )
}

export default Navbar
