import styles from "../css/navbar.module.css"
import { Link } from "react-router-dom"


const Navbar = () => {

    return (
        <div className={styles.navbar}>
            <img alt="logo" src="../assets/logo.png" />
            <Link to="/" className={styles.nav}>
                Página inicial
            </Link>
            <Link to="/corte" className={styles.nav}>
                Pesquisar por nota de corte
            </Link>
            <Link to="/pesos" className={styles.nav}>
                Pesquisar por valor de pesos
            </Link>
        </div>
    )
}

export default Navbar