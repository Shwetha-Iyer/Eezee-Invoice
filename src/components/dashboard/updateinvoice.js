import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Oval } from 'react-loading-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require("axios");
toast.configure();

const SignupSchema = Yup.object().shape({
    invno: Yup.string().required('Required'),
    invdate:Yup.string().required('Required'),
    duedate:Yup.string().required('Required'),
    bcompany:Yup.string().required('Required'),
    ccompany:Yup.string().required('Required'),
    bname:Yup.string().required('Required'),
    cemail:Yup.string().email('Invalid email').required('Required'),
    baddl1:Yup.string().required('Required'),
    caddl1:Yup.string().required('Required'),
    baddl2:Yup.string().required('Required'),
    caddl2:Yup.string().required('Required'),
    bcity:Yup.string().required('Required'),
    ccity:Yup.string().required('Required'),
    bstate:Yup.string().required('Required'),
    cstate:Yup.string().required('Required'),
    bcountry:Yup.string().required('Required'),
    ccountry:Yup.string().required('Required'),
    desc:Yup.string().required('Required'),
    qty:Yup.string().matches(/^[0-9]*[1-9]+$|^[1-9]+[0-9]*$/,'Qty must be a natural number').required('Required'),
    rate:Yup.string().matches(/^[+]?[0-9]*(?:\.[0-9]*)?$/,'Rate cannot be negative').required('Required'),
    taxp:Yup.string().matches(/^[0-9]+$/,'Tax must be an integer').required('Required'),
    notes:Yup.string().required('Required'),
    terms:Yup.string().required('Required'),
    billitems:Yup.array().of(
        Yup.object().shape({
          description: Yup.string().required('Required'),
          quantity: Yup.string().matches(/^[0-9]*[1-9]+$|^[1-9]+[0-9]*$/,'Qty must be a natural number').required('Required'),
          rates:Yup.string().matches(/^[+]?[0-9]*(?:\.[0-9]*)?$/,'Rate cannot be negative').required('Required'),
        })
      )
});
export default function Updateinvoice(props){
    let [click,setClick] = useState(0);
    return <>
    
        <h2 className="color-blue mt-4 text-center"> Update Invoice {props.data.invoice_number}</h2>
        <div>
        <Formik
            initialValues={{
                invno:props.data.invoice_number,invdate:props.data.created_date,duedate:props.data.due_date,bcompany: props.data.biller_details.company_name,ccompany:props.data.client_details.company_name,bname:props.data.biller_details.biller_name,cemail:props.data.client_details.email,baddl1:props.data.biller_details.address_line1,caddl1:props.data.client_details.address_line1,baddl2:props.data.biller_details.address_line2,
                caddl2:props.data.client_details.address_line2,bcity:props.data.biller_details.city, ccity:props.data.client_details.city,bstate:props.data.biller_details.state,cstate:props.data.client_details.state,bcountry:props.data.biller_details.country, ccountry:props.data.client_details.country, notes:props.data.notes, terms:props.data.terms,desc:props.data.bill_details.items[0].description,qty:props.data.bill_details.items[0].quantity,
                rate:props.data.bill_details.items[0].rates,amount:props.data.bill_details.items[0].amount,subtot:props.data.bill_details.sub_total,taxp:props.data.bill_details.tax_percent,taxa:props.data.bill_details.tax_amount,total:props.data.bill_details.total,billitems:props.data.bill_details.items.slice(1,props.data.bill_details.items.length)
            }}
            validationSchema={SignupSchema}
            onSubmit={(values,{resetForm}) => {
                // same shape as initial values
                setClick(1);
                //console.log(values);  
                let allbillitems = [
                    {
                        description:values.desc,
                        quantity:values.qty,
                        rates:values.rate,
                        amount:values.amount
                    },...values.billitems
                ];
                let final_data = {
                    invoice_number:values.invno,
                    created_date:values.invdate,
                    due_date:values.duedate,
                    biller_details:{
                      company_name:values.bcompany,
                      biller_name:values.bname,
                      address_line1:values.baddl1,
                      address_line2:values.baddl2,
                      city:values.bcity,
                      state:values.bstate,
                      country:values.bcountry
                    },
                    client_details:{
                      company_name:values.ccompany,
                      email:values.cemail,
                      address_line1:values.caddl1,
                      address_line2:values.caddl2,
                      city:values.ccity,
                      state:values.cstate,
                      country:values.ccountry
                    },
                    bill_details:{
                      items:[...allbillitems],
                      sub_total:values.subtot,
                      tax_percent:values.taxp,
                      tax_amount:values.taxa,
                      total:values.total
                    },
                    notes:values.notes,
                    terms:values.terms,
                    invoice_id:props.data.invoice_id
                }
                console.log(final_data);
                axios.put(`http://localhost:3100/users/updateinvoice/${props.id}`,{final_data},{
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                    crossDomain: true
                }).then((res)=>{
                    if(res.status===200){
                        console.log("invoice updated");
                        toast.success("Invoice Updated Successfully!");
                        setClick(0);
                        //resetForm();
                        //history.push("/dashboard");
                    }
                }).catch((error)=>{
                    console.log(error);
                });       
            }}
        >
            {({ values,errors, touched }) => (
                <Form>
                    <div className="container">
                        <div className="card padding-card">
                            <div className="row">
                                <div className="col-md-4 pt-2">
                                <Field name="invno" type="text" placeholder="Invoice Number" className="form-control forms-control select mt-4"/>
                                {errors.invno && touched.invno ? <div className="error-msg pl-5">{errors.invno} </div>: null}
                                </div>
                                <div className="col-md-4"></div>
                                <div className="col-md-4 pt-4">
                                    <label htmlFor="invdate">Invoice Date</label>
                                    <Field name="invdate" type="date" className="form-control forms-control select mb-3"/>
                                    {errors.invdate && touched.invdate ? <div className="error-msg">{errors.invdate} </div> : null}
                                    <label htmlFor="duedate">Due Date</label>
                                    <Field name="duedate" type="date" className="form-control forms-control select"/>
                                    {errors.duedate && touched.duedate ? <div className="error-msg">{errors.duedate} </div> : null}
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-6 mt-4">
                                <h3 className="color-blue text-center mb-3">Biller Details</h3>
                                    <Field type="text" className="form-control details my-3" placeholder="Company Name" name="bcompany" id="bcompany"/>
                                    {errors.bcompany && touched.bcompany ? (<div className="error-msg"> {errors.bcompany}</div>) : null}
                                    <Field type="text" className="form-control details my-3" placeholder="Biller Name" name="bname" id="bname"/>
                                    {errors.bname && touched.bname ? (<div className="error-msg"> {errors.bname}</div>) : null}
                                    <Field type="text" className="form-control details my-3" placeholder="Address Line1" name="baddl1" id="baddl1"/>
                                    {errors.baddl1 && touched.baddl1 ? (<div className="error-msg"> {errors.baddl1}</div>) : null}
                                    <Field type="text" className="form-control details my-3" placeholder="Address Line2" name="baddl2" id="baddl2"/>
                                    {errors.baddl2 && touched.baddl2 ? (<div className="error-msg"> {errors.baddl2}</div>) : null}
                                    <Field type="text" className="form-control details my-3" placeholder="City" name="bcity" id="bcity"/>
                                    {errors.bcity && touched.bcity ? (<div className="error-msg"> {errors.bcity}</div>) : null}
                                    <Field type="text" className="form-control details my-3" placeholder="State" name="bstate" id="bstate"/>
                                    {errors.bstate && touched.bstate ? (<div className="error-msg"> {errors.bstate}</div>) : null}
                                    <Field type="text" className="form-control details my-3" placeholder="Country" name="bcountry" id="bcountry"/>
                                    {errors.bcountry && touched.bcountry ? (<div className="error-msg"> {errors.bcountry}</div>) : null}
                                </div>
                                <div className="col-md-6 mt-4">
                                    <h3 className="color-blue text-center mb-3">Client Details</h3>
                                    <Field type="text" className="form-control details my-3" placeholder="Company Name" name="ccompany" id="ccompany"/>
                                    {errors.ccompany && touched.ccompany ? (<div className="error-msg"> {errors.ccompany}</div>) : null}
                                    <Field type="text" className="form-control details my-3" placeholder="Client Email" name="cemail" id="cemail"/>
                                    {errors.cemail && touched.cemail ? (<div className="error-msg"> {errors.cemail}</div>) : null}
                                    <Field type="text" className="form-control details my-3" placeholder="Address Line1" name="caddl1" id="caddl1"/>
                                    {errors.caddl1 && touched.caddl1 ? (<div className="error-msg"> {errors.caddl1}</div>) : null}
                                    <Field type="text" className="form-control details my-3" placeholder="Address Line2" name="caddl2" id="caddl2"/>
                                    {errors.caddl2 && touched.caddl2 ? (<div className="error-msg"> {errors.caddl2}</div>) : null}
                                    <Field type="text" className="form-control details my-3" placeholder="City" name="ccity" id="ccity"/>
                                    {errors.ccity && touched.ccity ? (<div className="error-msg"> {errors.ccity}</div>) : null}
                                    <Field type="text" className="form-control details my-3" placeholder="State" name="cstate" id="cstate"/>
                                    {errors.cstate && touched.cstate ? (<div className="error-msg"> {errors.cstate}</div>) : null}
                                    <Field type="text" className="form-control details my-3" placeholder="Country" name="ccountry" id="ccountry"/>
                                    {errors.ccountry && touched.ccountry ? (<div className="error-msg"> {errors.ccountry}</div>) : null}
                                </div>
                            </div>
                            <h3 className="color-blue py-2">Bill details</h3>
                            <div className="row">
                                <div className="col-md-5">
                                    <h5>Description</h5>
                                    <Field type="text" className="form-control details my-3" placeholder="Item description" name="desc" id="desc"/>
                                    {errors.desc && touched.desc ? (<div className="error-msg"> {errors.desc}</div>) : null}
                                </div>
                                <div className="col-md-2">
                                    <h5> Qty</h5>
                                    <Field type="number" className="form-control details my-3" placeholder="Qty" name="qty" id="qty"/>
                                    {errors.qty && touched.qty ? (<div className="error-msg"> {errors.qty}</div>) : null}
                                </div>
                                <div className="col-md-2">
                                    <h5>Rate</h5>
                                    <Field type="number" className="form-control details my-3" placeholder="Rate" name="rate" id="rate"/>
                                    {errors.rate && touched.rate ? (<div className="error-msg"> {errors.rate}</div>) : null}
                                </div>
                                <div className="col-md-2">
                                    <h5>Amount</h5>
                                    <Field type="number" className="form-control details my-3" placeholder="Amount" name="amount" id="amount" value={values.amount=values.qty*values.rate} readOnly={true}/>
                                </div>
                            </div>
                            {
                                //====================================================================================
                            }
                            <FieldArray name="billitems"
                            render = {
                                arrayHelpers =>{
                                    const billitems = values.billitems;
                                    return (
                                        <div>
                                            {
                                                billitems && billitems.length >0?
                                                billitems.map((items,index)=>(
                                                    <div className="row" key={index}>
                                                        <div className="col-md-5">
                                                        <Field type="text" className="form-control details my-3" placeholder="Item description" name={`billitems.${index}.description`}/>
                                                        <ErrorMessage name={`billitems.${index}.description`} render={ msg => <div className="error-msg">{msg}</div> } />
                                                        </div>
                                                        <div className="col-md-2">
                                                        <Field type="number" className="form-control details my-3" placeholder="Qty" name={`billitems.${index}.quantity`}/>
                                                        <ErrorMessage className="error-msg" name={`billitems.${index}.quantity`} render={ msg => <div className="error-msg">{msg}</div> }/>
                                                        </div>
                                                        <div className="col-md-2">
                                                        <Field type="number" className="form-control details my-3" placeholder="Rate" name={`billitems.${index}.rates`}/>
                                                        <ErrorMessage className="error-msg" name={`billitems.${index}.rates`} render={ msg => <div className="error-msg">{msg}</div> }/>
                                                        </div>
                                                        <div className="col-md-2">
                                                        <Field type="number" className="form-control details my-3" placeholder="Amount" name={`billitems.${index}.amount`} value={values.billitems[index].amount=values.billitems[index].quantity*values.billitems[index].rates} readOnly/>
                                                        </div>
                                                        <div className="col-md-1">
                                                            <button type="button" className="btn btn-danger my-3" onClick={() => arrayHelpers.remove(index)}>X</button>
                                                        </div>
                                                    </div>
                                                )):null
                                            }
                                            <button type="button" className="btn btn-dark my-3" onClick={() => arrayHelpers.push({description: "",quantity:0,rates:0,amount:0})}>
                                                +
                                            </button>
                                        </div>
                                    )
                                }
                            }
                            />





                            {//=======================================================================================
                            }
                            <div className="row pt-4">
                                <div className="col-md-4"></div>
                                <div className="col-md-5">
                                    <span className="align-right right mb-3">Sub Total</span>
                                </div>
                                <div className="col-md-3">  
                                <Field type="number" className="form-control details mb-3" name="subtot" id="subtot" value={values.subtot=values.billitems.length>0?values.billitems.reduce((a,b)=>a+b.amount,values.amount):values.amount} readOnly={true}/>  
                                </div> 
                            </div>
                            <div className="row pt-4">
                                <div className="col-md-4"></div>
                                <div className="col-md-5">
                                    <span className="align-right right mb-3">Tax Percent</span>
                                </div>
                                <div className="col-md-3">
                                    <Field type="number" className="form-control details mb-3" name="taxp" id="taxp"/> 
                                    {errors.taxp && touched.taxp ? (<div className="error-msg"> {errors.taxp}</div>) : null}
                                </div>
                            </div> 
                            <div className="row pt-4">
                                <div className="col-md-4"></div>
                                <div className="col-md-5">
                                    <span className="align-right right mb-3">Tax Amount</span>
                                </div>
                                <div className="col-md-3">
                                <Field type="number" className="form-control details mb-3" value={values.taxa=(values.subtot*values.taxp)/100} readOnly={true}/>
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col-md-4"></div>
                                <div className="col-md-5">
                                    <span className="align-right right mb-3">Grand Total</span>
                                </div>
                                <div className="col-md-3">
                                <Field type="number" className="form-control details mb-3" value={values.total=values.subtot+values.taxa} readOnly={true}/>
                                    </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col-md-6">
                                <Field type="text" className="form-control details my-3" placeholder="Notes" name="notes" id="notes"/>
                                {errors.notes && touched.notes ? (<div className="error-msg"> {errors.notes}</div>) : null}
                                <Field type="text" className="form-control details my-3" placeholder="Terms" name="terms" id="terms"/>
                                {errors.terms && touched.terms ? (<div className="error-msg"> {errors.terms}</div>) : null}
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col-md-4"> </div>
                                <div className="col-md-4 text-center">
                                    <button type="submit" className="btn btn-mybutton mt-4 mt-3 mb-3">{click === 0 ? <span>Submit</span>: <span className="btn-login">Loading... <Oval stroke="#1adbad" fill="#000000" strokeOpacity={1} speed={1} fillOpacity={1} strokeWidth={3} height="1.5rem"/></span>}</button>
                                </div>
                                <div className="col-md-4"> </div>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                     <br/>
                    
                </Form>
            )}
        </Formik>
        </div>
    </>
}