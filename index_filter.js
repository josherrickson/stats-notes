 // Get the input element and the content container
 const filterInput = document.getElementById('filterInput');
 const content = document.querySelectorAll('.index_li')

 // Add an event listener to the input
 filterInput.addEventListener('input', highlightOccurrences);

function highlightOccurrences() {
   content.forEach((x) => {
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
           return s.replaceAll(toReplace,
                               `<span class="highlight">${toReplace}</span>`)
         } else {
           // Return tags directly.
           return s
         }
       })

       x.innerHTML = newString.join('')
     }
   })
 }
