import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Oval } from 'react-loading-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
const axios = require("axios");
const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
});
export default function Forgot(){
    let [click,setClick] = useState(0);
    return <>
    <h1 className="color-blue text-center pt-4"> Forgot Password</h1>
    <div className="container pt-2">
        <div className="row pt-2 text-center">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <div className="card">
                    <img src ="../images/forgot.jpg" height="40%" width="40%" alt="login" className="img"/>
                    <Formik
                    initialValues={{
                        email: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values,{resetForm}) => {
                        // same shape as initial values
                        setClick(1);
                        console.log(values);
                        axios.put("http://localhost:3100/auth/forgot",{email:values.email},{
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            withCredentials: true,
                            crossDomain: true
                        }).then((res) => {
                            console.log(res);
                            if(res.status===200){
                                toast.success("Password reset link has been sent to your email!");
                                setClick(0);
                                resetForm();
                            }
                        }).catch((error) => {
                            console.log(error);
                            if(error.response.status===404)
                                toast.warning("This email is not registered!");
                            else
                                toast.error("Internal server error");
                            setClick(0);
                            resetForm();
                        });
                    }}
                >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="email" type="email" placeholder="Email" className="form-control mt-4"/>
                        {errors.email && touched.email ? <div>{errors.email} </div>: null}
                        <button type="submit" className="btn btn-mybutton mt-4 mt-3 mb-3">{click === 0 ? <span className="btn-login">Submit</span>: <span className="btn-login">Loading... <Oval stroke="#1adbad" fill="#000000" strokeOpacity={1} speed={1} fillOpacity={1} strokeWidth={3} height="1.5rem"/></span>}</button>
                    </Form>
                )}
                </Formik>
                </div>
            </div>
            <div className="col-md-3"></div>
            
        </div>
    </div>
    </>
}