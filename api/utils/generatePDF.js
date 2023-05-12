module.exports = generatePDF = async (invoice_id) => {
  require("dotenv").config();
  const puppeteer = require("puppeteer");
  console.log("website_url : ");

  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Website URL to export as pdf
  const website_url = `${process.env.CLIENT_URI_DEV}/send_invoice/${invoice_id}`;
  // "http://localhost:3000/send_invoice/6452abe085a9abf27d5fd499";
  // Open URL in current page
  console.log("website_url : ", website_url);
  await page.goto(website_url, { waitUntil: "networkidle0" });

  //To reflect CSS used for screens instead of print
  await page.emulateMediaType("screen");

  // Downlaod the PDF
  const pdf = await page.pdf({
    path: `invoices/invoice_${invoice_id}.pdf`,
    margin: { top: "20px", right: "50px", bottom: "20px", left: "50px" },
    printBackground: true,
    format: "A4",
  });
  console.log("pdf : ", pdf);
  // Close the browser instance
  await browser.close();
};
