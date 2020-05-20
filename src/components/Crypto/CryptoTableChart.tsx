import React from 'react';
import Chart from 'chart.js';
import { CryptoHistoryRate } from '../../redux/types';

type PropsTypes = {
  rate: CryptoHistoryRate 
}

const CryptoTableChart: React.FC<PropsTypes> = (props) => {
  const chartConfig = {
    type: 'line',
    data: {
        datasets: [{
            label: 'PRICE $',
            data: props.rate.data,
            borderWidth: 2,
            backgroundColor: 'rgba(255,255,255,1)',
            borderColor: 'rgba(0,0,0,1)'
        }],
        labels: [1, 2, 3, 4, 5, 6, 7]
    },
    options: {
        layout: {
            padding: {
                left: 5,
                right: 5,
                top: 5,
                bottom: 5
            }
        },
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: { display: false }, 
                gridLines: { display: false }
            }],
            xAxes: [{
              ticks: { display: false }, 
              gridLines: { display: false },
              drawBorder: false
            }]
            
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
    }
}
  const chartContainer = React.useRef(null);
  React.useEffect(() => {
    const myChart = new Chart(chartContainer.current!, chartConfig);
    myChart.resize()
    }, [chartConfig]);
  return <canvas style={{width: '450px', height: '100px' }} ref={chartContainer}></canvas>
};

export { CryptoTableChart };