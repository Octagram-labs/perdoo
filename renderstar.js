// Please follow div structure -- attributes 
document.addEventListener('DOMContentLoaded', function() {
    // Select the main component wrapper
    let getCodeValue = document.querySelector("[px-star='component']");

    if (getCodeValue !== null) {
        // Select elements inside the component
        let pxWrapper = getCodeValue.querySelector("[px-star-wrapper]");
        let pxStarActive = getCodeValue.querySelector("[px-star='active']");
        let pxStarInActive = getCodeValue.querySelector("[px-star='inactive']");
        let pxStarHalf = getCodeValue.querySelector("[px-star='half']");

        // Retrieve the value from the input
        let valueStar = getCodeValue.querySelector("[px-star-input]").getAttribute("px-star-input");
        let numericValue = Number(valueStar);
        let roundedValue = Math.floor(numericValue); // Whole number part
        let decimalPart = numericValue - roundedValue; // Decimal part

        // Clear the pxWrapper before rendering new stars
        pxWrapper.innerHTML = "";

        // Render active, half, and inactive stars based on the value
        for (let i = 1; i <= 5; i++) {
            if (i <= roundedValue) {
                // Clone the active star and append to the wrapper
                let cloneActive = pxStarActive.cloneNode(true);
                pxWrapper.appendChild(cloneActive);
            } else if (i === roundedValue + 1 && decimalPart >= 0.25 && decimalPart < 0.75) {
                // Clone the half star and append to the wrapper
                let cloneHalf = pxStarHalf.cloneNode(true);
                pxWrapper.appendChild(cloneHalf);
            } else {
                // Clone the inactive star and append to the wrapper
                let cloneInactive = pxStarInActive.cloneNode(true);
                pxWrapper.appendChild(cloneInactive);
            }
        }
    } else {
        // The error handling case could also be extended here
    }
});
