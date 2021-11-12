import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { Oval } from 'react-loading-icons';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useState } from 'react';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const axios = require("axios");
toast.configure();
export default function ViewInvoice(props){
    let [click, setClick] = useState(0);
    var body=[];
    for(var key in props.data.bill_details.items){
        var row = [];
        row.push(props.data.bill_details.items[key].description);
        row.push(props.data.bill_details.items[key].quantity);
        row.push(props.data.bill_details.items[key].rates);
        row.push(props.data.bill_details.items[key].amount);
    	body.push(row);
    }
    const docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        content: [
            {
                text:"Invoice",
                style:"header"
            },
            {
                text:`Invoice ID: ${props.data.invoice_id}`,
                fontSize:14,
                margin:[0,40,0,10]
            },
            {
                text:`Invoice No:  ${props.data.invoice_number}` ,
                fontSize:14
            },
            {
                text:`Created Date: ${props.data.created_date}`,
                fontSize:14,
                margin:[0,25,0,10],
                alignment:"right"
            },
            {
                text:`Due Date: ${props.data.due_date}`,
                fontSize:14,
                margin:[0,0,23,10],
                alignment:"right"
            },
            {
                alignment: 'justify',
                margin:[0,30,0,10],
                fontSize:17,
                columns: [
                    {
                        text: "Biller Details",
                        bold:true
                    },
                    {
                        text: "Client Details",
                        bold: true
                    }
                ]
            },
            {
                fontSize:14,
                columns: [
                    {
                        text: `${props.data.biller_details.company_name}`,
                    },
                    {
                        text: `${props.data.client_details.company_name}`,  
                    }
                ]
            },
            {
                fontSize:14,
                margin:[0,5,0,0],
                columns: [
                    {
                        text: `${props.data.biller_details.biller_name}`,
                    },
                    {
                        text: `${props.data.client_details.email}`
                    }
                ]   
            },
            {
                fontSize:14,
                margin:[0,5,0,0],
                columns: [
                    {
                        text: `${props.data.biller_details.address_line1}`
                    },
                    {
                        text: `${props.data.client_details.address_line1}`
                    }
                ]
            },
            {
                fontSize:14,
                margin:[0,5,0,0],
                columns: [
                    {
                        text: `${props.data.biller_details.address_line2}`
                    },
                    {
                        text: `${props.data.client_details.address_line2}`
                    }
                ]
            },
            {
                fontSize:14,
                margin:[0,5,0,0],
                columns: [
                    {
                        text: `${props.data.biller_details.city}`
                    },
                    {
                        text: `${props.data.client_details.city}`
                    }
                ]
            },
            {
                fontSize:14,
                margin:[0,5,0,0],
                columns: [
                    {
                        text: `${props.data.biller_details.state}`
                    },
                    {
                        text: `${props.data.client_details.state}`
                    }
                ]
            },
            {
                fontSize:14,
                margin:[0,5,0,0],
                columns: [
                    {
                        text: `${props.data.biller_details.country}`
                    },
                    {
                        text: `${props.data.client_details.country}`
                    }
                ],
            },
            {
                text:"Bill Details",
                bold:true,
                margin:[0,25,0,0],
                fontSize:17
            },
            {
                margin:[0,10,0,0],
                fontSize:14,
                table: {
                        widths: [300, '*', '*', '*'],
                        alignment:'center',
                        headerRows: 1,
                        body: [[{text: 'Item Description'}, {text:'Qty'},{text: 'Rate'},{text:"Amount"}],...body]   
                },
                layout: 'lightHorizontalLines'
            },
            {
                text:`Sub total:          ${props.data.bill_details.sub_total}`,
                margin:[0,30,35,0],
                alignment:"right",
                fontSize:14
            },
            {
                text:`Tax (${props.data.bill_details.tax_percent}%):          ${props.data.bill_details.tax_amount}`,
                margin:[0,10,35,0],
                alignment:"right",
                fontSize:14
            },
            {
                text:`Total:          ${props.data.bill_details.total}`,
                bold:true,
                margin:[0,10,35,0],
                alignment:"right",
                fontSize:14
            },
            {
                text:`Notes : ${props.data.notes}`,
                fontSize:14,
                margin:[0,25,0,0]
            },
            {
                text:`Terms: ${props.data.terms}`,
                fontSize:14,
                margin:[0,25,0,0]
            }
        ],
        styles:{
            header: {
                fontSize: 35,
                bold: true,
                alignment: "center"
            }
        }
    }
    let downloadInvoice = ()=>{
        pdfMake.createPdf(docDefinition).download(`Invoice(${props.data.invoice_id}).pdf`);
    }
    let deleteinvoice = ()=>{
        axios.put(`https://eezee-backend.herokuapp.com/users/deleteinvoice/${props.id}`,{invoice_id:props.data.invoice_id},{
        headers:{
          'Content-Type': 'application/json'
        },
        withCredentials: true,
        crossDomain: true
      }).then((res) => {
        //console.log(res);
        if(res.status===200){
          //console.log("invoice deleted");
          toast.success("Invoice Deleted Successfully!");
          setClick(0);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Couldn't delete invoice");
      });
    }
    return <>
    <h1 className="text-center color-blue mt-5"> Invoice {/*props.id*/}</h1>
    <div className="container">
        <div className="row my-3">
            <div className="col-md-12">
            <button className="btn btn-mybuttondelete my-2" type="button" onClick={()=>{setClick(1);deleteinvoice();}}>{click===0?<span className="btn-login">Delete this Invoice</span>:<span className="btn-login">Loading... <Oval stroke="#1adbad" fill="#000000" strokeOpacity={1} speed={1} fillOpacity={1} strokeWidth={3} height="1.5rem"/></span>} </button>
            <button className="btn btn-mybutton align-right" type="button" onClick={e=> downloadInvoice()}>Download as PDF</button>
            </div>
        
        </div>
    
        <div className="card padding-card">
            <div className="row">
                <div className="col-md-4">
                    <p className="my-2">
                    <b>Invoice ID :</b> {props.data.invoice_id}
                    </p>
                    <p className="my-2">
                    <b>Invoice Number:</b> {props.data.invoice_number}
                    </p>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <p className="my-2">
                    <b>Invoice Date:</b> {props.data.created_date}
                    </p>
                    <p className="my-2">
                    <b>Due Date:</b> {props.data.due_date}
                    </p>
                </div>
            </div>
            <div className="row my-5">
                <div className="col-md-6">
                    <h3 className="text-center">Biller Details</h3>
                    <p className="padding-left pt-3">
                        {props.data.biller_details.company_name} <br/>
                        {props.data.biller_details.biller_name} <br/>
                        {props.data.biller_details.address_line1} <br/>
                        {props.data.biller_details.address_line2} <br/>
                        {props.data.biller_details.city} <br/>
                        {props.data.biller_details.state} <br/>
                        {props.data.biller_details.country} <br/>
                    </p>
                </div>
                <div className="col-md-6">
                    <h3 className="text-center">Client Details</h3>
                    <p className="padding-left pt-3">
                        {props.data.client_details.company_name} <br/>
                        {props.data.client_details.email} <br/>
                        {props.data.client_details.address_line1} <br/>
                        {props.data.client_details.address_line2} <br/>
                        {props.data.client_details.city} <br/>
                        {props.data.client_details.state} <br/>
                        {props.data.client_details.country} <br/>
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="mb-4">Bill Details</h3>
                    <div className="table-responsive">
                    <table className="table">
                        <thead className="color-blue">
                            <tr>
                                <th>Description</th>
                                <th>Qty</th>
                                <th>Rate</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.data.bill_details.items.map((item,index)=>{
                                    return <tr key={index}>
                                        <td>{item.description}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.rates}</td>
                                        <td>{item.amount}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                </div>
                <div className="col-md-4">
                    <p className="my-3">
                        <b>Sub-Total :</b> &nbsp; {props.data.bill_details.sub_total}
                    </p>
                    <p className="my-3">
                        <b>Tax (%) :</b> &nbsp; {props.data.bill_details.tax_percent}
                    </p>
                    <p className="my-3">
                        <b>Tax amount :</b> &nbsp; {props.data.bill_details.tax_amount}
                    </p>
                    <p className="my-3">
                        <b>Grand Total :</b> &nbsp; {props.data.bill_details.total}
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <p className="my-3">
                        <b>Notes : </b> &nbsp; {props.data.notes}
                    </p>
                    <p className="my-3">
                        <b>Terms : </b> &nbsp; {props.data.terms}
                    </p>
                </div>
            </div>
        </div>
    </div>
    </>
}