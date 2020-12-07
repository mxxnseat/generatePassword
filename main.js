//dom elements
const generate = document.querySelector("#generation_btn"),
    copy = document.querySelector("#copy"),
    input = document.querySelector("#pass_length"),
    outputBox = document.querySelector("#output");



let error = [];
let userLength = 0;

input.oninput = (e) => {
    let inputValue = e.target.value.split('');
    const lastCharIndex = inputValue.length - 1,
        maxLength = 30;
    let lastChar = inputValue[lastCharIndex];

    if (!/\d/i.test(lastChar)) { inputValue.pop(); }

    inputValue = inputValue.join('');
    input.value = inputValue;

    if (parseInt(inputValue) > maxLength) {
        error.push(`Out of range. Enter - ${+inputValue}, Max - ${maxLength}, Min - 8`);
    } else {
        error.pop();
        userLength = parseInt(inputValue);
    }
} // validation


generate.onclick = () => {
    if (!error.length) {
        const symbols = "1234567890!@$*()_qwertyuiopasdfghjklzxcvbnm.".split('');

        let generatedPassword = [];

        if (userLength === 0) userLength = 8;

        for (let i = 0; i < userLength; i++) {
            let uppercase = Math.round(Math.random() * 1),
                randSymbol = Math.round(Math.random() * (symbols.length - 1));

            randSymbol = uppercase ? symbols[randSymbol].toUpperCase() : symbols[randSymbol];

            generatedPassword.push(randSymbol);
        }
        outputBox.innerText = generatedPassword.join('');
        clickToCopy(outputBox);
    }
}

copy.onclick = () => clickToCopy(outputBox);

function clickToCopy(copyFrom) {
    let range = document.createRange();
    range.selectNode(copyFrom);
    window.getSelection().addRange(range);

    try {
        document.execCommand('copy');
    } catch (e) {
        console.log(`Can\`t copy, some error: ${e}`);
    }
    window.getSelection().removeAllRanges();
}