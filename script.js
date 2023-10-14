// Get the function input
var functionInput = document.getElementById('functionInput');

// Get the x min, x max, y min and y max inputs
var xMinInput = document.getElementById('xMin');
var xMaxInput = document.getElementById('xMax');
var yMinInput = document.getElementById('yMin');
var yMaxInput = document.getElementById('yMax');

// Get the clear button
var clearButton = document.getElementById('clearButton');

// Get the keyboard buttons
var keyboardButtons = document.querySelectorAll('#keyboard button');

// Add an event listener to each keyboard button
keyboardButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        functionInput.value += this.textContent;
    });
});

// Get the canvas element
var ctx = document.getElementById('myChart').getContext('2d');

// Create the chart
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: []
    },
    options: {
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy'
                },
                zoom: {
                    enabled: true,
                    mode: 'xy'
                }
            }
        }
    }
});

// Get the form
var form = document.getElementById('functionForm');

// Add an event listener to the form
form.addEventListener('submit', function(event) {
    // Prevent the form from being submitted
    event.preventDefault();

    // Get the function from the input
    var func = functionInput.value;

    // Get the x min, x max, y min and y max from the inputs
    var xMin = parseFloat(xMinInput.value);
    var xMax = parseFloat(xMaxInput.value);
    var yMin = parseFloat(yMinInput.value);
    var yMax = parseFloat(yMaxInput.value);

    // Create an array of x values from xMin to xMax
    var xValues = Array.from({length: 201}, (_, i) => xMin + (xMax - xMin) * i / 200);

    // Calculate the corresponding y values
    var yValues = xValues.map(x => {
        try {
            var y = math.evaluate(func, {x: x});
            // Check if the result is a real number
            if (math.isNumeric(y) && !math.isComplex(y)) {
                return y;
            }
        } catch (e) {
            alert('Invalid function: ' + e.message);
            throw e;
        }
    });

    // Update the x labels of the chart
    myChart.data.labels = xValues;

    // Add the function to the chart
    myChart.data.datasets.push({
        label: func,
        data: yValues,
        borderColor: 'rgba(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', 1)',
        fill: false
    });

    // Update the y-axis range of the chart
    myChart.options.scales.y.min = yMin;
    myChart.options.scales.y.max = yMax;

    // Update the chart
    myChart.update();
});

// Add an event listener to the clear button
clearButton.addEventListener('click', function() {
    // Clear the datasets of the chart
    myChart.data.datasets = [];

    // Update the chart
    myChart.update();
});

// Plot a default function
functionInput.value = 'x^2';
form.dispatchEvent(new Event('submit'));




