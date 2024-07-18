document.addEventListener('DOMContentLoaded', function () {
  // Function to toggle the display of message divs based on the selected value
  function toggleMessage(selectInputName) {
    const selectInput = document.querySelector(`[name='${selectInputName}']`);
    if (!selectInput) return;

    const selectedValue = selectInput.value;
    const successMessage1 = document.querySelector(
      `[success-message-1='${selectInputName}']`,
    );
    const successMessage2 = document.querySelector(
      `[success-message-2='${selectInputName}']`,
    );

    if (
      selectedValue === '51-500' ||
      selectedValue === '501-2500' ||
      selectedValue === '2501+'
    ) {
      if (successMessage1) successMessage1.style.display = 'none';
      if (successMessage2) successMessage2.style.display = 'flex';
    } else {
      if (successMessage1) successMessage1.style.display = 'flex';
      if (successMessage2) successMessage2.style.display = 'none';
    }
  }

  // Function to handle redirection after form submission
  function observeFormSubmission(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const doneMessage = form.querySelector('.w-form-done');
    if (!doneMessage) return;

    // Observer to watch for changes in the display style of the done message
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === 'style' &&
          doneMessage.style.display === 'block'
        ) {
          setTimeout(() => {
            const firstName = document.querySelector(
              '[name="demoFirstName"]',
            ).value;
            const lastName = document.querySelector(
              '[name="demoLastName"]',
            ).value;
            const email = document.querySelector(
              '[name="demoWorkEmail"]',
            ).value;
            const demoEmployees = document.querySelector(
              '[name="demoEmployees"]',
            ).value;
            const calendlyUrl = `https://calendly.com/perdoo/onboarding/?email=${encodeURIComponent(
              email,
            )}&a1=${encodeURIComponent(
              demoEmployees,
            )}&first_name=${encodeURIComponent(
              firstName,
            )}&last_name=${encodeURIComponent(lastName)}`;

            // Append URL to links with specific attributes
            const salesEmployeesLink = document.querySelector('[calendly-link="salesEmployees"]');
            const signupCompanySizeLink = document.querySelector('[calendly-link="signupcompanysize"]');

            if (salesEmployeesLink) {
              salesEmployeesLink.href = calendlyUrl;
            }
            if (signupCompanySizeLink) {
              signupCompanySizeLink.href = calendlyUrl;
            }

            // Open the URL in a new tab
            window.open(calendlyUrl, '_blank');
          }, 2000);
        }
      });
    });

    observer.observe(doneMessage, {
      attributes: true,
      attributeFilter: ['style'],
    });
  }

  // Add event listeners to select inputs
  const selectInputs = document.querySelectorAll('select');
  selectInputs.forEach((selectInput) => {
    selectInput.addEventListener('change', function () {
      toggleMessage(this.name);
    });
  });

  // Initial toggle to set the correct display on page load
  selectInputs.forEach((selectInput) => {
    toggleMessage(selectInput.name);
  });

  // Observe form submission for demo and sales forms
  observeFormSubmission('requestDemoForm');
  observeFormSubmission('signup-form');
});
