document.addEventListener("DOMContentLoaded", function() {
    const modal1 = document.querySelector('[fs-modal-element="modal"]');
    const modal2 = document.querySelector('[fs-modal-element="modal-2"]');
    const modal3 = document.querySelector('[fs-modal-element="modal-3"]');
    const close1 = document.querySelector('[fs-modal-element="close"]');
    const close2 = document.querySelector('[fs-modal-element="close-2"]');
    const close3 = document.querySelector('[fs-modal-element="close-3"]');
  
    // Function to open modals based on URL changes
    function openModalBasedOnURL() {
      const hash = window.location.hash;
      if (hash === "#request-demo") {
        modal1.style.display = "flex";
      } else if (hash === "#start-for-free") {
        modal2.style.display = "flex";
      } else if (hash === "#get-started") {
        modal2.style.display = "flex";
      } else if (hash === "#contact-form") {
        modal3.style.display = "flex";
      }
    }
  
    // Function to remove hash from URL
    function removeHashFromURL() {
      const urlWithoutHash = window.location.href.split("#")[0];
      history.replaceState({}, document.title, urlWithoutHash);
    }
  
    // Open modals when URL changes
    window.addEventListener("hashchange", function() {
      openModalBasedOnURL();
    });
  
    // Close modals when close buttons are clicked
    close1.addEventListener("click", function() {
      modal1.style.display = "none";
      removeHashFromURL();
    });
  
    close2.addEventListener("click", function() {
      modal2.style.display = "none";
      removeHashFromURL();
    });
  
    close3.addEventListener("click", function() {
      modal3.style.display = "none";
      removeHashFromURL();
    });
  
    // Initial check when DOM is loaded
    openModalBasedOnURL();
  });
  
