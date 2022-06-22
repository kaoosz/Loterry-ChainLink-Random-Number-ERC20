import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import styles from "./Conect.module.css";


import MyContext from '../../Context/Context';
import {useLocation, useNavigate} from "react-router-dom";

export default function Conect(){
    const{accountz, SetAccountz,contract, setContract
    } = useContext(MyContext);

    const navigate = useNavigate();
    const location = useLocation();

    async function Connection(){
        console.log(accountz);
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        SetAccountz(accounts[0]);
        document.getElementById("wallet-address").textContent = accounts[0];
    }
    
    return (
        <div className='App' >
          <div className={styles.mainImg} >
          <div className='conteiner'></div>
          <div className="row"></div>
            <form className='gradient col-lg-5 mt-5' style={{borderRadius:"25px",boxShadow:"1px 1px 4px #000000"}}>
              <h4 style={{color:"#FFFFFF"}}>Wallet </h4>
              <h5 style={{color:"#FFFFFF"}}>Please Conect</h5>
              <Button onClick={Connection} style={{marginBottom:"5px"}}>Connect Wallet</Button>
              <div className='card' id='wallet-address' style={{marginLeft:"17px",marginRight:"17px", marginTop:"3px", boxShadow:"1px 1px 4px #000000"}}>
                <label htmlFor="floatingInput">Wallet Address </label>
                </div>
                <div className="card" id="wallet-address" style={{marginLeft:"17px",marginRight:"17px",boxShadow:"1px 1px 4px #000000"}}>
                </div>
              <label style={{color:"#FFFFFF"}}> </label>
            </form> 
        </div>
        </div>     
    )
}