import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import PropTypes from 'prop-types'

const HistogramComponent = ({ salesData, labels, labTitle}) => {
  // Exemple de structure des données : dailySalesData
  // dailySalesData = [10, 15, 5, 20, 12, 18, 8]; // Remplacez ceci par vos données réelles

  const data = {
    labels: labels,
    datasets: [
      {
        label: labTitle,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: salesData,
      },
    ],
  };

  const options = {
    scales: {
        yAxes: [{
        tricks: {
            beginAtZero: true,
        }
      }],
    },
  };

  return <Line data={data} options={options} />
};

HistogramComponent.propTypes = {
  salesData: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  labTitle: PropTypes.string.isRequired,
};

export default HistogramComponent;
