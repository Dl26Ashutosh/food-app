import axios from 'axios';
import React,{useState,useEffect}from 'react';
function Restaurant() {

    // restaurant and food flag states
    const [restaurant,setRestaurant] = useState([]);
    const [foodFlag,setFoodFlag] = useState(false);
    const [foodList,setFoodList] = useState([]);


    // checkout states
    const [foodName,setFoodName] = useState('');
    const [desc,setDesc] = useState('');
    const [price,setPrice] = useState('');
    const [checkoutFlag,setCheckoutFlag] = useState(false);
    const [authorisedUser,setAuthUser] = useState();


    useEffect(async ()=>{
        const URL = "http://localhost:3012/Restaurant/find";
        axios.get(URL).then
        (
            res=>
            {
                setRestaurant(res.data);
            }
        ).catch(err=>{console.log(err.response.data.message)})


        const newURL = `http://localhost:3012/protected`;
        await axios.get(newURL,{
            headers:{
                token:localStorage.getItem('token')
            }
        }).then(
            (res)=>{setAuthUser(res.data.message)}
        )
        .catch(err=>{console.log(err.response.data.message)})
        
    },[])


    const handleAdd = async (e,id) =>{
        console.log('id',id)
        const URL = `http://localhost:3012/Restaurant/find/FoodLists/${id}`;
        await axios.get(URL).then(
            (res)=>{setFoodList(res.data);setFoodFlag(true)}
        )
    }

    const handleCheckout = (e,foodName,description,price) =>
    {
        setFoodName(foodName);
        setDesc(description);
        setPrice(price);
        setCheckoutFlag(true);
    }

    return (
        <>
        {authorisedUser === true?
        <div className="row justify-content-center mt-5">   
         <div className="col-lg-8 border border-danger m-3" style={{boxShadow:"10px 10px 10px #dc3545"}}>
        <div className="d-flex flex-row flex-wrap justify-content-center">

            {foodFlag===false?restaurant.map((items)=>
            <>
            <div className="col-lg-3 m-3" style={{height:"180px",width:"180px",backgroundColor:"gray",fontSize:"20px",border:"1px black solid",borderRadius:"10px",boxShadow:"2px 5px 5px #dc3545"}}>
                {items.res_name}
                <div style={{fontSize:"15px"}}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</div>
                <button className="btn btn-danger p-auto m-1" onClick={(e)=>handleAdd(e,items._id)}>Select</button>
            </div>
       </>):foodList.map((items)=>
            <>
            <div className="col-lg-3 m-3" style={{height:"180px",width:"180px",backgroundColor:"gray",fontSize:"20px",border:"1px black solid",borderRadius:"10px",boxShadow:"2px 5px 5px #dc3545"}}>
                {items.food_name}
                <div style={{fontSize:"15px"}}>{items.description}</div>
                <label style={{color:"white"}}>Price</label><div style={{fontWeight:"bold",fontSize:"12px"}}>₹{items.price}</div>
                <button className="btn btn-danger p-auto m-1" onClick={(e)=>handleCheckout(e,items.food_name,items.description,items.price)}>ADD+</button>
            </div>
       </>)}
        </div>
        </div>
        <div className="col-lg-3" style={{backgroundColor:"gray",border:"1px black solid",borderRadius:"10px",boxShadow:"2px 5px 5px gray"}}>
            <div><h3><b>Checkout Page</b></h3></div>
            {
                checkoutFlag === true ?(
                    <>
                    <div className="row justify-content-center" style={{fontWeight:"bold",color:"maroon"}} ><label style={{color:"black",fontSize:"20px",fontWeight:"bold"}}>Food Name</label>{foodName}</div>
                    <div className="row justify-content-center" style={{fontWeight:"bold",color:"maroon"}}><label style={{color:"black",fontSize:"20px",fontWeight:"bold"}}>Food Description</label>{desc}</div>
                    <div className="row justify-content-center" style={{fontWeight:"bold",color:"maroon"}}><label style={{color:"black",fontSize:"20px",fontWeight:"bold"}}>Food Price</label>₹{price}</div>
                    <div className="row justify-content-center" style={{fontWeight:"bold",color:"maroon"}} ><button style={{color:"white",fontSize:"20px",fontWeight:"bold"}}className="btn btn-success w-50">Checkout</button></div>
                    <div className="row justify-content-center" style={{fontWeight:"bold",color:"maroon"}} ><button style={{color:"white",fontSize:"20px",fontWeight:"bold"}}className="btn btn-danger w-50 m-2"  onClick={()=>setCheckoutFlag(false)}>Remove</button></div>
                    <div className="row justify-content-center" style={{fontWeight:"bold",color:"maroon"}} ><button style={{color:"white",fontSize:"20px",fontWeight:"bold"}}className="btn btn-danger w-50 m-2"  onClick={()=>setFoodFlag(false)}>Restaurant</button></div>


                    </>
                )
                :<div style={{fontSize:"30px",color:"white"}}>NO ITEM IS SELECTED</div> }
        </div>
        </div> : <div style={{fontSize:"50px",fontWeight:"bold",color:"#dc3545",marginTop:"20%"}}>
            UNAUTHORISED ACCESS
        </div>}

        </>
    )
}

export default Restaurant;
