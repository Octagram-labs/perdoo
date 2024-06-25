document.addEventListener('DOMContentLoaded', function () {
  // Select the main component wrapper
  let getCodeValue = document.querySelector("[px-star='component']");

  if (getCodeValue) {
    // Select elements inside the component
    let pxWrapper = getCodeValue.querySelector('[px-star-wrapper]');
    let pxStarActive = getCodeValue.querySelector("[px-star='active']");
    let pxStarInActive = getCodeValue.querySelector("[px-star='inactive']");
    let pxStarHalf = getCodeValue.querySelector("[px-star='half']");

    // Retrieve the rating value from the div with id 'ratings-average'
    let averageRatingDiv = document.getElementById('ratings-average');
    let valueStar = averageRatingDiv.textContent.trim();
    let roundedValue = Math.floor(Number(valueStar)); // Get integer part
    let decimalPart = Number(valueStar) - roundedValue; // Get decimal part

    // Clear the pxWrapper before rendering new stars
    pxWrapper.innerHTML = '';

    // Render full stars (active and half)
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedValue) {
        // Clone the active star and append to the wrapper
        let cloneActive = pxStarActive.cloneNode(true);
        pxWrapper.appendChild(cloneActive);
      } else {
        // Handle half star rendering
        if (decimalPart > 0 && i === Math.ceil(roundedValue + 0.5)) {
          let cloneHalf = pxStarHalf.cloneNode(true);
          pxWrapper.appendChild(cloneHalf);
        } else {
          // Clone the inactive star and append to the wrapper
          let cloneInactive = pxStarInActive.cloneNode(true);
          pxWrapper.appendChild(cloneInactive);
        }
      }
    }
  } else {
    console.error('Component not found');
  }
});
