This code is for handling dynamic pricing calculations based on user input and currency selection. Here's a breakdown of how it works:

### Key Functionalities:

1. **Currency and Regime Selection:**
   - The code dynamically adjusts prices and calculations based on the selected currency (either Euros or Dollars) and the selected pricing regime (annual or quarterly). It also allows users to toggle between these options.

2. **Dynamic Updates:**
   - When a user changes the number of premium users, supreme users, or supreme views, the calculations are updated in real time. Similarly, when the currency or pricing regime is changed, all relevant elements are recalculated and updated on the page.

3. **Discount Calculations:**
   - Discounts are calculated based on the total monthly premium or supreme values. The discount percentage increases as the total value increases.

4. **ROI Calculations:**
   - The code calculates the Return on Investment (ROI) per year and the ROI multiple based on the selected currency and regime.

5. **Utility Functions:**
   - There are utility functions like `internationalUpToTwoDecimals` and `internationalZeroDecimal` to format numbers to two decimals or no decimals respectively, which ensures that the displayed values are consistent and user-friendly.

### Specific Components:

1. **Initial Setup:**
   - The code initializes variables for user inputs, currency selection, discount values, and retrieves DOM elements to update them later.

2. **Currency Toggle:**
   - The `checkCurrency` function toggles the currency between Dollars and Euros. When the currency is switched, the `roiLogicFinal` function is called to recalculate the values in the new currency.

3. **Pricing Regime Toggle:**
   - The pricing regime (annual or quarterly) can be toggled using the respective buttons. When a regime is selected, the `roiLogicFinal` function recalculates the values based on the selected regime.

4. **Real-Time Updates:**
   - The code listens for input events on user count fields (`inputUserOnly` and `inputViewOnly`) and updates the pricing dynamically as the user inputs change.

5. **Final Calculations:**
   - The `roiLogicFinal` function handles the core logic for calculating the final prices, discounts, ROI, and other related metrics. It determines the correct calculation path based on the current currency and regime selection.
