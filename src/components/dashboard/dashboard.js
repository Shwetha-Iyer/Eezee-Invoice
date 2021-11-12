import {useHistory} from "react-router-dom";
import { useEffect, useState } from 'react';
import { Bars } from 'react-loading-icons';
import {useContext} from "react";
import UserContext from "../usercontext"; 
import Showinvoice from "./showinvoice";
import Createinvoice from "./createinvoice";
const val = {
  in:1
}
const axios = require("axios");
export default function Dashboard(){
  console.log("Dashboard function called!!!")
    let data = useContext(UserContext);
    let history = useHistory();
    let [page,setPage] = useState(0);
    let [name,setName] = useState("");
    let [display,setDisplay] = useState(0);
    let handlelogout = ()=>{
        axios.delete("https://eezee-backend.herokuapp.com/auth/logout",{
            headers:{
              'Content-Type': 'application/json'
            },
            withCredentials: true,
            crossDomain: true
          }).then((res) => {
            //console.log(res);
            if(res.status===200){
              console.log("Logged out");
              history.push(`/login`);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    useEffect(()=>{
        axios.get("http://localhost:3100/auth/authchecker",{
          headers:{
            'Content-Type': 'application/json'
          },
          withCredentials: true,
          crossDomain: true
        }).then((res) => {
          //console.log(res);
          if(res.status===200){
            console.log("Logged in");
            data.setUserid(res.data.sessUser.id);
            setName(res.data.sessUser.firstname);
            setPage(1);
            setDisplay(1);
          }
        })
        .catch((error) => {
          console.log(error);
          history.push("/login");
        });
    },[history,data]);
    return <>
    {
        page === 0 ?
        <p className="center"> <Bars stroke="#1adbad" fill="#1adbad" strokeOpacity={1} speed={1} fillOpacity={1} strokeWidth={3} height="50rem"/></p>:
        (
            <>
            
              <div className="container-fluid">
              <div className="row">
                  <div className="col-12">
                    <span className="heading color-blue bold pt-3">Welcome {name}!</span> 
                    <span><button type="button" onClick={handlelogout} className="float-right btn bold btn-mysuccess mr-4 mt-4 mb-3">Logout </button></span>
                  </div>
              </div>
              <hr/>
              <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-white flex-parent jc-center">
                  <button type="button" className="btn btn-lavender my-2 mx-2" onClick={()=>{setDisplay(-1);console.log("set -1");window.location.reload(false)}}>All Invoice</button>
                  <button type="button" className="btn btn-lavender my-2 mx-2" onClick={()=>setDisplay(2)}>Create Invoice</button>
                </nav>
              </div>
              <div>
                {
                  console.log("display value",display)
                }
              {
                display === 1?
                <Showinvoice dis={val}/>:(
                  display === 2? 
                  <Createinvoice/>:(
                    display === -1?
                    <Showinvoice dis={val}/>:null
                  )
                )
              }
              </div>
              </div>
            </>
        )
    }
    </>
}