
import { test, expect } from '@playwright/test';
const filePath = process.env.FILEPATH;

test('successful payment with wrong cvv', async ({ page }) => {
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
  await frame.type('#cvv', '999');
  await frame.type('#name', 'Test');
  
  //Initiating Payment:
  await frame.click('button'); 
  
  // Define a selector for the new iframe
  const newIframeSelector = 'iframe[name="tdsIframe"]';
  
  //Wait for the new iframe to appear and attach to it
  await page.waitForSelector(newIframeSelector, { state: 'attached' });
  const newIframeHandle = await page.$(newIframeSelector);

  // Switch to the new iframe context
  const newFrame = await newIframeHandle.contentFrame();

  // Wait for the "Succesful Authentication" button in the new iframe
  await newFrame.waitForSelector('button[onclick="success"]');
  
  // Click the "Succesful Authentication" button in the new iframe
  await newFrame.evaluate(() => {
    document.querySelector('button[onclick="success"]').click();
  });

  // Wait for the payment token to appear
  const pElementSelector = 'p';
  await page.waitForSelector(pElementSelector);
  const tokenHandle = await page.$(pElementSelector);
  const token = await tokenHandle.textContent();

  // Validate the token
  expect(token).toMatch(/^ctn_/);

  console.log('Payment Token:', token);

});