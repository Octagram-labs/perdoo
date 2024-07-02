document.addEventListener('DOMContentLoaded', (event) => {
    const submitSignupButton = document.getElementById('submitSignupButton');
    if (!submitSignupButton) {
        console.error('Submit button not found');
        return;
    }

    console.log('Submit button found:', submitSignupButton);

    submitSignupButton.addEventListener('click', (event) => {
        if (!submitSignupButton.classList.contains('disabled')) {
            console.log('Submit button clicked');
            handleSubmit(event);
        }
    });

    // Function to get base URL based on environment
    function getBaseUrl() {
        if (window.location.hostname.includes('staging')) {
            return 'https://eu.perdoo.com'; // Changed for testing
        } else {
            return 'https://eu.perdoo.com';
        }
    }

    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault();
        console.log('Handling form submission');

        // Function to get cookie value by name
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }

        const emailInput = document.getElementById('signupemail');
        const companySizeSelect = document.getElementById('signupcompanysize-5');

        if (!emailInput || !companySizeSelect) {
            console.error('Form inputs not found');
            return;
        }

        const email = emailInput.value.trim();
        const country = getCookie("country");
        const companySize = companySizeSelect.value.trim();

        const emailErrorMessage = document.querySelector('[errormessage="email"]');
        const companySizeErrorMessage = document.querySelector('[errormessage="companysize"]');

        function showEmailError(message) {
            emailErrorMessage.textContent = message;
            emailErrorMessage.style.display = 'block';
            emailInput.style.borderColor = "#FF5A5C";
        }

        function hideEmailError() {
            emailErrorMessage.style.display = 'none';
            emailInput.style.borderColor = "";
        }

        function showCompanyError(message) {
            companySizeErrorMessage.textContent = message;
            companySizeErrorMessage.style.display = 'block';
            companySizeSelect.style.borderColor = "#FF5A5C";
        }

        function hideCompanyError() {
            companySizeErrorMessage.style.display = 'none';
            companySizeSelect.style.borderColor = "";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        fetch('https://raw.githubusercontent.com/Octagram-labs/perdoo/main/blacklist_emails.json')
            .then(response => {
                console.log('Fetched blacklist emails');
                return response.json();
            })
            .then(data => {
                const blacklistedEmails = data;
                console.log('Blacklist emails:', blacklistedEmails);

                let valid = true;

                if (!email) {
                    showEmailError("Please enter a valid work email");
                    valid = false;
                } else if (!emailRegex.test(email)) {
                    showEmailError("Please enter a valid work email");
                    valid = false;
                } else if (blacklistedEmails.includes(email.split('@')[1])) {
                    showEmailError("Please enter a valid work email");
                    valid = false;
                } else {
                    hideEmailError();
                }

                if (!companySize) {
                    showCompanyError("Please select a company size.");
                    valid = false;
                } else {
                    hideCompanyError();
                }

                if (valid) {
                    console.log('Form is valid, proceeding with submission');
                    submitSignupButton.textContent = 'Please wait...';
                    submitSignupButton.classList.add('disabled');
                    submitSignupButton.setAttribute('data-disabled', 'true');

                    const queryParams = new URLSearchParams({
                        email: email,
                        country: country,
                        company_size: companySize
                    });

                    function sendSignupRequest() {
                        console.log('Sending signup request');
                        fetch(`${getBaseUrl()}/hp-signup?${queryParams.toString()}`, {
                            method: 'POST'
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log('Signup request response:', data);
                                const signupMessageGreen = document.querySelector('[signupmessage="green"]');
                                const signupMessageRed = document.querySelector('[signupmessage="red"]');

                                if (data.data && data.data.msg) {
                                    const errorMsg = data.data.msg.toLowerCase();
                                    switch (errorMsg) {
                                        case 'no_business_domain':
                                            showEmailError("Please enter a valid work email");
                                            break;
                                        case 'invalid_email_address':
                                            showEmailError("Please enter a valid work email");
                                            break;
                                        case 'company_disabled':
                                            signupMessageRed.textContent = `The account for ${email} has been disabled. Contact us at support@perdoo.com in case you need help.`;
                                            signupMessageRed.style.display = 'block';
                                            break;
                                        case 'domain_claimed':
                                            signupMessageRed.textContent = "This domain has been claimed by another organization, or your organization has reached its free user limit. Contact us at support@perdoo.com in case you need help.";
                                            signupMessageRed.style.display = 'block';
                                            break;
                                        case 'email_signup_success':
                                            signupMessageGreen.textContent = "Please check your email to complete your registration!";
                                            signupMessageGreen.style.display = 'block';
                                            document.getElementById("signupFormSubmit").click();
                                            const formContent = document.querySelector('[form-normal="signup-form"]');
                                            if (formContent) {
                                                formContent.style.display = 'none';
                                            }
                                            const successMessage = document.querySelector('[form-success="signup-form"]');
                                            if (successMessage) {
                                                successMessage.style.display = 'block';
                                            }
                                            dataLayer.push({
                                                'event': 'formSubmit',
                                                'formId': event.target.id,
                                            });
                                            break;
                                        case 'user_exists':
                                            window.location.href = data.data.redirect_to;
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            })
                            .finally(() => {
                                submitSignupButton.textContent = 'Start for free';
                                submitSignupButton.classList.remove('disabled');
                                submitSignupButton.removeAttribute('data-disabled');
                            });
                    }

                    if (companySize === '1-10' || companySize === '11-50') {
                        sendSignupRequest();
                    } else if (companySize === '51-500' || companySize === '501-2500' || companySize === '2501+') {
                        sendSignupRequest();
                        setTimeout(() => {
                            const calendlyUrl = `https://calendly.com/perdoo/onboarding/?email=${encodeURIComponent(email)}&a1=${encodeURIComponent(companySize)}`;
                            window.open(calendlyUrl, '_blank');
                        }, 3000);
                    }
                } else {
                    console.log('Form validation failed');
                }
            })
            .catch(error => {
                console.error('Error fetching blacklist:', error);
            });
    }
});
