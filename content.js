console.log("YOO WSG");

// Copied from the original decoder site

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const USD = .15;
function decode(code) {
    let n = [],
        t = code;
    t.length > 2 &&
        t.split(/[ ,]+/).forEach(e => {
        let [a, , c] = e;
        isLetter(a) &&
            isNumber(c) &&
            n.push({
                code: e,
                yuan: parseInt(`${alphabet.indexOf(a) + 1}${calcSecondNum(c)}0`),
                usd: Math.round(parseInt(`${alphabet.indexOf(a) + 1}${calcSecondNum(c)}0`) * USD)
            });
        }),
        console.log();
        return n[0];
}
function calcSecondNum(e) {
    var n = parseInt(e) + 5;
    return n < 10 ? n : n - 10
}
function isLetter(e) {
    return 1 === e.length && e.match(/[a-z]/i)
}
function isNumber(e) {
    return !isNaN(parseInt(e, 10))
}

// My time to shine

// Look for either albums or headers on album pages

let albums = document.getElementsByClassName("album__title");
let headers = document.getElementsByClassName("showalbumheader__gallerytitle");

// Add them together into a single array

let check = [...albums, ...headers];


// Loop through the elements
for(let i = 0; i < check.length; i++) {
    try{
        // Save innertext (for readability)
        const innerText = check[i].innerText;

        // Split at the code
        let temp = innerText.split("【")[1];

        // Check if code is in the inner text. If it is, retrieve it
        if(temp) temp = temp.split("】")[0];
        else continue;

        // Check if code is at least 2 characters cause that shit is fucked up if it isn't
        if(temp.length > 1){
            // Save code (for readability)
            const code = temp;

            // Decode the code's price using the decoder further up
            const decoded = decode(code);

            // Check if it was able to decode
            if(decoded !== undefined) {
                // if it was able to decode, add that pretty little price tag
                check[i].innerHTML = `<span style="background-color:#34ff34;padding:5px;border-radius:5px;">${decoded.yuan}CNY</span> ${innerText.split("】")[1]}`;
            }else{
                // If it's not able to decode, add a little X
                check[i].innerHTML = "X - " + innerText.split("】")[1];
            }
        }
    }catch(e){
        // No errors pls
        console.error(check[i].innerText);
        console.error(e);
        continue;
    }
}

// Thank you for reading my code