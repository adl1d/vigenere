const forms = {
    vigenere: `
        <h3>Vigenère Cipher</h3>
        <div class="mb-3">
            <label for="vg-text" class="form-label">Plain Text:</label>
            <input type="text" id="vg-text" class="form-control" placeholder="Enter text">
        </div>
        <div class="mb-3">
            <label for="vg-key" class="form-label">Key:</label>
            <input type="text" id="vg-key" class="form-control" placeholder="Enter key">
        </div>
        <button class="btn btn-primary" onclick="runVigenereEncrypt()">Encrypt</button>
        <button class="btn btn-secondary" onclick="runVigenereDecrypt()">Decrypt</button>
        <div class="mt-3">
            <h4>Result:</h4>
            <div id="vg-result" class="alert alert-info"></div>
        </div>
    `,
    monoalphabetic: `
        <h3>Monoalphabetic Cipher</h3>
        <div class="mb-3">
            <label for="mo-text" class="form-label">Plain Text:</label>
            <input type="text" id="mo-text" class="form-control" placeholder="Enter text">
        </div>
        <div class="mb-3">
            <label for="mo-key" class="form-label">Key (26 unique characters):</label>
            <input type="text" id="mo-key" class="form-control" placeholder="Enter key">
        </div>
        <button class="btn btn-primary" onclick="runMonoalphabeticEncrypt()">Encrypt</button>
        <button class="btn btn-secondary" onclick="runMonoalphabeticDecrypt()">Decrypt</button>
        <div class="mt-3">
            <h4>Result:</h4>
            <div id="mo-result" class="alert alert-info"></div>
        </div>
    `
};

function loadCipherForm() {
    const cipher = document.getElementById("cipher-select").value;
    document.getElementById("cipher-form").innerHTML = forms[cipher] || "Select a cipher to begin.";
}

// Example Cipher Functions
function runVigenereEncrypt() {
    const text = document.getElementById("vg-text").value.toUpperCase();
    const key = document.getElementById("vg-key").value.toUpperCase();
    const result = vigenereCipher(text, key, true);
    document.getElementById("vg-result").textContent = result;
}

function runVigenereDecrypt() {
    const text = document.getElementById("vg-text").value.toUpperCase();
    const key = document.getElementById("vg-key").value.toUpperCase();
    const result = vigenereCipher(text, key, false);
    document.getElementById("vg-result").textContent = result;
}

function vigenereCipher(text, key, encrypt = true) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    let keyIndex = 0;
    for (const char of text) {
        if (alphabet.includes(char)) {
            const textIndex = alphabet.indexOf(char);
            const keyIndexValue = alphabet.indexOf(key[keyIndex % key.length]);
            const shift = encrypt ? keyIndexValue : -keyIndexValue;
            result += alphabet[(textIndex + shift + 26) % 26];
            keyIndex++;
        } else {
            result += char;
        }
    }
    return result;
}
