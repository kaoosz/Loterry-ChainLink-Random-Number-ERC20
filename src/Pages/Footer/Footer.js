import styles from "./Footer.module.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer(){

    return(
        <footer>
            <ul className={styles.social_list}>
                <li>
                    <a rel="noopener noreferrer" href="https://www.linkedin.com/in/guilherme-alves-5252b7219/" target="_blank"> <FaLinkedin /> </a>
                </li>
                <li>
                    <a rel="noopener noreferrer" href="https://github.com/kaoosz" target="_blank"> <FaGithub /> </a>
                </li>
            </ul>
        </footer>
    )

}

export default Footer;