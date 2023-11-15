import styles from "../components/css/NavStyle.module.css"
import { Link } from "react-router-dom";
const Nav = () => {
    return(
        <div>
            <nav>
                <Link className={styles.siteTitle} to ={"/dashboard"}>Share That Game</Link>
                <ul>
                    <li>
                        <Link className={styles.navLink}to={"/dashboard"}>Button</Link>
                    </li>
                    <li>
                        <Link className={styles.navLink} to={"/about"}>About</Link>
                    </li>
                    <li>
                        <Link className={styles.navLink} to={"/dashboard"}>Home</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Nav;