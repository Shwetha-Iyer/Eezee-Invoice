import axios from "axios";
import {useEffect,  useState } from "react";
import { Bars } from 'react-loading-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from "react-router-dom"; 
toast.configure();
export default function Activate(props){
    let [page,setPage] = useState(0);
    let history = useHistory();
    useEffect(()=>{
        axios.put(`https://eezee-backend.herokuapp.com/auth/activate/${props.match.params.token}`,{
          headers:{
            'Content-Type': 'application/json'
          },
          withCredentials: true,
          crossDomain: true
        }).then((res) => {
          //console.log(res);
          if(res.status===200){
            toast.success("Account Activated!");
            setPage(1);
            history.push("/login");
          }
        })
        .catch((error) => {
          console.log(error);
          setPage(-1);
        });
    },[props.match.params.token,history]);
    return <>
    {
        page === 0?
        <p className="center"> <Bars stroke="#1adbad" fill="#1adbad" strokeOpacity={1} speed={1} fillOpacity={1} strokeWidth={3} height="10rem"/>
        </p>:(
            page === -1?
            <img className="center responsive" src="../images/page unavailable.jpg" alt="pageunavailable"/>:
            <div> 
                <h1>Account Activated!</h1> 
            </div>
        )
    }
    </>
}