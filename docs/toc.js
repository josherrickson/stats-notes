window.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]')
  let options = {
    root: document,
    rootMargin: "-50% 0px",
    threshold: 0,
  }

  let currentSelection = sections[0].id

  function addActive(id) {
    document.querySelector(`nav li a[href="#${id}"]`)
      .parentElement.classList.add('active')
  }

  function removeActive(id) {
    document.querySelector(`nav li a[href="#${id}"]`)
      .parentElement.classList.remove('active')
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        removeActive(currentSelection);
        addActive(id);
        currentSelection = id;
      }
    });
  }, options);

  // Track all sections that have an `id` applied
  sections.forEach((section) => {
    observer.observe(section);
  });

});
