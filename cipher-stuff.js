const encryptionMap = new Map();
const advEncryptionMap = new Map();
const advDecryptionMap = new Map();

var input;

generateHashMaps();

/**
 * A method to encrypt and print given user inputs
 * 
 * @param {boolean} advanced A parameter representing whether the encryption is advanced
 */
function encrypt(advanced) {
    var originalMessage;
    var encrypted = "";
    //set html locations to blank
    blankHTML();
    //taking in message
    originalMessage = prompt("Enter your message that you want to encrypt: ", "Hello World");
    //make sure the message is good
    userInputCheck(originalMessage, "Encrypting");
    //if message is null set it to blank instead
    if (originalMessage == null) {
        originalMessage = "";
    }
    originalMessage = removeSpaces(originalMessage);
    originalMessage = originalMessage.toUpperCase();
    //loop through every character in the message
    for (var i = 0; i < originalMessage.length; i++) {
        //Get current charecter
        var currentChar = originalMessage.charAt(i);
        //add encripted char to encrypted
        encrypted += encryptionMap.get(currentChar) + " ";
    }
    //delay to make more belevable
    outputDelay(encrypted, false);

    //if it's an advanced encryption
    if (advanced) {
        //take the basic encryption and make it a full baconian encyption
        encryptAdvanced(encrypted);
    }
}

/**
 * A method to decrypt a given user input
 */
function decrypt() {
    var encryptedMessage;
    var decrypted = "";
    var numCharactersToDecode;
    var isMultipleOfFive;

    //set html locations to blacnk
    blankHTML();
    //take in message
    encryptedMessage = prompt("Enter your message that you want to decrypt: ", "aabbb aabaa ababa ababa abbab babaa abbab baaaa ababa aaabb");
    //make sure message is good
    userInputCheck(encryptedMessage, "Decrypting");
    //if message is null set it to blank instead
    if (encryptedMessage == null) {
        encryptedMessage = "";
    }
    //remove spaces from message
    encryptedMessage = removeSpaces(encryptedMessage);
    //find number of binary sets of 5 there are to decode
    numCharactersToDecode = encryptedMessage.length / 5
    //check if the number is a whole integer
    isMultipleOfFive = Number.isInteger(numCharactersToDecode);
    //if it is then decrypt
    if ((isMultipleOfFive == true) && (numCharactersToDecode > 0)) {
        encryptedMessage = encryptedMessage.toLowerCase();
        //loop for the number of characters to decode total spliting the message into character sets of 5
        for (var i = 0; i < numCharactersToDecode; i++) {
            var tempCharacters = encryptedMessage.slice((i * 5), ((i * 5) + 5));
            //add decrypted char to decrypted
            if ((encryptionMap.get(tempCharacters) == "I") || (encryptionMap.get(tempCharacters) == "J")) {
                decrypted += " I or J ";
            }
            else if ((encryptionMap.get(tempCharacters) == "U") || (encryptionMap.get(tempCharacters) == "V")) {
                decrypted += " U or V ";
            }
            else {
                decrypted += encryptionMap.get(tempCharacters);
            }
        }
    }
    //delay to make more belevable
    outputDelay(decrypted, false);
}

/**
 * A function using a user input cypher the encrypted message to lower or upper case letters 
 * representing a and b. 
 * 
 * @param {string} encrypted The encrypted message to be cyphered
 */
