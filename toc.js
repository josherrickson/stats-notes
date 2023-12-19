window.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]')
  /*
    So the IntersectionObserver monitors, by default, the entire viewport
    (visible window) and triggers `isIntersecting` whenever a given section
    enters the viewport.

    The 'rootMargin' option gives 4 values (top, right, bottom, left) specifying
    amendments. Positive values go **outside** the viewport, negative values go
    **inside**. So a value of 100px means that margin is 100px **wider** than
    the viewport. Similarly, a value of -20% means that that margin is 20%
    **narrower**.

    My setting here creates a very narrow band at 10% down the screen (10% down
    from top, 90% up from bottom) to monitor.

    The 'threshold' option determines how much of the target must be inside the
    band. Because the band is essentially 0-width, we must have threshold 0,
    meaning if any part of the section touches it, it triggers. We could
    alternatively make the observed space larger (e.g. '-10% 0px -50% 0px') and
    up the threshold, but I couldn't get anything nice to work there.

    I chose the top 10% because if I set it lower, often the 'Introduction'
    would get skipped.
  */
  let options = {
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0,
  }

  function addActive(id) {
    document.querySelector(`nav li a[href='#${id}']`)
      .parentElement.classList.add('active')
  }

  function removeActive(id) {
    document.querySelector(`nav li a[href='#${id}']`)
      .parentElement.classList.remove('active')
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id')
      if (entry.isIntersecting) {
        addActive(id)
      } else {
        removeActive(id)
      }
    })
  }, options)

  // Track all sections that have an `id` applied
  sections.forEach((section) => {
    observer.observe(section)
  })

})
