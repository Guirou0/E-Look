import { useState, useEffect } from "react";
import styles from '../css/notas.module.css'

import { MdOutlineEmojiEmotions } from "react-icons/md";
import { BsEmojiGrimace, BsEmojiFrown } from "react-icons/bs";

const Notas = ({media, pesos, desvio}) => {
    const [notas, setNotas] = useState(null)
    const [previsao, setPrevisao] = useState(null)

    const changeNotas = (e) => {
        e.preventDefault();
        setNotas(prev => ({
            ...prev,
            [e.target.name]: parseFloat((e.target.value).replace(',', '.'))
        }))
    }

    useEffect(()=>{
        const grades = JSON.parse(localStorage.getItem('notas'))
        setNotas(grades)
    },[])

    useEffect(()=>{
        if (notas){
            localStorage.setItem('notas', JSON.stringify(notas))
            setPrevisao((notas.red*pesos.pred+notas.ling*pesos.pling+notas.mat*pesos.pmat+notas.ch*pesos.pch+notas.cn*pesos.pcn)/(pesos.pred+pesos.pling+pesos.pmat+pesos.pch+pesos.pcn))
        }
    }, [notas])

    const calcuChances = () =>{
        if (previsao > media+desvio){
            return(
                <div style={{display: 'flex', alignItems: 'center', padding: '5px', backgroundColor: 'lightgreen', height: '100%', paddingTop: '15%'}}>
                    <MdOutlineEmojiEmotions style={{width: '30%', height:'70%'}}/>
                    <h3 style={{width: '70%', textAlign: 'center', fontSize: 'clamp(1rem,2.7vw,3vw)'}}>Boas</h3>
                </div>
            )
        }
        else if((previsao>=media-desvio)&&(previsao<=media+desvio)){
            return(
                <div style={{display: 'flex', alignItems: 'center', padding: '5px', backgroundColor: 'yellow', height: '100%', paddingTop: '15%'}}>
                    <BsEmojiGrimace style={{width: '30%', height:'70%'}}/>
                    <h3 style={{width: '70%', textAlign: 'center', fontSize: 'clamp(1rem,2.7vw,3vw)'}}>Média</h3>
                </div>
            )
        }
        else{
            return(
                <div style={{display: 'flex', alignItems: 'center', padding: '5px', backgroundColor: 'tomato', height: '100%', paddingTop: '15%'}}>
                    <BsEmojiFrown style={{width: '30%', height:'70%'}}/>
                    <h3 style={{width: '70%', textAlign: 'center', fontSize: 'clamp(1rem,2.7vw,3vw)'}}>Ruins</h3>
                </div>
            )
        }
    }

    return (
        <>
            
            <div className={styles.notas}>
                <label>
                    Redação
                    <input type='number' min='0' max='1000' name='red' value={notas? notas.red : 0} onChange={changeNotas}/>
                </label>
                <label>
                    Matemática
                    <input type='number' min='0' max='1000' name='mat' value={notas? notas.mat: 0} onChange={changeNotas}/>
                </label>
                <label>
                    Linguagens
                    <input type='number' min='0' max='1000' name='ling' value={notas? notas.ling: 0} onChange={changeNotas}/>
                </label>
                <label>
                    Ciên. Humanas
                    <input type='number' min='0' max='1000' name='ch' value={notas? notas.ch: 0} onChange={changeNotas}/>
                </label>
                <label>
                    Ciên. Natureza
                    <input type='number' min='0' max='1000' name='cn' value={notas? notas.cn: 0} onChange={changeNotas}/>
                </label>
            </div>
            {previsao && media && desvio != null?
            <div className={styles.resultados}>
                <div className={styles.previsao}>
                    <h2>Possível nota</h2>
                    <h1>{Math.round(previsao)} pontos</h1>
                </div>
                <div className={styles.previsao}>
                    <h2>Chances</h2>
                    {calcuChances()}
                </div>
            </div>:<h1>Aguardando valores...</h1>}
        </>
    )
}

export default Notas