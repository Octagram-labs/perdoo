document.addEventListener('DOMContentLoaded', function () {
  // Function to append the Calendly URL to the links
  function appendCalendlyUrl() {
    const firstName = document.querySelector('[name="demoFirstName"]')?.value || '';
    const lastName = document.querySelector('[name="demoLastName"]')?.value || '';
    const email = document.querySelector('[name="demoWorkEmail"]')?.value || '';
    const demoEmployees = document.querySelector('[name="demoEmployees"]')?.value || '';
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
      console.log(`Appended URL to salesEmployeesLink: ${calendlyUrl}`);
    } else {
      console.error('SalesEmployees link not found.');
    }

    if (signupCompanySizeLink) {
      signupCompanySizeLink.href = calendlyUrl;
      console.log(`Appended URL to signupCompanySizeLink: ${calendlyUrl}`);
    } else {
      console.error('SignupCompanySize link not found.');
    }
  }

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

  // Add event listeners to all form inputs
  const formInputs = document.querySelectorAll('#requestDemoForm input, #requestDemoForm select, #signup-form input, #signup-form select');
  formInputs.forEach((input) => {
    input.addEventListener('change', function () {
      appendCalendlyUrl();
      toggleMessage(this.name);
    });
  });

  // Initial toggle to set the correct display on page load
  formInputs.forEach((input) => {
    toggleMessage(input.name);
  });

  // Append URL on page load for the first time
  appendCalendlyUrl();
});