function encryptAdvanced(encrypted) {
    var validEnciption = false;
    var numCharactersToEncode;
    var isMultipleOfFive;
    var advEncryptInput = "";
    var splitAdvEncryptInput;
    var advEncryptInputTesting;
    var splitEncryptedChar;
    var splitEncryptedInput = "";
    var advEncryptionOutput = "";
    var tries = 0;

    //remove all spaces from the encrypted message
    encrypted = removeSpaces(encrypted);
    //split all the characters from the encryption into an array
    splitEncryptedChar = encrypted.match(/.{1,5}/g);

    //if the entered cypher for the encyption isn't valid and the user has tried 5 or less attempts
    while (!validEnciption && (tries < 5)) {
        //get the user input
        advEncryptInput = prompt("Enter your " + encrypted.length + " character sentence that you want to encrypt your encryption to (try " + (tries + 1) + " of 5): ", "");

        //if the user canclled the prompt
        if (advEncryptInput == null) {
            input = "User cancelled the prompt.";
            printHTML("advInput", "");
            alert("Error: " + input);
            tries = 5;
        } 
        //if the user gave no input
        else if (advEncryptInput == "") {
            input = "User gave no input.";
            printHTML("advInput", "");
            alert("Error: " + input);
        } 
        //if the user gave an input, varify it is good
        else {
            //set char to lower case and remove spaces
            advEncryptInput = advEncryptInput.toLowerCase();
            advEncryptInputTesting = removeSpaces(advEncryptInput);

            //find number of binary sets of 5 there are to encode
            numCharactersToEncode = (advEncryptInputTesting.length) / 5;

            //check if the number is a whole integer
            isMultipleOfFive = Number.isInteger(numCharactersToEncode);

            //if input is not not a multiple of  then the
            if (!isMultipleOfFive) {
                alert("Error: Sentence must be a mutiple of 5 in length");
            }
            //if the input is a multiple of 5
            else {
                //split the input into it's characted sets
                splitEncryptedInput = advEncryptInputTesting.match(/.{1,5}/g);
                //if the message doesn't have the same number of characters as the encrypted message
                if ((splitEncryptedChar.length) != (splitEncryptedInput.length)) {
                    input = "Error: Sentence must be same length as basic encryption";
                    alert(input);
                    consolePrint(input);
                } else {
                    validEnciption = true;
                    printHTML("advInput", "Cipher Message: " + encrypted);
                    printHTML("working", "Advanced Encryption with a Bacon Cipher. . .");
                }
            }
        }
        tries++;
    }
    //if the input was never valid
    if (!validEnciption) {
        printHTML("advOutput", "User input was never valid");
    }
    else {
        //set the user input to lower case and split each character into it's own array location
        advEncryptInput = advEncryptInput.toLowerCase();
        splitAdvEncryptInput = advEncryptInput.toString().match(/.{1,1}/g);
        //for each character in the encrypted message, cypher it with the user input
        for (var i = 0; i < splitAdvEncryptInput.length; i++) {
            consolePrint(splitEncryptedChar[i] + " = " + splitAdvEncryptInput[i]);
            if (splitAdvEncryptInput[i] != " ") {
                if (splitEncryptedChar[i] == "a") {
                    advEncryptionOutput += splitAdvEncryptInput[i];
                }
                else if (splitEncryptedChar[i] == "b") {
                    advEncryptionOutput += advEncryptionMap.get(splitAdvEncryptInput[i]);
                }
            }
            else {
                advEncryptionOutput += " ";
            }
        }
        //delay the output for a bit of fun
        outputDelay(advEncryptionOutput, true);
    }
}

/**
 * A function to decrypt words based on the location of capital or lower case letters in given user input
 */
function dycryptAdvanced() {
    var decryptedBinary = "";
    var advDecryptionOutput = "";
    var tempBinaryChars;
    var numCharactersToDecode;
    var isMultipleOfFive;
    var advDecryptInput;
    var validEnciption = false;
    var tries = 0;
    
    //set html locations to blacnk
    blankHTML();
    
    //if the entered sentence isn't valid for decryption and the user has tried 5 or less attempts
    while (!validEnciption && (tries < 5)) {
        //get the user input
        advDecryptInput = prompt("Enter your sentence that you want to encrypt your ecnryption to: ", "");

        //if the user canclled the prompt
        if (advDecryptInput == null) {
            input = "User cancelled the prompt.";
            printHTML("advInput", "");
            alert("Error: " + input);
            tries = 5;
        //if the user gave no input
        } else if (advDecryptInput == "") {
            input = "User gave no input."
            printHTML("advInput", "");
            alert("Error: " + input);
        //if the user gave an input, varify it is good
        } else {
            //remove spaces from input
            advDecryptInput = removeSpaces(advDecryptInput);

            //get the number of char to decode
            numCharactersToDecode = (advDecryptInput.length) / 5;

            //check if the number is a whole integer
            isMultipleOfFive = Number.isInteger(numCharactersToDecode);

            //if it isn't a multiple of 5
            if (!isMultipleOfFive) {
                alert("Error: Sentence must have a character length that is a mutiple of 5");
            }
            //if input is valid
            else {
                //convert the lower and upper case letters to a and b characters
                for (var i = 0; i < advDecryptInput.length; i++) {
                    decryptedBinary += advDecryptionMap.get(advDecryptInput.charAt(i));
                }
                //split the message into individual character sets
                tempBinaryChars = decryptedBinary.match(/.{1,5}/g);
                //for ever character in the messsage
                for (var i = 0; i < tempBinaryChars.length; i++) {
                    //get the equivelent decrypted character and add it to the decrypted message
                    if ((encryptionMap.get(tempBinaryChars[i]) == "I") || (encryptionMap.get(tempBinaryChars[i]) == "J")) {
                        advDecryptionOutput += " I or J ";
                    }
                    else if ((encryptionMap.get(tempBinaryChars[i]) == "U") || (encryptionMap.get(tempBinaryChars[i]) == "V")) {
                        advDecryptionOutput += " U or V ";
                    }
                    else {
                        advDecryptionOutput += encryptionMap.get(tempBinaryChars[i]);
                    }
                }
                //the input was valid, so output the message
                validEnciption = true;
                outputDelay(advDecryptionOutput, true);
            }
        }
        tries++;
    }
}

