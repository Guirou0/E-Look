import styles from '../css/home.module.css'

const Home = () => {

    return (
        <div className={styles.home}>
            <div className={styles.texto}>
                <h1>Bem vindo ao E-Look!</h1>
                <p> Este é um projeto feito com a finalidade de facilitar o acesso aos dados das
                    edições anteriores do Sisu e, assim, fornecer uma pequena ajuda para os milhares
                    estudantes que desejam obter uma vaga nas instituições públicas de ensino. 
                </p>
                <p> Atualmente, o projeto conta com dados de 4 edições do Sisu: 2020, 2021, 2022
                    e 2023. Dentre as possibilidades atuais, você pode escolher pesquisar um determinado
                    curso a partir da nota de corte ou, se preferir, a partir dos valores dos pesos de
                    cada matéria.
                </p>
                <p> O projeto ainda está em desenvolvimento e contará com mais possibilidades no futuro.
                    Desde já, agradeço pela sua visita.
                </p>
            </div>
            <div className={styles.imagens}>
                <img alt="logo" src='../assets/logo-fundo.jpeg' />
                <label>E-Look</label>
            </div>
        </div>
    )
}

export default Home