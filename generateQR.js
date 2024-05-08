import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs-extra';

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

async function generateQRCode(url) {
  const qrCode = qr.image(url, { type: 'png' });
  const outputStream = fs.createWriteStream('qr-code.png');
  qrCode.pipe(outputStream);

  await fs.appendFile('url-history.txt', `${url}\n`);
  console.log('QR Code generated and saved as "qr-code.png". URL saved to "url-history.txt".');
}

async function main() {
  const url = await getUrlInput();
  await generateQRCode(url);
}

main();
