import { useEffect, useState } from "react";
import { Bars } from 'react-loading-icons';
import ViewInvoice from "./viewinvoice";
import {useContext} from "react";
import UserContext from "../usercontext";
import Updateinvoice from "./updateinvoice";
const axios = require("axios");
export default function Showinvoice(props){
    let data = useContext(UserContext);
    
    console.log("Inside show invoice",data);
    let [page,setPage] = useState(0);
    let [invoice,setInvoice] = useState([]);
    let [viewitem,setViewitem] = useState({});
    // (()=>{
    //   console.log("inside iifee");
    //   axios.get(`http://localhost:3100/users/getinvoice/${data.userid}`,{
    //     headers:{
    //       'Content-Type': 'application/json'
    //     },
    //     withCredentials: true,
    //     crossDomain: true
    //   }).then((res) => {
    //     console.log(res);
    //     if(res.status===200){
    //       console.log("got result");
    //       setInvoice(res.data);
    //       setPage(1);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setPage(-1);
    //   });
    // })();

    useEffect(()=>{
      axios.get(`http://localhost:3100/users/getinvoice/${data.userid}`,{
        headers:{
          'Content-Type': 'application/json'
        },
        withCredentials: true,
        crossDomain: true
      }).then((res) => {
        console.log(res);
        if(res.status===200){
          console.log("got result");
          setInvoice(res.data);
          setPage(1);
        }
      })
      .catch((error) => {
        console.log(error);
        setPage(-1);
      });
    },[data.userid]);
    return <>
    {
        page === 0 ?
        <p className="h-center"> <Bars stroke="#1adbad" fill="#1adbad" strokeOpacity={1} speed={1} fillOpacity={1} strokeWidth={3} height="10rem"/> </p>:
        (
            page === 1?
            <>
              {
                invoice.length === 0?
                <div>
                  <h3 className="text-center color-blue px-2 py-5">Nothing much to show here! Create a new Invoice</h3>
                </div>:
                <>
                <h1 className="text-center color-blue px-2 py-4">Your Invoice</h1>
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead className="thead-blue text-center">
                          <tr>
                            <th>#</th>
                            <th>Invoice ID</th>
                            <th>Invoice No</th>
                            <th>Client Email</th>
                            <th>Total Amount</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {
                            invoice.map((item,index)=>{
                              return <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.invoice_id}</td>
                                <td>{item.invoice_number}</td>
                                <td>{item.client_details.email}</td>
                                <td>{item.bill_details.total}</td>
                                <td>
                                  
                                  <button type="button" className="btn" onClick={()=>{setPage(2);setViewitem(item)}}><i className="fa fa-eye" aria-hidden="true"></i></button>
                                
                                  
                                  <button type="button" className="btn" onClick={()=>{setPage(3);setViewitem(item)}}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                                </td>
                              </tr>
                            })
                          }
                        </tbody>
                      </table>
                      </div>
                    </div>
                  </div>
                </div>
                </>
              }
            </>:(
              page===2?
               <ViewInvoice data={viewitem} id={data.userid}/>
              
              :(page===3?
                <Updateinvoice data={viewitem} id={data.userid}/>
                :<h1 className="color-blue text-center"> Oops Something went wrong! Cant load your invoice.</h1>
                )
              
            )
                
            
            
        )
    }
    </>

}