$(document).ready(function() {
  fetch('https://raw.githubusercontent.com/Octagram-labs/perdoo/main/blacklist_emails.json')
        .then(response => response.json())
        .then(data => {
            // Blacklisted email domains
            const invalidDomains = data;
            // Add custom method to check for valid email domain
            $.validator.addMethod('validDomain', function(value, element) {
              const domainPart = value.split('@')[1];
              return $.inArray(domainPart, invalidDomains) === -1;
            }, 'Please enter a business email');
        
            // Initialize form validation
  $('#ebooksForm').validate({
    rules: {
      ebookFirstName: {
        required: true
      },
      ebookLastName: {
        required: true
      },
      ebookEmail: {
        required: true,
        email: true,
        validDomain: true
      },
      ebookCompanyName: {
        required: true
      },
      ebookEmployees: {
        required: true
      },
      ebookPosition: {
        required: true
      },
      ebookPrivacy: {
        required: true
      }
    },
    messages: {
      ebookFirstName: {
        required: 'First name is required'
      },
      ebookLastName: {
        required: 'Last name is required'
      },
      ebookEmail: {
        required: 'Email address is required',
        email: 'Please enter a valid email address'
      },
      ebookCompanyName: {
        required: 'Company name is required'
      },
      ebookEmployees: {
        required: 'Number of employees is required'
      },
      ebookPosition: {
        required: 'Position is required'
      },
      ebookPrivacy: {
        required: 'Please agree to the privacy policy'
      }
    },
    errorPlacement: function(error, element) {
      if (element.attr('name') === 'ebookPrivacy') {
        error.insertAfter(element.closest('[data-name="checkbox"]'));
      } else if (element.attr('name') === 'ebookPosition') {
        error.insertAfter(element);
      } else {
        // Check if element has data-name="checkbox" attribute
        const checkboxDiv = element.closest('[data-name="checkbox"]');
        if (checkboxDiv.length) {
          error.insertAfter(checkboxDiv);
        } else {
          error.insertAfter(element);
        }
      }
    },
    highlight: function(element, errorClass, validClass) {
      // Add error class to select element and set border color
      $(element).addClass('error-border');

      // Highlight checkbox if it has class 'error-checkbox'
      const checkboxDiv = $(element).closest('[data-name="checkbox"]');
      if (checkboxDiv.length) {
        checkboxDiv.addClass('error-checkbox');
      }
    },
    unhighlight: function(element, errorClass, validClass) {
      // Remove error class from select element
      $(element).removeClass('error-border');

      // Remove error class from checkbox
      const checkboxDiv = $(element).closest('[data-name="checkbox"]');
      if (checkboxDiv.length) {
        checkboxDiv.removeClass('error-checkbox');
      }
    },
  });

  $('#requestDemoForm').validate({
    rules: {
      demoFirstName: {
        required: true
      },
      demoLastName: {
        required: true
      },
      demoWorkEmail: {
        required: true,
        email: true,
        validDomain: true
      },
      demoCompanyName: {
        required: true
      },
      demoEmployees: {
        required: true
      },
      demoPosition: {
        required: true
      },
      demoPrivacy: {
        required: true
      }
    },
    messages: {
      demoFirstName: {
        required: 'First name is required'
      },
      demoLastName: {
        required: 'Last name is required'
      },
      demoWorkEmail: {
        required: 'Email address is required',
        email: 'Please enter a valid email address'
      },
      demoCompanyName: {
        required: 'Company name is required'
      },
      demoEmployees: {
        required: 'Number of employees is required'
      },
      demoPosition: {
        required: 'Position is required'
      },
      demoPrivacy: {
        required: 'Please agree to the privacy policy'
      }
    },
    errorPlacement: function(error, element) {
      if (element.attr('name') === 'demoPrivacy') {
        error.insertAfter(element.closest('[data-name="requestDemoCheckbox"]'));
      } else if (element.attr('name') === 'demoPosition') {
        error.insertAfter(element);
      } else {
        // Check if element has data-name="checkbox" attribute
        const checkboxDiv = element.closest('[data-name="requestDemoCheckbox"]');
        if (checkboxDiv.length) {
          error.insertAfter(checkboxDiv);
        } else {
          error.insertAfter(element);
        }
      }
    },
    highlight: function(element, errorClass, validClass) {
      // Add error class to select element and set border color
      $(element).addClass('error-border');

      // Highlight checkbox if it has class 'error-checkbox'
      const checkboxDiv = $(element).closest('[data-name="requestDemoCheckbox"]');
      if (checkboxDiv.length) {
        checkboxDiv.addClass('error-checkbox');
      }
    },
    unhighlight: function(element, errorClass, validClass) {
      // Remove error class from select element
      $(element).removeClass('error-border');

      // Remove error class from checkbox
      const checkboxDiv = $(element).closest('[data-name="requestDemoCheckbox"]');
      if (checkboxDiv.length) {
        checkboxDiv.removeClass('error-checkbox');
      }
    },
  });

  $('#salesForm').validate({
    rules: {
      salesFirstName: {
        required: true
      },
      salesLastName: {
        required: true
      },
      salesWorkEmail: {
        required: true,
        email: true,
      },
      salesCompanyName: {
        required: true
      },
      salesEmployees: {
        required: true
      },
      salesMessage: {
        required: true
      },
      salesPrivacy: {
        required: true
      }
    },
    messages: {
      salesFirstName: {
        required: 'First name is required'
      },
      salesLastName: {
        required: 'Last name is required'
      },
      salesWorkEmail: {
        required: 'Email address is required',
        email: 'Please enter a valid email address'
      },
      salesCompanyName: {
        required: 'Company name is required'
      },
      salesEmployees: {
        required: 'Number of employees is required'
      },
      salesMessage: {
        required: 'Message is required'
      },
      salesPrivacy: {
        required: 'Please agree to the privacy policy'
      }
    },
    errorPlacement: function(error, element) {
      if (element.attr('name') === 'salesPrivacy') {
        error.insertAfter(element.closest('[data-name="salesFormCheckbox"]'));
      } else if (element.attr('name') === 'salesMessage') {
        error.insertAfter(element);
      } else {
        // Check if element has data-name="checkbox" attribute
        const checkboxDiv = element.closest('[data-name="salesFormCheckbox"]');
        if (checkboxDiv.length) {
          error.insertAfter(checkboxDiv);
        } else {
          error.insertAfter(element);
        }
      }
    },
    highlight: function(element, errorClass, validClass) {
      // Add error class to select element and set border color
      $(element).addClass('error-border');

      // Highlight checkbox if it has class 'error-checkbox'
      const checkboxDiv = $(element).closest('[data-name="salesFormCheckbox"]');
      if (checkboxDiv.length) {
        checkboxDiv.addClass('error-checkbox');
      }
    },
    unhighlight: function(element, errorClass, validClass) {
      // Remove error class from select element
      $(element).removeClass('error-border');

      // Remove error class from checkbox
      const checkboxDiv = $(element).closest('[data-name="salesFormCheckbox"]');
      if (checkboxDiv.length) {
        checkboxDiv.removeClass('error-checkbox');
      }
    },
  });

  $('#securityForm').validate({
    rules: {
      securityFirstName: {
        required: true
      },
      securityLastName: {
        required: true
      },
      securityWorkEmail: {
        required: true,
        email: true,
        validDomain: true
      },
      securityCompanyName: {
        required: true
      },
      securityEmployees: {
        required: true
      },
      securityMessage: {
        required: true
      },
      securityPrivacy: {
        required: true
      }
    },
    messages: {
      securityFirstName: {
        required: 'First name is required'
      },
      securityLastName: {
        required: 'Last name is required'
      },
      securityWorkEmail: {
        required: 'Email address is required',
        email: 'Please enter a valid email address'
      },
      securityCompanyName: {
        required: 'Company name is required'
      },
      securityEmployees: {
        required: 'Number of employees is required'
      },
      securityMessage: {
        required: 'Message is required'
      },
      securityPrivacy: {
        required: 'Please agree to the privacy policy'
      }
    },
    errorPlacement: function(error, element) {
      if (element.attr('name') === 'securityPrivacy') {
        error.insertAfter(element.closest('[data-name="securityFormCheckbox"]'));
      } else if (element.attr('name') === 'securityMessage') {
        error.insertAfter(element);
      } else {
        // Check if element has data-name="checkbox" attribute
        const checkboxDiv = element.closest('[data-name="securityFormCheckbox"]');
        if (checkboxDiv.length) {
          error.insertAfter(checkboxDiv);
        } else {
          error.insertAfter(element);
        }
      }
    },
    highlight: function(element, errorClass, validClass) {
      // Add error class to select element and set border color
      $(element).addClass('error-border');

      // Highlight checkbox if it has class 'error-checkbox'
      const checkboxDiv = $(element).closest('[data-name="securityFormCheckbox"]');
      if (checkboxDiv.length) {
        checkboxDiv.addClass('error-checkbox');
      }
    },
    unhighlight: function(element, errorClass, validClass) {
      // Remove error class from select element
      $(element).removeClass('error-border');

      // Remove error class from checkbox
      const checkboxDiv = $(element).closest('[data-name="securityFormCheckbox"]');
      if (checkboxDiv.length) {
        checkboxDiv.removeClass('error-checkbox');
      }
    },
  });
        
        })
        .catch(error => {
            console.error('Error fetching blacklisted emails:', error);
        });
});
