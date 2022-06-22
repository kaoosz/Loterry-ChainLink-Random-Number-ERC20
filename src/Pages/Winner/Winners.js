
import MyContext from "../../Context/Context";
import { useContext, useEffect } from 'react';
import axios from "axios";
import styles from "./Winner.module.css";

const {REACT_APP_MY_API_ETHERSCAN} = process.env;

export default function Winners(){

    const{accountz, SetAccountz,contract, setContract,etherscan2,setEtherscan2}
     = useContext(MyContext);

    useEffect(() =>{
        async function Inf(){
          const infos = await axios.get(`https://api-kovan.etherscan.io/api?module=account&action=tokentx&contractaddress=0x3Ac0A3632e783D19Ab2fcC47532d1C2925A7aC01&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.REACT_APP_MY_API_ETHERSCAN}`)
          setEtherscan2(infos.data.result);

        }
        Inf();
    }, [])

  return(
    <div className="App">
      <div className={styles.Img}>
      <div className="container">
        <div className="row">
          <div className='row items mt-3' >
          <div className='ml-3 mr-3' style={{display: "inline-grid",gridTemplateColumns: "repeat(4, 5fr)",columnGap: "10px"}}>
          {etherscan2.map((assets, index) => {
                if(assets.from != "0x0000000000000000000000000000000000000000"){ 
                  return(
                    <div className='card' key={index}>
                      <div className='image-over'>
                        <img className='card-img-top' src="https://ipfs.io/ipfs/QmejpFeLc2pgk7Ki1CQrsu7YcxecFcJHJJZEeYucs45JJb?filename=0.png" alt=""/>
                        <div className='card-caption col-12 p-0'>
                          <div className='card-body'>
                            <h5 className='mb-0'> Reward: {index} </h5>
                            <h5>Owner: <p style={{color: "#000000",fontWeight:"unset",textShadow: "1px 1px 2px #000000"}}></p>{assets.to}</h5>
                            <div className="card-bottom d-flex justify-content-between">
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
    </div>
  )
}