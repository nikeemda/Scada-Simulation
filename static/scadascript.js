let simulationInterval;

function fetchData() {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('temperature').innerText = data.temperature.toFixed(2) + '°C';
            document.getElementById('pressure').innerText = data.pressure.toFixed(2) + ' atm';
            if (data.temperature > 25) {
                document.getElementById('alert').style.display = 'block';
            } else {
                document.getElementById('alert').style.display = 'none';
            }
            updateChart(data.temperature, data.pressure);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function startSimulation() {
    simulationInterval = setInterval(fetchData, 1000);
}

function stopSimulation() {
    clearInterval(simulationInterval);
}

function updateChart(temperature, pressure) {
    const now = new Date().toLocaleTimeString();

    const temperatureTrace = {
        x: [now],
        y: [temperature],
        mode: 'lines+markers',
        name: 'Temperature (°C)',
        line: {color: 'red'}
    };

    const pressureTrace = {
        x: [now],
        y: [pressure],
        mode: 'lines+markers',
        name: 'Pressure (atm)',
        line: {color: 'blue'}
    };

    const data = [temperatureTrace, pressureTrace];

    const layout = {
        title: 'Temperature and Pressure Readings',
        xaxis: {
            title: 'Time'
        },
        yaxis: {
            title: 'Value'
        }
    };

    Plotly.react('chart', data, layout);
}

document.addEventListener('DOMContentLoaded', (event) => {
    Plotly.newPlot('chart', [], {
        title: 'Temperature and Pressure Readings',
        xaxis: {title: 'Time'},
        yaxis: {title: 'Value'}
    });
});

// Expose functions to global scope
window.startSimulation = startSimulation;
window.stopSimulation = stopSimulation;
