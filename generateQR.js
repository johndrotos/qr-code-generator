// Import required modules
const inquirer = require('inquirer');
const qr = require('qr-image');
const fs = require('fs-extra');

// Function to get URL input from the user
async function getUrlInput() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Enter a URL to generate a QR code:',
      validate: input => input.startsWith('http://') || input.startsWith('https://') ? true : 'Please enter a valid URL!'
    }
  ]);
  return answers.url;
}

// Function to generate QR code and save it
async function generateQRCode(url) {
  const qrCode = qr.image(url, { type: 'png' });
  const outputStream = fs.createWriteStream('qr-code.png');
  qrCode.pipe(outputStream);

  // Logging the URL to a text file
  await fs.appendFile('url-history.txt', `${url}\n`);
  console.log('QR Code generated and saved as "qr-code.png". URL saved to "url-history.txt".');
}

// Main function to run the program
async function main() {
  const url = await getUrlInput();
  await generateQRCode(url);
}

main(); // Execute the program
