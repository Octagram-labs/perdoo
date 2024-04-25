// Function to get base URL based on environment
function getBaseUrl() {
    // Check if the hostname contains 'staging'
    if (window.location.hostname.includes('staging')) {
        // Staging environment
        //return 'https://api-v2.perdoo.com';
        
        //Changed it to production for testing
        return 'https://eu.perdoo.com';
    } else {
        // Production environment
        return 'https://eu.perdoo.com';
    }
}

// Function to handle form submission
function handleSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Function to get cookie value by name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Get input values
    const emailInput = document.querySelector('input[name="signupemail"]');
    const email = emailInput.value.trim();
    const country = getCookie("country");
    const companySizeSelect = document.querySelector('select[name="signupcompanysize"]');
    const companySize = companySizeSelect.value.trim();

    // Get error message elements
    const emailErrorMessage = document.querySelector('[errorMessage="email"]');
    const companySizeErrorMessage = document.querySelector('[errorMessage="companysize"]');

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Blacklisted email domains
    const blacklistedEmails = "mozmail.com,engagedly.com,atlassian.com,gmail.com";
    const enteredEmail = emailInput.value.trim();
    const enteredDomain = enteredEmail.split('@')[1];       
    console.log("Entered Email:", enteredEmail);
    console.log("Entered Domain:", enteredDomain);
    
    // Add event listener to remove error message when input is focused
    emailInput.addEventListener('focus', function() {
        emailErrorMessage.style.display = 'none';
        emailInput.style.borderColor = ""; // Reset border color
    });

    companySizeSelect.addEventListener('focus', function() {
        companySizeErrorMessage.style.display = 'none';
        companySizeSelect.style.borderColor = ""; // Reset border color
    });

    // Add event listener to remove error message when input is clicked
    emailInput.addEventListener('click', function() {
        emailErrorMessage.style.display = 'none';
        emailInput.style.borderColor = ""; // Reset border color
    });

    companySizeSelect.addEventListener('click', function() {
        companySizeErrorMessage.style.display = 'none';
        companySizeSelect.style.borderColor = ""; // Reset border color
    });

    // Validate email
    if (!email) {
        // Email is empty
        emailErrorMessage.textContent = "Please enter a valid work email";
        emailErrorMessage.style.display = 'block';
        emailInput.style.borderColor = "#FF5A5C";
    } else if (!emailRegex.test(email)) {
        // Email is invalid
        emailErrorMessage.textContent = "Please enter a valid work email";
        emailErrorMessage.style.display = 'block';
        emailInput.style.borderColor = "#FF5A5C";
    } else if (blacklistedEmails.includes(enteredDomain)) {
        emailErrorMessage.textContent = "Please enter a valid work email";
        emailErrorMessage.style.display = 'block';
        emailInput.style.borderColor = "#FF5A5C";
    } else {
        // Email is valid, hide error message
        emailErrorMessage.style.display = 'none';
    }

    // Validate company size
    if (!companySize) {
        // Company size is empty
        companySizeErrorMessage.textContent = "Please select a company size.";
        companySizeErrorMessage.style.display = 'block';
        companySizeSelect.style.borderColor = "#FF5A5C";
    } else {
        // Company size is valid, hide error message
        companySizeErrorMessage.style.display = 'none';
    }

    // If there are no validation errors, proceed with the fetch request
    if (!emailErrorMessage.style.display || emailErrorMessage.style.display === 'none') {
        if (!companySizeErrorMessage.style.display || companySizeErrorMessage.style.display === 'none') {
            // Change button text to "Please wait..."
            const submitSignupButton = document.getElementById('submitSignupButton'); 
            submitSignupButton.textContent = 'Please wait...';
            
            // Construct query parameters
            const queryParams = new URLSearchParams({
                email: email,
                country: country,
                company_size: companySize
            });

            if (companySize === '1-10' || companySize === '11-50') {
                // Make POST request with query parameters
                fetch(`${getBaseUrl()}/hp-signup?${queryParams.toString()}`, {
                    method: 'POST'
                })
                .then(response => response.json())
                .then(data => {
                    // Handle response
                    const signupMessageGreen = document.querySelector('[signupMessage="green"]');
                    const signupMessageRed = document.querySelector('[signupMessage="red"]');
                    
                    if (data.data && data.data.msg) {
                        const errorMsg = data.data.msg.toLowerCase(); // Convert response to lowercase
                        switch (errorMsg) {
                            case 'no_business_domain':
                                emailErrorMessage.textContent = "Please enter a valid work email";
                                emailErrorMessage.style.display = 'block';
                                emailErrorMessage.style.display = 'block';
                                                    emailInput.style.borderColor = "#FF5A5C";
                                break;
                            case 'invalid_email_address':
                                emailErrorMessage.textContent = "Please enter a valid work email";
                                emailErrorMessage.style.display = 'block';
                                emailErrorMessage.style.display = 'block';
                                                    emailInput.style.borderColor = "#FF5A5C";
                                break;
                            case 'company_disabled':
                                signupMessageRed.textContent = "The company is disabled.";
                                signupMessageRed.style.display = 'block';
                                break;
                            case 'domain_claimed':
                                signupMessageRed.textContent = "This domain has been claimed by another organization, or your organization has reached its free user limit. Contact us at support@perdoo.com in case you need help.";
                                signupMessageRed.style.display = 'block';
                                break;
                            case 'email_signup_success':
                                signupMessageGreen.textContent = "Please check your email to complete your registration!";
                                signupMessageGreen.style.display = 'block';
                                // Hide the form content
                                const formContent = document.querySelector('[form-normal="signup-form"]');
                                if (formContent) {
                                    formContent.style.display = 'none';
                                }
                                // Display the success message
                                const successMessage = document.querySelector('[form-success="signup-form"]');
                                if (successMessage) {
                                    successMessage.style.display = 'block';
                                }
                                break;
                            case 'user_exists':
                                // Redirect user to the given URL
                                window.location.href = data.data.redirect_to;
                                break;
                            default:
                                // Handle other errors
                                break;
                        }
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    // Reset button text
                    submitSignupButton.textContent = 'Start for free'; 
                });
            } else {
                // Redirect user to Calendly link
                //window.location.href = 'https://calendly.com/perdoo/perdoo-demo';
                // Redirect to Calendly with email parameter
                const calendlyUrl = `https://calendly.com/perdoo/onboarding/?email=${encodeURIComponent(email)}&a1=${encodeURIComponent(companySize)}`;
                // Open Calendly URL in a new tab
                window.open(calendlyUrl, '_blank');
            }            
        }
    }
}

// Add event listener to the document to handle clicks on elements with data-name="signup-submit"
document.addEventListener('click', function(event) {
    if (event.target && event.target.matches('[data-name="signup-submit"]')) {
        // Click event happened on a div with data-name="signup-submit"
        console.log('Click event on div with data-name="signup-submit"');
        // Call the form submission function
        handleSubmit(event);
    }
});
