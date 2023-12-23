 // Get the input element and the content container
 const filterInput = document.getElementById('filterInput');
 const subjectList = document.querySelectorAll('.index_li')

 // Add an event listener to the input
 filterInput.addEventListener('input', highlightOccurrences);

function highlightOccurrences() {
   subjectList.forEach((x) => {
     const toReplace = filterInput.value.trim()

     // First remove any existing highlighting
     const regexRemoveHighlight = /<span class=\"highlight\">([^<]*)<\/span>/g;
     x.innerHTML = x.innerHTML.replace(regexRemoveHighlight, '$1');

     // If the user has input anything
     if (toReplace.length != 0) {
       const htmlString = x.innerHTML.match(/<[^>]*>|[^<]+/g)

       const newString = htmlString.map((s) => {
         // Add span if not currently a tag
         if (s.charAt(0) != "<") {
           // 'g' means match all; 'i' means ignore case
           let regex = new RegExp(`(${toReplace})`, 'gi');
           return s.replaceAll(regex,
                               `<span class="highlight">$1</span>`)
         } else {
           // Return tags directly.
           return s
         }
       })

       x.innerHTML = newString.join('')
     }
   })
 }


// Add an event listener to the input
filterInput.addEventListener('input', filterList);

function filterList() {
  // Get the user input and convert it to lowercase for case-insensitive matching
  const filterValue = filterInput.value.trim();

  subjectList.forEach((sl) => {
    // Get the text subjectList of the current list item and convert it to lowercase
    const listItemText = sl.textContent

    // Check if the list item contains the user input
    if (listItemText.includes(filterValue)) {
      // If it does, display the list item
      sl.style.display = ''
    } else {
      // If it doesn't, hide the list item
      sl.style.display = 'none'
    }
  })
}
