document.addEventListener('DOMContentLoaded', function () {
  // Function to log the current values of all relevant inputs
  const logInputValues = () => {
    const signupEmail = document.querySelector('[name="signupemail"]');
    const signupCompanySize = document.querySelector(
      '[name="signupcompanysize"]',
    );
    const demoFirstName = document.querySelector('[name="demoFirstName"]');
    const demoLastName = document.querySelector('[name="demoLastName"]');
    const demoWorkEmail = document.querySelector('[name="demoWorkEmail"]');
    const demoEmployees = document.querySelector('[name="demoEmployees"]');

    console.log(`Signup Email: ${signupEmail ? signupEmail.value : 'N/A'}`);
    console.log(
      `Signup Company Size: ${
        signupCompanySize ? signupCompanySize.value : 'N/A'
      }`,
    );
    console.log(
      `Demo First Name: ${demoFirstName ? demoFirstName.value : 'N/A'}`,
    );
    console.log(`Demo Last Name: ${demoLastName ? demoLastName.value : 'N/A'}`);
    console.log(
      `Demo Work Email: ${demoWorkEmail ? demoWorkEmail.value : 'N/A'}`,
    );
    console.log(
      `Demo Employees: ${demoEmployees ? demoEmployees.value : 'N/A'}`,
    );
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    logInputValues();
  };

  // Adding event listeners to all relevant form inputs
  const formInputs = document.querySelectorAll(
    '#signup-form input, #signup-form select, #requestDemoForm input, #requestDemoForm select',
  );
  formInputs.forEach((input) => {
    input.addEventListener('input', handleInputChange); // Use 'input' event for real-time logging
    console.log(`Added input event listener to ${input.name}`);
  });

  // Initial log on page load
  logInputValues();
});
document.addEventListener('DOMContentLoaded', function () {
  // Function to get the value of an input by name
  const getInputValueByName = (name) => {
    const element = document.querySelector(`[name="${name}"]`);
    console.log(
      `getInputValueByName - name: ${name}, element: ${element}, value: ${
        element ? element.value : 'N/A'
      }`,
    );
    return element ? element.value : '';
  };

  // Function to construct the Calendly URL
  const constructCalendlyUrl = () => {
    const email = getInputValueByName('signupemail');
    const companySize = getInputValueByName('signupcompanysize');

    const url = `https://calendly.com/perdoo/onboarding/?email=${encodeURIComponent(
      email,
    )}&a1=${encodeURIComponent(companySize)}`;
    console.log(`Constructed URL: ${url}`);
    return url;
  };

  // Function to update the href of the links
  const updateCalendlyLinks = () => {
    const calendlyUrl = constructCalendlyUrl();
    document.querySelectorAll('[calendly-link]').forEach((link) => {
      link.href = calendlyUrl;
      console.log(
        `Appended URL to ${link.getAttribute('calendly-link')}: ${calendlyUrl}`,
      );
    });
  };

  // Function to toggle the display of message divs based on the selected value
  const toggleMessage = (selectInputName) => {
    const selectInput = document.querySelector(`[name="${selectInputName}"]`);
    if (!selectInput) return;

    const selectedValue = selectInput.value;
    const successMessage1 = document.querySelector(
      `[success-message-1="${selectInputName}"]`,
    );
    const successMessage2 = document.querySelector(
      `[success-message-2="${selectInputName}"]`,
    );

    console.log(
      `Toggle Message - selectInputName: ${selectInputName}, selectedValue: ${selectedValue}`,
    );

    if (['51-500', '501-2500', '2501+'].includes(selectedValue)) {
      if (successMessage1) successMessage1.style.display = 'none';
      if (successMessage2) successMessage2.style.display = 'flex';
    } else {
      if (successMessage1) successMessage1.style.display = 'flex';
      if (successMessage2) successMessage2.style.display = 'none';
    }
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    const email = getInputValueByName('signupemail');
    const companySize = getInputValueByName('signupcompanysize');

    console.log(
      `Input Changed - Email: ${email}, Company Size: ${companySize}`,
    );

    updateCalendlyLinks();
    toggleMessage(event.target.name);
  };

  // Adding event listeners to all relevant form inputs
  const formInputs = document.querySelectorAll(
    '#signup-form input, #signup-form select, #requestDemoForm input, #requestDemoForm select',
  );
  formInputs.forEach((input) => {
    input.addEventListener('input', handleInputChange); // Use 'input' event for real-time logging
    console.log(`Added input event listener to ${input.name}`);
  });

  // Initial setup on page load
  formInputs.forEach((input) => {
    toggleMessage(input.name);
  });

  updateCalendlyLinks();
});
