// Please follow div structure -- attributes 

document.addEventListener('DOMContentLoaded', function() {
    // Select the main component wrapper
    let getCodeValue = document.querySelector("[px-star='component']");

    if (getCodeValue !== null) {
        // Select elements inside the component
        let pxWrapper = getCodeValue.querySelector("[px-star-wrapper]");
        let pxStarActive = getCodeValue.querySelector("[px-star='active']");
        let pxStarInActive = getCodeValue.querySelector("[px-star='inactive']");

        // Retrieve the value from the input and round it
        let valueStar = getCodeValue
            .querySelector("[px-star-input]")
            .getAttribute("px-star-input");
        let roundedValue = Math.round(Number(valueStar));

        // Clear the pxWrapper before rendering new stars
        pxWrapper.innerHTML = "";

        // Render active and inactive stars based on the rounded value
        for (let i = 1; i <= 5; i++) {
            if (i <= roundedValue) {
                // Clone the active star and append to the wrapper
                let cloneActive = pxStarActive.cloneNode(true);
                pxWrapper.appendChild(cloneActive);
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
