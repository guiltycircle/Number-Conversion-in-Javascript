const input = document.getElementById('input-number');
const currentBase = document.getElementById('options');
const output = document.getElementById('output-section');
const buttonSection = document.getElementById('button-section');

// Determine the current base
let thisBase;

function determineCurrentBase(base) {
  switch (base) {
    case 'decimal':
      thisBase = 10;
      break;
    case 'binary':
      thisBase = 2;
      break;
    case 'octal':
      thisBase = 8;
      break;
    case 'hexadecimal':
      thisBase = 16;
      break;
    default:
      output.textContent = "Invalid base selection. Please choose decimal, binary, octal, or hexadecimal.";
      return; // Exit function on invalid base selection
  }
}

// Function to handle validation and conversion
function convertNumber(base, num, targetBase) {
  // Input validation
  const isValidInput = validateInput(num, base);
  if (!isValidInput) {
    return; // Exit function if input is invalid
  }

  const parsedNum = parseInt(num, base); //The function parseInt() is used to convert a string (num) into an integer based on the given base.
  let convertedValue;//This line declares a variable convertedValue without assigning any value to it yet. The keyword let allows convertedValue to be mutable (meaning its value can be changed later in the code). This variable will likely be used later to store the result of some conversion process.

  switch (targetBase) {
    case 'decimal':
      convertedValue = convertToDecimal(parsedNum);
      break;
    case 'binary':
      convertedValue = convertToBinary(parsedNum);
      break;
    case 'octal':
      convertedValue = convertToOctal(parsedNum);
      break;
    case 'hexadecimal':
      convertedValue = convertToHexadecimal(parsedNum);
      break;
    default:
      console.error('Unsupported target base: ${targetBase}');
      return; // Handle unsupported base
  }

  output.textContent = convertedValue;
}

// Function to validate input based on current base
function validateInput(num, base) {
  // Check for empty input
  //num is the function containing the string or simply the numerical value
  //trim deletes all whitespaces such as space tabs and newline
  //=== checks if the trimmed string is empty ... if true then user did not enter a number
  //output is a reference to a HTML elemnt probably div where messages or results are displayed
  //textContent is a property that sets the text inside the HTML element
  
  if (num.trim() === '') {
    output.textContent = "Please enter a number to convert.";
    return false;
  }
  //char.touppercase()) ensures that the check is case insensitive
  //validChars.includes(char.toUpperCase()) checks whether the character exists ...those like a to f in hexadecimals that need to be converted to uppercase
  //
  // Check for invalid characters based on current base
  const validChars = base === 10 ? '0123456789' : (base === 8 ? '01234567' : (base === 16 ? '0123456789ABCDEF' : '01'));
  for (let char of num) {
    if (!validChars.includes(char.toUpperCase())) {
      output.textContent = "Invalid number or base";
      return false;
    }
  }

  return true; // Input is valid
}

// Function to convert to decimal (from any base)
function convertToDecimal(num, thisBase) {
  return parseInt(num, thisBase);
}

// Function to convert to binary (from decimal)
function convertToBinary(num) {
  return num.toString(2);
}

// Function to convert to octal (from decimal)
function convertToOctal(num) {
  return num.toString(8);
}

// Function to convert to octal (from decimal)
function convertToHexadecimal(num) {
  return num.toString(16).toUpperCase();
}

// Event listener for button click
buttonSection.addEventListener('click', (event) => {
  const clickedButton = event.target;

  if (clickedButton.classList.contains('input-btn')) {
    const buttonId = clickedButton.id;
    const inputValue = input.value;

    // Determine the target base based on the button ID
    let targetBase;
    switch (buttonId) {
      case 'decimal':
        targetBase = 'decimal';
        break;
      case 'binary':
        targetBase = 'binary';
        break;
      case 'octal':
        targetBase = 'octal';
        break;
      case 'hexadecimal':
        targetBase = 'hexadecimal';
        break;
      default:
        console.error('Unsupported button , {buttonId}');
        return;
    }

    determineCurrentBase(currentBase.value);
    convertNumber(thisBase, inputValue, targetBase);
  }
});