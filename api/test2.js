export const generatePdf = async () => {
  const puppeteer = require("puppeteer");
  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Website URL to export as pdf
  const website_url =
    "http://localhost:3000/send_invoice/6452abe085a9abf27d5fd499";

  // Open URL in current page
  await page.goto(website_url, { waitUntil: "networkidle0" });

  //To reflect CSS used for screens instead of print
  await page.emulateMediaType("screen");

  // Downlaod the PDF
  const pdf = await page.pdf({
    path: "invoices/invoice_email.pdf",
    margin: { top: "20px", right: "50px", bottom: "20px", left: "50px" },
    printBackground: true,
    format: "A4",
  });

  // Close the browser instance
  await browser.close();
};
