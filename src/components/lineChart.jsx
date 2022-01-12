import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    
  } from 'chart.js'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  )

const LineChart = ({coinHistory, coinName, currentPrice}) => {
    const coinPrice = coinHistory?.map(coin => coin?.price);
    const coinTimestamp = coinHistory?.map(coin => new Date(coin?.timestamp * 1000)?.toLocaleDateString());

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Price in USD',
            },
        },
    }
    console.log(data, options)
    return (
        <div>
            <Line data={data} options={options} />
        </div>
    )
}

export default LineChart
