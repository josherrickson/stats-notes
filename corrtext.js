document.addEventListener("DOMContentLoaded", function () {
  // Get radio buttons and text containers
  const radioButtons = document.
        querySelectorAll('input[name="collinearity_strength"]');

  // Get text to change
  const textContainers = document.querySelectorAll('.text-container');
  const correlation = document.getElementById("x1x2corr");


  // Attach change event listeners to radio buttons
  radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener('change', function () {
      // Get the selected radio button
      const level = document.
            querySelector('input[name="collinearity_strength"]:checked').value;

      /**** Changing correlation value ****/
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


      /**** Changing text paragraph ****/
      // Hide all text containers
      textContainers.forEach(function (container) {
        container.style.display = 'none';
      });

      // Show the selected text container
      document.getElementById(level + 'Text').style.display = 'block';
    });
  });
});
