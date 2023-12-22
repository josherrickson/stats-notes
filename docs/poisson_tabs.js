const propmeancontainers = document.querySelectorAll('.prop-mean-container');
const propimagecontainers = document.querySelectorAll('.prop-image-container');
const propbiascontainers = document.querySelectorAll('.prop-bias-container');

function handleTabClick(level) {

  const sim_prop_1 = document.getElementById('sim_prop_1')
  const sim_prop_2 = document.getElementById('sim_prop_2')
  const sim_prop_3 = document.getElementById('sim_prop_3')

  switch(level) {
    case "10":
      sim_prop_1.innerHTML = ".1"
      sim_prop_2.innerHTML = ".1"
      sim_prop_3.innerHTML = ".1"
      break;
    case "5":
      sim_prop_1.innerHTML = ".05"
      sim_prop_2.innerHTML = ".05"
      sim_prop_3.innerHTML = ".05"
      break;
    case "3":
      sim_prop_1.innerHTML = ".03"
      sim_prop_2.innerHTML = ".03"
      sim_prop_3.innerHTML = ".03"
      break;
    case "1":
      sim_prop_1.innerHTML = ".01"
      sim_prop_2.innerHTML = ".01"
      sim_prop_3.innerHTML = ".01"
      break;
  }

  /**** Changing code and plots ****/
  // Hide everything
  propmeancontainers.forEach(function (container) {
    container.style.display = 'none';
  });
  propimagecontainers.forEach(function (container) {
    container.style.display = 'none';
  });
  propbiascontainers.forEach(function (container) {
    container.style.display = 'none';
  });

  // Show the results corresponding to selected level
  document.getElementById("p-m-c-" + level).style.display = 'block';
  document.getElementById("p-image-" + level).style.display = 'block';
  document.getElementById("p-bias-" + level).style.display = 'block';
}

// Add event listeners to each tab
document.getElementById('tab10perc').
         addEventListener('click', function () {
           handleTabClick('10');
         });

document.getElementById('tab5perc').
         addEventListener('click', function () {
           handleTabClick('5');
         });

document.getElementById('tab3perc').
         addEventListener('click', function () {
           handleTabClick('3');
         });

document.getElementById('tab1perc').
         addEventListener('click', function () {
           handleTabClick('1');
         });
