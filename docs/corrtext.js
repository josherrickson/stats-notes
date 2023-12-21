const correlation = document.getElementById("x1x2corr");
const corrtext = document.getElementById("x1x2corr_text");

// Change the text dynamically
function updateCorrelation(level) {
  switch(level) {
  case "low":
    correlation.innerHTML = "0.002";
    break;
  case "mod":
    correlation.innerHTML = "0.553";
    break;
  case "high":
    correlation.innerHTML = "0.893";
    break;
  case "extreme":
    correlation.innerHTML = "0.995";
    break;
  }
}

function updateCorrText(level) {
  switch(level) {
  case "low":
    corrtext.innerHTML = "We see no relationship between the estimated coefficients, and each are well centered around the truth.";
    break;
  case "mod":
    corrtext.innerHTML = "While there is some semblance of a relationship, it is not very strong.";
    break;
  case "high":
    corrtext.innerHTML = "There’s a strong relationship now, such that if one coefficient is incorrectly high, the other is incorrectly low.";
    break;
  case "extreme":
    corrtext.innerHTML = "We now see a very strong relationship between the coefficients.";
    break;
  }
}

function updateAllCorrelation(level) {
  updatePlot(`data/${level}corr.json`)
  updateCorrelation(level)
  updateCorrText(level)
}
