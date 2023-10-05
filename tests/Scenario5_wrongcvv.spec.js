
import { test, expect } from '@playwright/test';
const filePath = process.env.FILEPATH;

test('failed payment with wrong CVV', async ({ page }) => {
    // Open the specified html
    // await page.goto(filePath);
    const cwd = process.cwd();
    // Construct the absolute path to EveryPay.html
    const absoluteFilePath = `${cwd}/EveryPay.html`;

    // Open the specified html
    await page.goto(`file://${absoluteFilePath}`);

     //Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/EveryPay QA assignment/);

    // Click on the "pay-form" div to open the iframe
    await page.click('#pay-form');

    // Wait for the 3DS iframe to appear
    const iframeHandle = await page.waitForSelector('iframe');

    // Switch to the iframe context
    const frame = await iframeHandle.contentFrame();

    // Entering Payment Information:
    await frame.type('#cardNumber', '4111111111111111');
    await frame.type('#expiryDate', '1223');
    await frame.type('#cvv', '12'); // Wrong CVV
    await frame.type('#name', 'Test');
    await frame.click('body'); // Click somewhere not on the button

    // Wait for the error message to appear
    const errorMessageSelector = 'div > div[style="color: red; font-size: 14px; font-weight: 600;"]';
    await frame.waitForSelector(errorMessageSelector);

    // Get the error message text
    const errorHandle = await frame.$(errorMessageSelector);
    const errorMessage = await errorHandle.textContent();

    // Validate the error message
    expect(errorMessage).toBe('Your CVV code is invalid');
});
