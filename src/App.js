import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';
import React, {useState,useEffect} from 'react';
import axios from "axios";
import {ethers } from "ethers"
import{BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Navbar from "./Navegation/NavBar";

import Footer from "./Pages/Footer/Footer";
import Winners from "./Pages/Winner/Winners";
import Claime from "./Pages/Claim/Claim";
import Conect from "./Pages/Conect/Conect";
import Tickets from "./Pages/Tickets/Tickets";
import MyContext from "./Context/Context";
import useLocalStorage from "./Hooks/HookStorage";

import ticketabi from "./Abis/Tickets.json";
import ticketaddress from "./Abis/TicketsAddress.json";
import tokenabi from "./Abis/MyToken.json";
import tokenaddress from "./Abis/MyTokenAddress.json";


const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner();

function App() {

  const[accountz, SetAccountz] = useLocalStorage("");
  const[contract, setContract] = useState(null);
  const[token, setToken] = useState({});
  const[etherscan,setEtherscan] = useState([]);
  const[etherscan2,setEtherscan2] = useState([]);
  const[tokenid,setTokenid] = useState(null);


  useEffect(() => {
    const contract = new ethers.Contract(ticketaddress.address,ticketabi.abi,signer);
    const token = new ethers.Contract(tokenaddress.address,tokenabi.abi,signer);
    setContract(contract);
    setToken(token);
  },[])

  useEffect(() => {
    window.ethereum.on('accountsChanged', async function (accounts) {
      SetAccountz(accounts[0]);
    })
  },[accountz]);

  return(
    <Router>
      <MyContext.Provider value={{accountz, SetAccountz,contract, setContract,etherscan,setEtherscan,
      token, setToken,etherscan2,setEtherscan2,tokenid,setTokenid}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Conect />} />
          <Route path="/Claim" element={<Claime />} />
          <Route path="/Tickets" element={<Tickets />} />
          <Route path="/Winners" element={<Winners />} />
        </Routes>
      </MyContext.Provider>
      <Footer />
    </Router>
  )
}

export default App;
