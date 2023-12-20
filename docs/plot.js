const ctx = document.getElementById("myChart").getContext("2d");

fetch('data/lowcorr.json')
  .then((response) => response.json())
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

    const myChart = new Chart(ctx, {
      type: "scatter",
      data: scatterData,
      options: scatterOptions,
    });
  })
