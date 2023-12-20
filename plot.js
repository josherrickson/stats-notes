const ctx = document.getElementById("myChart").getContext("2d");
let myChart

function updatePlot(path) {
  fetch(path)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching data:', error);
    })
    .then((jsonData) => {

      var data = jsonData.map(entry => ({
        x: entry.b_1,
        y: entry.b_2
      }));


      const scatterData = {
        datasets: [{
          label: 'Scatter Plot',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.5)', // Adjust the color as needed
          pointRadius: 8, // Adjust the point size as needed
        }]
      };

      const scatterOptions = {
        devicePixelRatio: 4, // fixes blurry-on-firefox issue
        responsive: false,
        events: [],
        plugins: { legend: { display: false }, },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          },
          y: {
            type: 'linear',
            position: 'left'
          }
        }
      };


      if (myChart) {
        myChart.destroy();
      }

      myChart = new Chart(ctx, {
        type: "scatter",
        data: scatterData,
        options: scatterOptions,
      });
    })
}

updatePlot('data/lowcorr.json')
// updatePlot('data/modcorr.json')
// updatePlot('data/highcorr.json')
// updatePlot('data/extremecorr.json')
