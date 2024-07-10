document.addEventListener('DOMContentLoaded', function () {
  // Store the initial text content
  const initialTexts = {};

  // Function to store initial texts
  function storeInitialTexts() {
    const elements = document.querySelectorAll('[success-message-input]');
    elements.forEach((element) => {
      const inputId = element.getAttribute('success-message-input');
      if (!initialTexts[inputId]) {
        initialTexts[inputId] = {};
      }
      initialTexts[inputId][element.tagName.toLowerCase()] =
        element.textContent;
    });
  }

  // Function to update message based on the selected value
  function updateMessage(selectInputId) {
    const selectInput = document.getElementById(selectInputId);
    if (!selectInput) return;

    const selectedValue = selectInput.value;
    const elements = document.querySelectorAll(
      `[success-message-input='${selectInputId}']`,
    );

    elements.forEach((element) => {
      const successMessageText = element.getAttribute('success-message-text');

      if (
        selectedValue === '51-500' ||
        selectedValue === '501-2500' ||
        selectedValue === '2501+'
      ) {
        if (successMessageText) {
          element.textContent = successMessageText;
        }
      } else {
        // Revert to initial text if the selected value doesn't match
        const initialText =
          initialTexts[selectInputId][element.tagName.toLowerCase()];
        if (initialText) {
          element.textContent = initialText;
        }
      }
    });
  }

  // Store initial texts on page load
  storeInitialTexts();

  // Add event listeners to select inputs
  const selectInputs = document.querySelectorAll('select');
  selectInputs.forEach((selectInput) => {
    selectInput.addEventListener('change', function () {
      updateMessage(this.id);
    });
  });
});
