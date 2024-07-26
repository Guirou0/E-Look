import styles from '../css/pesos.module.css'
import { useState, useTransition, useEffect } from 'react'
import axios from 'axios'

import Ano from '../componentes/ano'
import Tabela from '../componentes/tabela'
import FiltroPesos from '../componentes/filtropesos'
import Legendas from '../componentes/legendas'

const API = axios.create({
    baseURL: import.meta.env.VITE_API
})

const Pesos = () => {
    const [filtros, setFiltros] = useState({
        ano: 2023,
        curso: null,
        parametros: {
            semestres: null,
            pred: null,
            pling: null,
            pmat: null,
            pch: null,
            pcn: null,
            localidade: null,
            modalidade: null,
            turno: null,
        },
        offset: 1
    })
    const [resultado, setResultado] = useState(null)
    const [filtrostate, setFiltrostate] = useState(false)
    const [isPending, startTransition] = useTransition()

    useEffect(()=>{
        let params = `?ano=${filtros.ano}`
        if (filtros.curso) params+=`&curso=${filtros.curso}`

        const p = filtros.parametros
        if (p['pred'])              params+=`&pred=${p['pred']}`
        if (p['pling'])             params+=`&pling=${p['pling']}`
        if (p['pmat'])              params+=`&pmat=${p['pmat']}`
        if (p['pch'])               params+=`&pch=${p['pch']}`
        if (p['pcn'])               params+=`&pcn=${p['pcn']}`
        if (p['semestres'])         params+=`&semestres=${p['semestres']}`
        if (p['localidade'])        params+=`&localidade=${p['localidade']}`
        if (p['modalidade'])        params+=`&modalidade=${p['modalidade']}`
        if (p['turno'])             params+=`&turno=${p['turno']}`

        params+=`&offset=${filtros.offset}`

        if (filtros.curso) startTransition( async () => {
            API.get('/pesosG'+params)
            .then((response) => {
                setResultado(response.data)
            })
            .catch((error) => {
                alert(error.message)
            })
        })

    },[filtros])

    const setAno = (newAno) => {
        setFiltros(prev => ({
            ...prev,
            ano: newAno,
            offset: 1
        }))
    }

    const setCurso = (newCurso) => {
        setFiltros(prev => ({
            ...prev,
            curso: newCurso,
            offset: 1
        }))
    }

    const setParametros = (newParams) => {
        setFiltros(prev => ({
            ...prev,
            parametros: newParams,
            offset: 1
        }))
    }

    const setOffset = (newOffset) => {
        setFiltros(prev => ({
            ...prev,
            offset: newOffset
        }))
    }

    const changeMenu = () => {
        setFiltrostate(!filtrostate)
    }

    useEffect(() => {
        const { innerWidth: width, innerHeight: height } = window;
        if (width<=800) setFiltrostate(true)
      }, []);
    
    return (
        <div className={styles.pesos}>
            <Ano setAno={setAno} />
            {isPending?
            <div className={styles.loadingcontainer}>
                <div className={styles.loading}></div>
            </div> : 
            <Tabela setCurso={setCurso} results={resultado} setOff={setOffset} menu={filtrostate}/>}
            <FiltroPesos setFiltros={setParametros} menu={filtrostate} handleMenu={changeMenu}/>
            <Legendas />
        </div>
    )
}

export default Pesos