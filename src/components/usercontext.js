import React from "react";
import {useState} from "react";
let UserContext = React.createContext();
export default UserContext;

export const UserProvider = ({children}) =>{
    let [userid,setUserid] = useState("");
    return <UserContext.Provider value={{userid,setUserid}}>
        {children}
    </UserContext.Provider>
}