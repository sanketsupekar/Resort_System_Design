const { LocalStorage } = require("node-localstorage");

// Specify the path where the data will be stored (like a file)
// You can change this path to your preferred location.
const otpExpairTime = 2; // 5 minute
const localStorage = new LocalStorage("../localStorage");
function setOtpWithExpiration(key, value, expirationMinutes = otpExpairTime) {
  const now = new Date();
  const expirationTime = now.getTime() + expirationMinutes * 60 * 1000; // Calculate expiration time in milliseconds
  const item = { value, expirationTime };
  localStorage.setItem(key, JSON.stringify(item));
}

function getOtp(key) {
  const itemString = localStorage.getItem(key);
  if (!itemString) {
    return null; // Item doesn't exist
  }

  const item = JSON.parse(itemString);
  const now = new Date();

  if (item.expirationTime && item.expirationTime < now.getTime()) {
    // Item has expired, remove it
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}
function randomOtpGenerate() {
  const min = 1000;
  const max = 9999;
  const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
 // console.log(randomInteger);
 return randomInteger;
}
module.exports = { getOtp, setOtpWithExpiration, randomOtpGenerate };
