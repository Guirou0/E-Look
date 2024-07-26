import styles from '../css/corte.module.css'
import { useState, useTransition, useEffect } from 'react'
import axios from 'axios'

import Ano from '../componentes/ano'
import Tabela from '../componentes/tabela'
import FiltroCorte from '../componentes/filtrocorte'
import Legendas from '../componentes/legendas'



const API = axios.create({
    baseURL: import.meta.env.VITE_API
})

const Corte = () => {
    const [filtros, setFiltros] = useState({
        ano: 2023,
        curso: null,
        parametros: {
            corte_max: null,
            inscritos_max: null,
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
        if (p['corte_max'])         params+=`&corte_max=${p['corte_max']}`
        if (p['inscritos_max'])     params+=`&inscritos_max=${p['inscritos_max']}`
        if (p['localidade'])        params+=`&localidade=${p['localidade']}`
        if (p['modalidade'])        params+=`&modalidade=${p['modalidade']}`
        if (p['turno'])             params+=`&turno=${p['turno']}`

        params+=`&offset=${filtros.offset}`

        if (filtros.curso) startTransition( async () => {
            API.get('/corteG'+params)
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
        <div className={styles.corte}>
            <Ano setAno={setAno} />
            {isPending?
            <div className={styles.loadingcontainer}>
                <div className={styles.loading}></div>
            </div> : 
            <Tabela setCurso={setCurso} results={resultado} setOff={setOffset} menu={filtrostate}/>}
            <FiltroCorte setFiltros={setParametros} menu={filtrostate} handleMenu={changeMenu}/>
            <Legendas />
        </div>
    )
}

export default Corte