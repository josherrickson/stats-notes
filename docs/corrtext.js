const correlation = document.getElementById("x1x2corr");

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
