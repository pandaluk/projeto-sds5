import axios from 'axios';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/Sale';
import { BASE_URL } from 'utils/requests';

type ChartData = {
    labels: string[];
    series: number[];
}

const DonutChart = () => {

    let chartData: ChartData = { labels: [], series: [] };

    axios.get(`${BASE_URL}/sales/amount-by-seller`)
        .then(res => {
            const data = res.data as SaleSum[];
            const myLabels = data.map(item => item.sellerName);
            const mySeries = data.map(item => item.sum);
            chartData = { labels: myLabels, series: mySeries };
        })
        .catch(err => {
            console.log(err);
        });

    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"
        />
    );
}

export default DonutChart;