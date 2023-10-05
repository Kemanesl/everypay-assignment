// Failed payment initiation with 3DS
import { test, expect } from '@playwright/test';
const filePath = process.env.FILEPATH;

test('failed payment initiation with 3DS', async ({ page }) => {
    // Open the specified html
    // await page.goto(filePath);
    const cwd = process.cwd();
    // Construct the absolute path to EveryPay.html
    const absoluteFilePath = `${cwd}/EveryPay.html`;

    // Open the specified html
    await page.goto(`file://${absoluteFilePath}`);

    //Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/EveryPay QA assignment/);

    // Click on the "pay-form" div to open an iframe
    await page.click('#pay-form');

    // Wait for the 3DS iframe to appear
    const iframeHandle = await page.waitForSelector('iframe');

    // Switch to the context of the 3DS iframe
    const frame = await iframeHandle.contentFrame();

    // Entering Payment Information:
    await frame.type('#cardNumber', '4111111111111111');
    await frame.type('#expiryDate', '1223');
    await frame.type('#cvv', '123');
    await frame.type('#name', 'Test');

    //Initiating Payment:
    await frame.click('button');

    // Define a selector for the new iframe
    const newIframeSelector = 'iframe[name="tdsIframe"]';

    // Wait for the new iframe to appear and attach to it
    await page.waitForSelector(newIframeSelector, { state: 'attached' });
    const newIframeHandle = await page.$(newIframeSelector);

    // Switch to the context of the new iframe
    const newFrame = await newIframeHandle.contentFrame();

    // Wait for the "Fail Authentication" button in the new iframe
    await newFrame.waitForSelector('button[onclick="fail"]');

    // Click the "Fail Authentication" button in the new iframe
    await newFrame.evaluate(() => {
        document.querySelector('button[onclick="fail"]').click();
    });

    // Wait for the error message to appear
    const errorTextToSearch = 'There was an error processing the card details, please try again or try another card!';

    // Use page.evaluate to search for the error text
    const isTextFound = await page.evaluate((errorTextToSearch) => {
        // Use JavaScript to search for the text in the page
        const pageText = document.body.innerText; // Get all the text content of the page

        // Check if the error text is in the page
        return pageText.includes(errorTextToSearch);
    }, errorTextToSearch);

});