/**
 * Function that runs a check on the user input and outputs a error message if needed.
 */
function userInputCheck(userInput, functionRuning) {
    if (userInput == null) {
        input = "User cancelled the prompt.";
        printHTML("input", "Error: " + input)
        consolePrint("Error: " + input);
        printHTML("done", "Done");
    } else if (userInput == "") {
        input = "User gave no input."
        printHTML("input", "Error: " + input)
        consolePrint("Error: " + input);
        printHTML("done", "Done");
    } else {
        input = userInput
        printHTML("input", "Original Message: " + input);
        printHTML("working", functionRuning + " with a Bacon Cipher. . .");
    }
}

/**
 * Function that adds a slight delay to the system output.
 * The function also contains some error checking code to prevent a null write event
 */
function outputDelay(calulatedOutput, advanced) {
    var done = "done";
    var output = "output";

    //if an advanced system alter the output
    if (advanced) {
        done = "advDone";
        output = "advOutput";
    }

    //delay to make more belevable
    window.setTimeout(function () {
        printHTML(done, "Done");
        //another short delay
        window.setTimeout(function () {
            if (calulatedOutput == null || calulatedOutput == "") {
                calulatedOutput = "";
            }
            printHTML(output, calulatedOutput);
        }, 250);
    }, 1500);
}

/**
 * Function that a generates all the needed hash maps for the encryption
 */
function generateHashMaps() {
    var alphabetUpper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",];
    var alphabetLower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",];
    var baconEncryption = ["aaaaa", "aaaab", "aaaba", "aaabb", "aabaa", "aabab", "aabba", "aabbb", "abaaa", "abaaa", "abaab", "ababa", "ababb", "abbaa", "abbab", "abbba", "abbbb", "baaaa", "baaab", "baaba", "baabb", "baabb", "babaa", "babab", "babba", "babbb"];

    //maping values for encrypting
    for (var i = 0; i < 26; i++) {
        encryptionMap.set(alphabetUpper[i], baconEncryption[i]);
    }

    //maping values for dycrypting
    for (var i = 0; i < 26; i++) {
        encryptionMap.set(baconEncryption[i], alphabetUpper[i]);
    }
    
    //maping values for advanced encryption
    for (var i = 0; i < 26; i++) {
        advEncryptionMap.set(alphabetLower[i], alphabetUpper[i]);
    }

    //maping values for advanced dycryption typeface 1
    for (var i = 0; i < 26; i++) {
        advDecryptionMap.set(alphabetLower[i], "a");
    }

    //maping values for advanced dycryption typeface 2
    for (var i = 0; i < 26; i++) {
        advDecryptionMap.set(alphabetUpper[i], "b");
    }
}

/**
 * Function that a sets all html elements that could be editited to an empty string
 */
function blankHTML() {
    printHTML("input", " ");
    printHTML("working", " ");
    printHTML("done", " ");
    printHTML("output", " ");
    printHTML("advInput", " ");
    printHTML("advWorking", " ");
    printHTML("advDone", " ");
    printHTML("advOutput", " ");
}

/**
 * Function that a makes removing spaces more readable
 */
function removeSpaces(userInput) {
    return userInput.replace(/ /g, "");
}

/**
 * Function that a makes editing html elements more readable
 */
function printHTML(source, print) {
    document.getElementById(source).innerHTML = print;
}