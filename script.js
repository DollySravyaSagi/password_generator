function generatePassword() {
  let length = parseInt(document.getElementById("length").value);
  let useNumbers = document.getElementById("numbers").checked;
  let useSymbols = document.getElementById("symbols").checked;
  if (!length || length < 4) {
    alert("Please enter length ≥ 4");
    return;
  }
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (useNumbers) chars += "0123456789";
  if (useSymbols) chars += "!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  document.getElementById("password").value = password;
  checkStrength(password);
}

function checkStrength(password) {
  let strengthText = document.getElementById("strength");
  let hasUpper = /[A-Z]/.test(password);
  let hasNumber = /[0-9]/.test(password);
  let hasSymbol = /[^A-Za-z0-9]/.test(password);
  let score = 0;
  if (password.length >= 8) score++;
  if (hasUpper) score++;
  if (hasNumber) score++;
  if (hasSymbol) score++;
  strengthText.className = "strength";
  if (score <= 2) {
    strengthText.innerText = "Weak";
    strengthText.classList.add("weak");
  } else if (score === 3) {
    strengthText.innerText = "Medium";
    strengthText.classList.add("medium");
  } else {
    strengthText.innerText = "Strong";
    strengthText.classList.add("strong");
  }
}

function copyPassword() {
  let password = document.getElementById("password").value;
  if (!password) {
    alert("Generate a password first!");
    return;
  }
  navigator.clipboard.writeText(password)
    .then(() => alert("Copied to clipboard!"))
    .catch(() => alert("Copy failed"));
}