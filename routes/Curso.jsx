import styles from '../css/curso.module.css'
import { useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'

import Grafico from '../componentes/grafico';
import Mapa from '../componentes/mapa';
import Notas from '../componentes/notas';

const API = axios.create({
    baseURL: import.meta.env.VITE_API
})

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const Curso = () => {
    const query = useQuery();
    const [dados, setDados] = useState(null)
    const [estat, setEstat] = useState({
        media: null,
        desvio: null
    })
    
    useEffect(() => {
        const nome = query.get('nome')
        const campus = query.get('campus') 
        const faculdade = query.get('faculdade')
        const modalidade = query.get('modalidade')
        const turno = query.get('turno')

        if (nome && campus && faculdade && modalidade && turno) {
            
            API.get(`/cursoG?nome=${nome}&campus=${campus}&faculdade=${faculdade}&modalidade=${modalidade}&turno=${turno}`)
            .then((response) => {
                setDados(response.data)
            })
            .catch((error) => {
                alert(error.message)
            })
        }
    }, [])  

    useEffect(() => {
        if (dados){
            const media = dados.reduce((total, num) => {
                return total + num['nota_corte']
            }, 0)/dados.length

            const desvio = Math.sqrt(dados.reduce((total, num) => {
                return total + Math.pow(num['nota_corte']-media, 2)
            }, 0)/dados.length)


            setEstat({
                media: Math.round(media),
                desvio: Math.round(desvio)
            })
        }
    }, [dados])

    const Loading = () => {
        return <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div className={styles.loading}></div></div>
    }

    const GraficoNotas = () => {
        if (dados && dados.length > 0) {
            const data = {
                labels: dados.map((dado) => {return dado['ano']}),
                datasets: [
                    {
                        label: "Evolução da nota de corte ao longo dos anos",
                        data: dados.map((dado) => {return dado['nota_corte']}),
                        fill: true,
                        backgroundColor: "rgba(6, 198, 121, .6)",
                        borderColor: "rgba(6, 198, 121, 1)"
                    }
                ]
            }
            return <Grafico tipo={"line"} data={data} />
        } 
        return <Loading />
    }

    const GraficoInscritos = () => {
        if (dados && dados.length > 0) {
            const data = {
                labels: dados.map((dado) => {return dado['ano']}),
                datasets: [
                    {
                        label: "Evolução do número de inscritos ao longo dos anos",
                        data: dados.map((dado) => {return dado['inscritos']}),
                        fill: true,
                        backgroundColor: "rgba(0, 191, 255, .6)"
                    },
                    {
                        label: "Evolução do número de inscritos por vaga",
                        data: dados.map((dado) => {return dado['inscritos']/dado['vagas']}),
                        fill: true,
                        backgroundColor: "rgba(0, 191, 255, 1)"
                    }
                ]
            }
            return <Grafico tipo={"bar"} data={data} />
        } 
        return <Loading />    
    }

    return(
        <>
            <div className={styles.curso}>
                <div className={styles.graficos}>
                    <h1>Visualize os dados:</h1>
                    <GraficoNotas />
                    <GraficoInscritos />
                </div>
                {dados && dados.length > 0?
                <div className={styles.dados}>
                    <label>{dados[0].curso.nome}</label>
                    <label>{dados[0].ies['nome_facul']} - {dados[0].ies['sigla']}</label>
                    <label>{dados[0].ies['campus']}</label>
                    <div className={styles.estatEmap}> 
                        <div className={styles.estatisticas}>
                            <div className={styles.mats}>
                                <div className={styles.media}>
                                    <h2>Média de corte</h2>
                                    <h1 className={styles.valores}>{estat.media && !isNaN(estat.media)? `${estat.media} pontos`: "N/A"}</h1>
                                </div>
                                <div className={styles.variancia}>
                                    <h2>Desvio da nota</h2>
                                    <h1 className={styles.valores}>{estat.desvio && !isNaN(estat.desvio)? `${estat.desvio} pontos`: "N/A"}</h1>
                                </div>
                            </div>
                            <div className={styles.chances}>
                                <h2>Coloque suas notas abaixo para ver suas chances</h2>
                                <Notas media={estat.media} pesos={dados[dados.length-1].pesos} desvio={estat.desvio}/>
                            </div>
                        </div>
                        <div className={styles.mapa}>
                            <h1>Localização</h1>
                            <Mapa position={dados[0].localidade.coordenadas} cidade={dados[0].localidade.municipio} estado={dados[0].localidade.uf} />
                        </div>
                    </div>
                </div>:
                <Loading />}
            </div>
            <div className={styles.back}></div>
        </>
    )
}

export default Curso