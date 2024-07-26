import styles from '../css/ano.module.css'
import { useState } from 'react'

const Ano = ({setAno}) => {
    const [year, setYear] = useState(2023);

    const changeYear = (e) => {
        setYear(parseInt(e.target.name))
        setAno(parseInt(e.target.name))
    }

    const selectMargin = {
        "2023": "0px",
        "2022": "80px",
        "2021": "160px",
        "2020": "240px"
    }

    return (
        <div className={styles.ano}>
            <button name='2023' onClick={changeYear} style={{color: `${year==2023? "white": "black"}`}}>
                2023
            </button>
            <button name='2022' onClick={changeYear} style={{color: `${year==2022? "white": "black"}`}}>
                2022
            </button>
            <button name='2021' onClick={changeYear} style={{color: `${year==2021? "white": "black"}`}}>
                2021
            </button>
            <button name='2020' onClick={changeYear} style={{color: `${year==2020? "white": "black"}`}}>
                2020
            </button>
            <div className={styles.select} style={{marginTop: selectMargin[year]}}></div>
        </div>
    )
}

export default Ano