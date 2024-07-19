document.addEventListener('DOMContentLoaded', function () {
  // Function to append the Calendly URL to the links
  function appendCalendlyUrl() {
    const firstNameElement = document.querySelector('[name="demoFirstName"]');
    const lastNameElement = document.querySelector('[name="demoLastName"]');
    const emailElement = document.querySelector('[name="demoWorkEmail"]');
    const demoEmployeesElement = document.querySelector('[name="demoEmployees"]');
    
    const firstName = firstNameElement ? firstNameElement.value : '';
    const lastName = lastNameElement ? lastNameElement.value : '';
    const email = emailElement ? emailElement.value : '';
    const demoEmployees = demoEmployeesElement ? demoEmployeesElement.value : '';

    console.log(`First Name: ${firstName}`);
    console.log(`Last Name: ${lastName}`);
    console.log(`Email: ${email}`);
    console.log(`Demo Employees: ${demoEmployees}`);

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
