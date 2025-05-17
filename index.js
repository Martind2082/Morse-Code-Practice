let input = document.querySelector('input');
let morsediv = document.querySelector('#morse');
let correct = document.querySelector('#correct');

let morse = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."];
let alphabet = "abcdefghijklmnopqrstuvwxyz";
alphabet = alphabet.split('');

let word;
let arr = [];
async function grabmorse() {
    arr = [];
    fetch("https://random-word-api.vercel.app/api?words=1")
    .then(res => res.json())
    .then(data => {
        word = data[0]
    })
    .then(() => {
        for(let i = 0; i < word.length; i++) {
            for (let j = 0; j < 26; j++) {
                if (word[i] == alphabet[j]) {
                    arr.push(`${morse[j]}/`)
                    break;
                }
            }
        }
        arr = arr.join('');
        morsediv.textContent = arr;
    })
}
grabmorse()

input.addEventListener("keydown", (e) => {
    if (e.key == 'Enter') {
        if (input.value.length == 0) {
            return;
        }
        if (input.value == word) {
            correct.style.display = 'block'; 
            grabmorse();
            input.value = "";
            setTimeout(() => {
                correct.style.display = 'none'; 
            }, 1000);
        } else {
            wrong.style.display = 'block';
            setTimeout(() => {
                wrong.style.display = 'none'; 
            }, 1000);
        }
    }
})
