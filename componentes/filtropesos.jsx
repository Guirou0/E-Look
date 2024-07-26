import styles from '../css/filtropesos.module.css'
import { useState, useEffect } from 'react';

const FiltroPesos = ({setFiltros, menu, handleMenu}) => {
    const [params, setParams] = useState({
        semestres: null,
        pred: null,
        pling: null,
        pmat: null,
        pch: null,
        pcn: null,
        localidade: null,
        modalidade: null,
        turno: null
    })

    const atualizarFiltros = (e) => {
        e.preventDefault();
        setFiltros(params)
    }

    const atualizarParams = (e) => {
        if(e.target.type == "number"){
            setParams(prev => ({
                ...prev,
                [e.target.name]: e.target.value == 0? null: e.target.value
            }))
            return
        }
        setParams(prev => ({
            ...prev,
            [e.target.name]: e.target.value == "qualquer"? null: e.target.value
        }))
    }


    return (
        <div className={styles.filtropesos} style={{transform: `translateX(${menu? "0": "85%"})`}}>
            <h1>
                <button name='menu' className={styles.menu} onClick={handleMenu} style={{transform: `rotate(${menu? "0deg": "180deg"})`}}></button>
                Filtros: 
            </h1>
            <form onSubmit={atualizarFiltros} className={styles.formfiltros}>
                <label>
                    Número de semestres:
                    <input type='number' name='semestres' min="0" max="10" onChange={atualizarParams} placeholder='Deixe vazio para ignorar o filtro'/>
                </label>
                <label className={styles.pesos}>
                    Pesos (deixe vazio para ignorar):
                    <div className={styles.pesoslabel}>
                        Redação:
                        <input className={styles.pesosinput} type='number' name='pred' min="0" max="5" onChange={atualizarParams} placeholder=''/>
                    </div>
                    <div className={styles.pesoslabel}>
                        Linguagens:
                        <input className={styles.pesosinput} type='number' name='pling' min="0" max="5" onChange={atualizarParams} placeholder=''/>
                    </div>
                    <div className={styles.pesoslabel}>
                        Matemática:
                        <input className={styles.pesosinput} type='number' name='pmat' min="0" max="5" onChange={atualizarParams} placeholder=''/>
                    </div>
                    <div className={styles.pesoslabel}>
                        Ciências humanas:
                        <input className={styles.pesosinput} type='number' name='pch' min="0" max="5" onChange={atualizarParams} placeholder=''/>
                    </div>
                    <div className={styles.pesoslabel}>
                        Ciências da natureza:
                        <input className={styles.pesosinput} type='number' name='pcn' min="0" max="5" onChange={atualizarParams} placeholder=''/>
                    </div>
                </label>
                <label>
                    Estado:
                    <select name="localidade" defaultValue="qualquer" onChange={atualizarParams}>
                        <option value="qualquer">Qualquer</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagos</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraíma</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                    </select>
                </label>
                <label>
                    Modalidade:
                    <select name='modalidade' defaultValue="qualquer" onChange={atualizarParams}>
                        <option value="qualquer">Qualquer</option>
                        <option value="I">I</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                        <option value="V">V</option>
                        <option value="VI">VI</option>
                        <option value="VII">VII</option>
                        <option value="VIII">VIII</option>
                        <option value="IX">IX</option>
                    </select>
                </label>
                <label>
                    Turno:
                    <select name='turno' defaultValue="qualquer" onChange={atualizarParams}>
                        <option value="qualquer">Qualquer</option>
                        <option value="Matutino">Matutino</option>
                        <option value="Vespertino">Vespertino</option>
                        <option value="Noturno">Noturno</option>
                        <option value="Integral">Integral</option>
                    </select>
                </label>
                <button type='submit'>Aplicar filtros</button>
            </form>
        </div>
    )
}

export default FiltroPesos