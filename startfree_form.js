document.addEventListener('DOMContentLoaded', (event) => {
    const submitSignupButton = document.querySelector('[data-name="signup-submit"]');
    if (!submitSignupButton) {
        console.error('Submit button not found');
    } else {
        console.log('Submit button found:', submitSignupButton);
    }

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
        
        // Add 'disabled' class
        submitSignupButton.classList.add('disabled');
        submitSignupButton.setAttribute('data-disabled', 'true');
        console.log('Button classes after adding disabled:', submitSignupButton.classList);

        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }

        const emailInput = document.querySelector('input[name="signupemail"]');
        const email = emailInput.value.trim();
        const country = getCookie("country");
        const companySizeSelect = document.querySelector('select[name="signupcompanysize"]');
        const companySize = companySizeSelect.value.trim();

        const emailErrorMessage = document.querySelector('[errorMessage="email"]');
        const companySizeErrorMessage = document.querySelector('[errorMessage="companysize"]');

        function showEmailError() {
            emailErrorMessage.textContent = "Please enter a valid work email";
            emailErrorMessage.style.display = 'block';
            emailInput.style.borderColor = "#FF5A5C";
        }

        function hideEmailError() {
            emailErrorMessage.style.display = 'none';
            emailInput.style.borderColor = "";
        }

        function showCompanyError() {
            companySizeErrorMessage.textContent = "Please select a company size.";
            companySizeErrorMessage.style.display = 'block';
            companySizeSelect.style.borderColor = "#FF5A5C";
        }

        function hideCompanyError() {
            companySizeErrorMessage.style.display = 'none';
            companySizeSelect.style.borderColor = "";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        fetch('https://raw.githubusercontent.com/Octagram-labs/perdoo/main/blacklist_emails.json')
            .then(response => response.json())
            .then(data => {
                const blacklistedEmails = data;

                if (!email) {
                    showEmailError();
                } else if (!emailRegex.test(email)) {
                    showEmailError();
                } else if (blacklistedEmails.includes(email.split('@')[1])) {
                    showEmailError();
                } else {
                    hideEmailError();
                }

                if (!companySize) {
                    showCompanyError();
                } else {
                    hideCompanyError();
                }

                if (!emailErrorMessage.style.display || emailErrorMessage.style.display === 'none') {
                    if (!companySizeErrorMessage.style.display || companySizeErrorMessage.style.display === 'none') {
                        submitSignupButton.textContent = 'Please wait...';

                        const queryParams = new URLSearchParams({
                            email: email,
                            country: country,
                            company_size: companySize
                        });

                        function sendSignupRequest(){
                            fetch(`${getBaseUrl()}/hp-signup?${queryParams.toString()}`, {
                                method: 'POST'
                            })
                            .then(response => response.json())
                            .then(data => {
                                const signupMessageGreen = document.querySelector('[signupMessage="green"]');
                                const signupMessageRed = document.querySelector('[signupMessage="red"]');

                                if (data.data && data.data.msg) {
                                    const errorMsg = data.data.msg.toLowerCase();
                                    switch (errorMsg) {
                                        case 'no_business_domain':
                                            showEmailError();
                                            break;
                                        case 'invalid_email_address':
                                            showEmailError();
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
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching blacklist:', error);
            });
    }

    document.addEventListener('click', function(event) {
        const target = event.target;
        if (target && target.matches('[data-name="signup-submit"]')) {
            console.log('Click event on div with data-name="signup-submit"');
            handleSubmit(event);
        }
    });
});
