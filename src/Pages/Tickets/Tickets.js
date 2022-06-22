import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from "react-bootstrap/Button";

import MyContext from '../../Context/Context';
import React, {useState,useEffect,useContext} from 'react';
import axios from "axios";
import {ethers } from "ethers"
import {useNavigate} from "react-router-dom";
import IMG from "../../Image/0.png";

const {REACT_APP_MY_API_ETHERSCAN} = process.env;



export default function Tickets() {

  const{accountz, SetAccountz,contract, setContract,etherscan,setEtherscan
  ,tokenid,setTokenid} = useContext(MyContext);

  const navigate = useNavigate();
  var guarda = [];
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner();
  const [ticketed,setTicketed] = useState([]);

  useEffect(() => {
    accountz === undefined && navigate("/");
  })

  useEffect(() =>{
    async function dados(){
      const infos = await axios.get(`https://api-kovan.etherscan.io/api?module=account&action=txlist&address=0x06b3281E852e7EC200E47C5Bb64f1C0d1e71A53A&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.REACT_APP_MY_API_ETHERSCAN}`)
      setEtherscan(infos.data.result);
    }
    dados();
  }, [])

  useEffect(() => {
    async function Waiting(){
      await contract != null &&
        contract.on("LotteryItemCreated",(ownerticket,ticketId) => {
          window.location.reload();
        })
    }
    Waiting();
  },[])


  useEffect(() => {
      async function chama(){
          if(contract != null){
            for (let index = 0; index <= 10; index++) {
              var x = await contract.idLotteryItem(index);
              guarda.push(x);
            }
            setTicketed(guarda);
          }
      }
      chama();

  },[contract])
  
  async function BuyTicket(index){
    const buy = await contract.BuyTicketNumber(index);
    console.log(buy);
  }

  return(
    <div className='App'>
      <div className='container'>
        <div className='row'>
          <div className='row items mt-3' >
          <div className='ml-3 mr-3' style={{display: "inline-grid",gridTemplateColumns: "repeat(4, 5fr)",columnGap: "10px"}}>
          {ticketed.map((assets, index) => {
                if(assets.ownerticket === "0x0000000000000000000000000000000000000000"){ 
                  return(
                    <div className='card' key={index}>
                      <div className='image-over'>
                        <img className='card-img-top' src={IMG} alt=""/>
                        <div className='card-caption col-12 p-0'>
                          <div className='card-body'>
                            <h5 className='mb-0'> Token ID: {index} </h5>
                            <div className="card-bottom d-flex justify-content-between">
                            <Button onClick={() => BuyTicket(index)} className="btn btn-bordered-white btn-smaller mt-3">
                              <i className="mr-2" /> Buy
                            </Button>
                            </div>
                          </div>
                        </div>
                      </div>                   
                    </div>
                  )
                }
              }
              )
              }
          </div>
          </div>
        </div>
      </div>
    </div>
  )

}





