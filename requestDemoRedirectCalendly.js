document.addEventListener("DOMContentLoaded", function() {
    // Select the form
    var form = document.getElementById("requestDemoForm");

    // Add event listener for form submission
    form.addEventListener("submit", function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get the value of demoEmployees input
        var numEmployees = form.elements["demoEmployees"].value;

        // Check the condition for demoEmployees
        if (numEmployees !== '1-10' && numEmployees !== '11-50') {
            // If condition is not met, construct the Calendly URL with form input values
            var firstName = encodeURIComponent(form.elements["demoFirstName"].value);
            var lastName = encodeURIComponent(form.elements["demoLastName"].value);
            var email = encodeURIComponent(form.elements["demoWorkEmail"].value);
            var calendlyURL = "https://calendly.com/perdoo/perdoo-demo/?first_name=" + firstName + "&last_name=" + lastName + "&email=" + email;

            // Open Calendly URL in a new tab            
            setTimeout(() => {
                window.open(calendlyURL, '_blank');
            }, 2000); // Delay of 2 seconds (adjust as needed)


        } else {
            // If condition is met, submit the form normally
            form.submit();
        }
    });
});