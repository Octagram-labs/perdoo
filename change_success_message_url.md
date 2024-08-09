## Overview

This script is designed to handle various form input interactions on a webpage, specifically for a signup and demo request form. It logs form data, dynamically constructs and updates Calendly URLs, and toggles the visibility of certain message elements based on user input.

The script operates upon the `DOMContentLoaded` event, ensuring all elements are available in the DOM before execution.

## Functions

### 1. `logInputValues()`
This function logs the current values of specific form inputs related to signup and demo requests.

- **Inputs Logged**:
  - Signup Email
  - Signup Company Size
  - Demo First Name
  - Demo Last Name
  - Demo Work Email
  - Demo Employees
- **Example Output**:
  ```
  Signup Email: user@example.com
  Signup Company Size: 51-500
  Demo First Name: John
  Demo Last Name: Doe
  Demo Work Email: john.doe@example.com
  Demo Employees: 250
  ```

### 2. `getInputValueByName(name)`
This function retrieves the value of a form input by its name attribute.

- **Parameters**:
  - `name` (String): The name attribute of the input element.
- **Returns**:
  - The value of the input if it exists, or an empty string if not.
- **Example**:
  - `getInputValueByName('signupemail')` might return `user@example.com`.

### 3. `constructCalendlyUrl()`
This function constructs a URL for Calendly based on the current values of `signupemail` and `signupcompanysize`.

- **Returns**:
  - A fully constructed Calendly URL with the encoded email and company size as query parameters.
- **Example**:
  - `https://calendly.com/perdoo/onboarding/?email=user%40example.com&a1=51-500`

### 4. `updateCalendlyLinks()`
This function updates the `href` attribute of all elements with the attribute `calendly-link` using the constructed Calendly URL.

- **Process**:
  - Retrieves the URL from `constructCalendlyUrl()`.
  - Loops through all elements with `calendly-link` and updates their `href` attribute.
- **Example**:
  - Sets the `href` of `<a calendly-link="true">` to `https://calendly.com/perdoo/onboarding/?email=user%40example.com&a1=51-500`.

### 5. `toggleMessage(selectInputName)`
This function toggles the visibility of message divs based on the selected value of a form input.

- **Parameters**:
  - `selectInputName` (String): The name attribute of the select input.
- **Process**:
  - Checks if the selected value falls within specific ranges (e.g., '51-500', '501-2500', '2501+').
  - Hides or shows message elements based on the value.
- **Example**:
  - If `signupcompanysize` is set to `51-500`, the function may hide one message div and show another.

### 6. `handleInputChange(event)`
This function handles input changes, logging values, updating Calendly links, and toggling message visibility.

- **Parameters**:
  - `event` (Event Object): The event object triggered by the input change.
- **Process**:
  - Logs input values.
  - Updates Calendly links.
  - Toggles message visibility based on the input's name.

### Event Listeners
- The script adds `input` event listeners to all relevant inputs within forms with the IDs `#signup-form` and `#requestDemoForm`.
- These listeners ensure real-time logging and updating of URLs and messages as users interact with the form.

### Initial Setup on Page Load
- On page load, the script performs the following:
  - Logs initial input values.
  - Updates all Calendly links.
  - Toggles message visibility based on initial input values.

## Usage
To integrate this script into your webpage:
1. Place it within a `<script>` tag at the bottom of your HTML or within a file linked at the end of the `body` section to ensure the DOM is fully loaded before execution.
2. Ensure that your form inputs have the correct `name` attributes as referenced in the script (e.g., `signupemail`, `signupcompanysize`).
3. Include `calendly-link` attributes on any `<a>` tags you wish to dynamically update with the constructed Calendly URL.
4. Ensure that message divs have attributes `success-message-1` and `success-message-2` matching the select input name they correspond to.
