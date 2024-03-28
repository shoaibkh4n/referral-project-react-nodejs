function generateRandomCode(length) {
  const letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyz1234567890!@#$%^&*";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    result += letters.charAt(randomIndex);
  }

  return result;
}

function generateRandom(name) {
  const randomLetters = generateRandomCode(5); // Generate 5 random letters

  return `${name}-${randomLetters}`;
}
module.exports = generateRandom;
