import { Chart as  ChartJS } from 'chart.js/auto';
import { Line, Bar } from 'react-chartjs-2';

const Grafico = ({tipo, data}) => {
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: false,
                text: 'Gráfico',
            },
        },
    };

    if(tipo == 'line') return <Line data={data} options={options}/>
    if(tipo == 'bar') return <Bar data={data} options={options}/>
};

export default Grafico;
