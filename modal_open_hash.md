This JavaScript code is designed to handle the opening and closing of modals based on URL hash changes. Here's how it works:

### Key Features:

1. **Modal Selection:**
   - The script selects different modals (`modal1`, `modal2`, `modal3`, `modal6`) and their respective close buttons (`close1`, `close2`, `close3`, `close6`) using `document.querySelector`.

2. **Opening Modals Based on URL Hash:**
   - The function `openModalBasedOnURL` checks the URL hash (e.g., `#request-demo`) and displays the corresponding modal by setting its `display` style to `flex`.

3. **Removing the Hash from URL:**
   - The `removeHashFromURL` function removes the hash from the URL using the `history.replaceState` method, which updates the URL without reloading the page.

4. **Handling Hash Changes:**
   - The script listens for `hashchange` events, which are triggered whenever the URL hash changes, and calls `openModalBasedOnURL` to display the appropriate modal.

5. **Closing Modals:**
   - When a close button is clicked, the corresponding modal is hidden by setting its `display` style to `none`, and the hash is removed from the URL by calling `removeHashFromURL`.

6. **Initial Check on Page Load:**
   - When the DOM is fully loaded, `openModalBasedOnURL` is called to ensure that the correct modal is displayed if the page is loaded with a hash in the URL.

### Example Scenario:
- If the user navigates to `example.com/#request-demo`, `modal1` will be displayed.
- If the user clicks the close button for `modal1`, the modal will close, and the hash (`#request-demo`) will be removed from the URL.
