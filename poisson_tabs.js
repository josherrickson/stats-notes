const propMeanContainers = document.querySelectorAll('.prop-mean-container')
const propImageContainers = document.querySelectorAll('.prop-image-container')
const propBiasContainers = document.querySelectorAll('.prop-bias-container')
const poissontabs = document.querySelectorAll('.poisson-results-tab')

function handleTabClick(level) {

  const sim_prop_1 = document.getElementById('sim_prop_1')
  const sim_prop_2 = document.getElementById('sim_prop_2')
  const sim_prop_3 = document.getElementById('sim_prop_3')

  switch(level) {
  case '10':
    sim_prop_1.innerHTML = '.1'
    sim_prop_2.innerHTML = '.1'
    sim_prop_3.innerHTML = '.1'
    break
  case '5':
    sim_prop_1.innerHTML = '.05'
    sim_prop_2.innerHTML = '.05'
    sim_prop_3.innerHTML = '.05'
    break
  case '3':
    sim_prop_1.innerHTML = '.03'
    sim_prop_2.innerHTML = '.03'
    sim_prop_3.innerHTML = '.03'
    break
  case '1':
    sim_prop_1.innerHTML = '.01'
    sim_prop_2.innerHTML = '.01'
    sim_prop_3.innerHTML = '.01'
    break
  case '.5':
    sim_prop_1.innerHTML = '.005'
    sim_prop_2.innerHTML = '.005'
    sim_prop_3.innerHTML = '.005'
    break
  }

  /**** Changing code and plots ****/
  // Hide everything
  propMeanContainers.forEach(hideElement)
  propImageContainers.forEach(hideElement)
  propBiasContainers.forEach(hideElement)

  function hideElement(container) {
    container.style.display = 'none'
  }

  // Show the results corresponding to selected level
  document.getElementById('p-m-c-' + level).style.display = 'block'
  document.getElementById('p-image-div-' + level).style.display = 'block'
  document.getElementById('p-bias-' + level).style.display = 'block'

  /**** Changing active tab ****/
  poissontabs.forEach((t) => t.classList.remove('poisson-active-tab'))
  document.getElementById('tab' + level + 'perc')
    .classList.add('poisson-active-tab')

}

// Add event listeners to each tab
document.getElementById('tab10perc').
  addEventListener('click', function () {
    handleTabClick('10')
  })

document.getElementById('tab5perc').
  addEventListener('click', function () {
    handleTabClick('5')
  })

document.getElementById('tab3perc').
  addEventListener('click', function () {
    handleTabClick('3')
  })

document.getElementById('tab1perc').
  addEventListener('click', function () {
    handleTabClick('1')
  })

document.getElementById('tab.5perc').
  addEventListener('click', function () {
    handleTabClick('.5')
  })

// dark-mode/light-mode images
const image10 = document.getElementById('p-image-10')
const image5 = document.getElementById('p-image-5')
const image3 = document.getElementById('p-image-3')
const image1 = document.getElementById('p-image-1')
const image_5 = document.getElementById('p-image-.5')

const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')

function updateColorScheme() {
  if (darkModeQuery.matches) {
    image10.src = 'images/poisson10_dark.svg'
    image5.src = 'images/poisson5_dark.svg'
    image3.src = 'images/poisson3_dark.svg'
    image1.src = 'images/poisson1_dark.svg'
    image_5.src = 'images/poisson.5_dark.svg'
  } else {
    image10.src = 'images/poisson10.svg'
    image5.src = 'images/poisson5.svg'
    image3.src = 'images/poisson3.svg'
    image1.src = 'images/poisson1.svg'
    image_5.src = 'images/poisson.5.svg'
  }
}


updateColorScheme()

// Add event listener for changes in color scheme preference
darkModeQuery.addEventListener('change', updateColorScheme)
