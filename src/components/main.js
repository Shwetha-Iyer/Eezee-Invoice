import { Link } from 'react-router-dom';
import '../App.css';
export default function Main(){
    return <>
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
            <div className="container">
                <span className="nav-brand">EeZee Invoice</span>
                <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <Link to="/login" className="nav-link" href="#"><span className="nav-style"> <button type="button" className="btn btn-mybutton">Login</button></span></Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/signup" className="nav-link" href="#"><span className="nav-style"><button type="button" className="btn btn-mybutton">Create Account</button></span></Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    
        <div className="container padding">
            <div className="row">
                <div className="col-md-6">
                    <h1 className="title">Create Invoices Online.</h1> <br/>
                    <div className="pl-4">
                    <div>
                        <i className="fa fa-check-square" aria-hidden="true"></i>
                        <span> &nbsp;Create Unlimited Invoices</span>
                        </div>
                        <div>
                        <i className="fa fa-check-square" aria-hidden="true"></i>
                        <span> &nbsp;Stay Organised</span>
                        </div>
                        <div>
                        <i className="fa fa-check-square" aria-hidden="true"></i>
                        <span> &nbsp;Fast and Easy</span>
                        </div>
                        <div>
                        <i className="fa fa-check-square" aria-hidden="true"></i>
                        <span> &nbsp;Absolutely Free</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <img src="../images/home.png" height="100%" width="100%" alt="home"/>
                </div>
            </div>
        </div>
    </div>
    </>
}