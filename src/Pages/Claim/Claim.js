
import { useContext, useEffect, useState } from "react";
import MyContext from "../../Context/Context";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import styles from "./Claim.module.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {useNavigate} from "react-router-dom";



import { ethers } from "ethers";

export default function Claime(){
    const{accountz, SetAccountz,contract, setContract,
    token, setToken} = useContext(MyContext);
    const[winner, setWinner] = useState("");
    const navigate = useNavigate();
    

    useEffect(() => {
        accountz === undefined && navigate("/");
    },[])

    async function Claime(){
        const reward = await contract.Claim();
        console.log(reward);
    }

    useEffect(() => {
        async function Caller(){
            contract != null &&
            contract.winner().then((result) => {setWinner(result)})
        }
        Caller();
    },[contract]);

    //style={{color: "#346724",fontWeight:"unset",textShadow: "1px 1px 2px #000000"}}
 return(
    <div className={styles.Img}>
    {accountz ?
        <Card style={{ width: '16rem'}}>
            <Card.Img  variant="top" src="https://ipfs.io/ipfs/QmfXGFKeP11mJVtAs9FxsW36WDX7Tz16v1QwFLjww7nJxY/0.png" />
            <Card.Body className={styles.stylez}>
                <Card.Title>Winner Token</Card.Title>
                <h5>Owner: <p></p>{winner}</h5>
                <Button onClick={Claime} variant="primary">Claim</Button>
            </Card.Body>
        </Card>
    : <div>
    </div>
    }
    </div>

 );
    
}
