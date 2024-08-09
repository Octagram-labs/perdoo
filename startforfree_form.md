This JavaScript code adds functionality to handle a signup form submission, with key features including email validation, error handling, and an AJAX request to a server endpoint. Here’s a breakdown of the code:

### Key Functionalities:

1. **Environment Detection:**
   - The `getBaseUrl` function returns the base URL depending on whether the app is in a staging environment. Currently, it returns the same URL for both environments, which may need adjustment if different URLs are required.

2. **Form Submission Handling:**
   - The `handleSubmit` function is responsible for form validation, sending a POST request, and managing error messages.

3. **Email Validation:**
   - Email addresses are validated against a regular expression pattern, and checked against a blacklist fetched from an external JSON file.

4. **Error Messages:**
   - The code shows specific error messages if the email is invalid, blacklisted, or if the company size field is empty.

5. **AJAX Request:**
   - The form data is submitted via a POST request, with feedback provided based on the response from the server.

6. **Disable Multiple Submissions:**
   - A flag (`isSubmitting`) prevents multiple form submissions while a request is in progress.

7. **Dynamic Content Handling:**
   - Based on the server response, the code handles different scenarios, such as existing users, successful registration, and domain-related issues.
