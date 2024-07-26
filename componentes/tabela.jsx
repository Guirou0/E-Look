import styles from '../css/tabela.module.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Tabela = ({setCurso, results, setOff, menu}) => {
    const navigate = useNavigate();
    const [keys, setKeys] = useState(null)

    const dicionario = {
        "campus":       "Campus",
        "categoria":    "Categoria",
        "grau":         "Grau do curso",
        "inscritos":    "Nº de inscritos",
        "modalidade":   "Modalidade de cota",
        "municipio":    "Município",
        "nome_curso":   "Nome do curso",
        "nome_facul":   "Nome da IES",
        "nota_corte":   "Nota de corte",
        "qt_vagas":     "Nº de vagas",
        "regiao":       "Região do campus",
        "sigla":        "Sigla da IES",
        "tipo":         "Tipo da IES",
        "turno":        "Turno do curso",
        "uf":           "Estado",
        "semestres":    "Nº de semestres",
        "peso_red":     "Peso em redação",
        "nota_red":     "Nota mínima em redação",
        "peso_ling":    "Peso em linguagens",
        "nota_ling":    "Nota mínima em linguagens",
        "peso_mat":     "Peso em matemática",
        "nota_mat":     "Nota mínima em matemática",
        "peso_ch":      "Peso em ciências humanas",
        "nota_ch":      "Nota mínima em ciências humanas",
        "peso_cn":      "Peso em ciências da natureza",
        "nota_cn":      "Nota mínima em ciências da natureza"
    }

    const legendas = {
        "Candidatos autodeclarados pretos, pardos ou indígenas, com renda familiar bruta per capita igual ou inferior a 1,5 salário mínimo e que tenham cursado integralmente o ensino médio em escolas públicas (Lei nº 12.711/2012).": "I",											
        "Candidatos autodeclarados pretos, pardos ou indígenas que, independentemente da renda (art. 14, II, Portaria Normativa nº 18/2012), tenham cursado integralmente o ensino médio em escolas públicas (Lei nº 12.711/2012).": "II",											
        "Candidatos com renda familiar bruta per capita igual ou inferior a 1,5 salário mínimo que tenham cursado integralmente o ensino médio em escolas públicas (Lei nº 12.711/2012).": "III",											
        "Candidatos que, independentemente da renda (art. 14, II, Portaria Normativa nº 18/2012), tenham cursado integralmente o ensino médio em escolas públicas (Lei nº 12.711/2012).": "IV",											
        "Candidatos com deficiência autodeclarados pretos, pardos ou indígenas, que tenham renda familiar bruta per capita igual ou inferior a 1,5 salário mínimo e que tenham cursado integralmente o ensino médio em escolas públicas (Lei nº 12.711/2012).": "V",											
        "Candidatos com deficiência autodeclarados pretos, pardos ou indígenas que, independentemente da renda (art. 14, II, Portaria Normativa nº 18/2012), tenham cursado integralmente o ensino médio em escolas públicas (Lei nº 12.711/2012).": "VI",											
        "Candidatos com deficiência que tenham renda familiar bruta per capita igual ou inferior a 1,5 salário mínimo e que tenham cursado integralmente o ensino médio em escolas públicas (Lei nº 12.711/2012).": "VII",											
        "Candidatos com deficiência que, independentemente da renda (art. 14, II, Portaria Normativa nº 18/2012), tenham cursado integralmente o ensino médio em escolas públicas (Lei nº 12.711/2012).": "VIII",											
        "Ampla concorrência": "IX"											   
    }

    const changeCurso = (e) => {
        e.preventDefault()
        setCurso(e.target[0].value)
        e.target[0].value = ""
    }

    useEffect(() => {
        if (results) 
            {
                setKeys(results.resultados!=0? 
                Object.keys(results.dados[0]): 
                null)
            }
    }, [results])
    


    return (
        <div className={styles.tabela}>
            <form onSubmit={changeCurso} className={styles.curso}>
                <label>
                    Pesquise por um curso:
                    <input className={styles.cursoinput} name='curso' type='text' placeholder='Digite aqui...' autoComplete='off' required />
                </label>
                <button type='submit' title='Enviar'></button>
            </form>

            {results &&
            <div className={styles.pagination} style={{width: `${menu? "100%": "123%"}`}}>
                <div className={styles.numresult}><h2>Resultados: </h2><h2>{results.resultados}</h2></div>
                <div className={styles.pagbar} style={{width: `${menu? "75%": "80%"}`}}>
                    {results.resultados!=0? Array.from({length: Math.ceil(results.resultados/20)}, (_, index) => 
                         <div key={index} name={index} className={styles.pageselector} onClick={(e)=>{setOff(index+1)}} style={{backgroundColor: `${index+1==results.pagina? '#038D66': '#06C679'}`}}>
                            {index+1}
                        </div>
                            ): <></>}
                </div>
            </div>}

            <div className={styles.tabelaresultados} style={{width: `${menu? "100%": "123%"}`}}>
                {results &&
                <table>
                    <thead>
                        <tr>
                            {keys && results.resultados!=0?
                            keys.map((key, i) => {
                                return <th className={styles.headtable} key={i}>{dicionario[key]}</th>
                            }): <></>}
                        </tr>
                    </thead>
                    <tbody>
                        {keys && results.resultados!=0?
                        results.dados.map((result, i) => {
                            return(
                                <tr key={i} style={{cursor: 'pointer'}} onClick={()=>{navigate(`/curso?nome=${result['nome_curso']}&campus=${result['campus']}&faculdade=${result['nome_facul']}&modalidade=${result['modalidade']}&turno=${result['turno']}`)}}>
                                    {keys.map((key, y) => {
                                        return(
                                            <td key={y} className={styles.bodytable}>
                                                {key == "modalidade"? legendas[result[key]] : result[key]}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        }): <div className={styles.nf}>Nada encontrado :(</div>}
                    </tbody>
                </table>}
            </div>
        </div>
    
    )
}

export default Tabela