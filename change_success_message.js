document.addEventListener('DOMContentLoaded', function () {
  // Function to get the value of an input by name
  const getInputValueByName = (name) => {
    const element = document.querySelector(`[name="${name}"]`);
    return element ? element.value : '';
  };

  // Function to construct the Calendly URL
  const constructCalendlyUrl = () => {
    const email = getInputValueByName('signupemail');
    const companySize = getInputValueByName('signupcompanysize');

    return `https://calendly.com/perdoo/onboarding/?email=${encodeURIComponent(email)}&a1=${encodeURIComponent(companySize)}`;
  };

  // Function to update the href of the links
  const updateCalendlyLinks = () => {
    const calendlyUrl = constructCalendlyUrl();
    document.querySelectorAll('[calendly-link]').forEach(link => {
      link.href = calendlyUrl;
      console.log(`Appended URL to ${link.getAttribute('calendly-link')}: ${calendlyUrl}`);
    });
  };

  // Function to toggle the display of message divs based on the selected value
  const toggleMessage = (selectInputName) => {
    const selectInput = document.querySelector(`[name="${selectInputName}"]`);
    if (!selectInput) return;

    const selectedValue = selectInput.value;
    const successMessage1 = document.querySelector(`[success-message-1="${selectInputName}"]`);
    const successMessage2 = document.querySelector(`[success-message-2="${selectInputName}"]`);

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
    updateCalendlyLinks();
    toggleMessage(event.target.name);
  };

  // Adding event listeners to all relevant form inputs
  const formInputs = document.querySelectorAll('#signup-form input, #signup-form select, #requestDemoForm input, #requestDemoForm select');
  formInputs.forEach(input => {
    input.addEventListener('change', handleInputChange);
  });

  // Initial setup on page load
  formInputs.forEach(input => {
    toggleMessage(input.name);
  });

  updateCalendlyLinks();
});
