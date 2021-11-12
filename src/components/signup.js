import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import { Oval } from 'react-loading-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useEffect } from 'react';
const axios = require("axios");
toast.configure();
const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(1, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
    .required('Required') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .max(15, 'Max 15 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, 'Password must contain atleast 1 uppercase, lowercase and number.'),
  });
export default function Login(){
    let [click,setClick] = useState(0);
    let history = useHistory();
    useEffect(()=>{
        axios.get("https://eezee-backend.herokuapp.com/auth/authchecker",{
          headers:{
            'Content-Type': 'application/json'
          },
          withCredentials: true,
          crossDomain: true
        }).then((res) => {
          //console.log(res);
          if(res.status===200){
            console.log("Logged in");
            history.push(`/dashboard`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },[history]);
    return <>
    <h1 className="color-blue text-center pt-4"> Sign Up</h1>
    <div className="container pt-2">
        <div className="row pt-2 text-center">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <div className="card mb-4">
                    <img src ="../images/signup.png" height="100%" width="40%" alt="login" className="img pt-4"/>
                    <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password:'',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values,{resetForm}) => {
                        // same shape as initial values
                        setClick(1);
                        //console.log(values);
                        axios.post("https://eezee-backend.herokuapp.com/auth/register",{
                            firstname:values.firstName,
                            lastname:values.lastName,
                            email:values.email,
                            password:values.password
                        },{
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            withCredentials: true,
                            crossDomain: true
                        })
                        .then((res) => {
                            if(res.status===200){
                                console.log("registration success");
                                setClick(0);
                                toast.success('SignUp successful. Account activation link sent!');
                                resetForm();
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            if(error.response.status===400)
                                toast.warning("User already exists");
                            else
                                toast.error("Internal Server Error!")
                            resetForm();
                            setClick(0);
                        });
                    }}
                >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="firstName" placeholder="First Name" className="form-control mt-4"/>
                        {errors.firstName && touched.firstName ? (<div>{errors.firstName}</div>) : null}
                        <Field name="lastName" placeholder="Last Name" className="form-control mt-4"/>
                        {errors.lastName && touched.lastName ? (<div>{errors.lastName}</div>) : null}
                        <Field name="email" type="email" placeholder="Email" className="form-control mt-4"/>
                        {errors.email && touched.email ? <div>{errors.email} </div>: null}
                        <Field name="password" type="password" placeholder="Password" className="form-control mt-4"/>
                        {errors.password && touched.password ? <div>{errors.password} </div> : null} <br/>
                        <Link to="/login" className="text-muted mt-3">Already a member?</Link> <br/>
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