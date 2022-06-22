import {
  Link
} from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Navbar from "react-bootstrap/esm/Navbar";
import Nav from "react-bootstrap/esm/Nav";

import MyContext from "../Context/Context";
import { useContext } from "react";
import {useLocation, useNavigate} from "react-router-dom";

export default function Navgation(){
  const{accountz, SetAccountz,contract, setContract,User
  } = useContext(MyContext);
  const navigate = useNavigate();

  return (
    <Navbar bg='primary' variant='dark'>
      <Container>
          <Nav className="me-auto">
              <Nav.Link exact="true" as={Link} to="/" ></Nav.Link>
              <Nav.Link style={{color:"#FFFFFF"}} as={Link} to="/" > Connect  </Nav.Link>
              <Nav.Link style={{color:"#FFFFFF"}} as={Link} to="/Tickets" > Tickets  </Nav.Link>
              <Nav.Link style={{color:"#FFFFFF"}} as={Link} to="/Claim" > Claim  </Nav.Link>
              <Nav.Link style={{color:"#FFFFFF"}} as={Link} to="/Winners" > Winners  </Nav.Link>

      </Nav>
      </Container>
    </Navbar>
  )
}
