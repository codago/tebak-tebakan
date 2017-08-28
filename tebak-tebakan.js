"use strict"

const readline = require('readline') ;
const fs = require('fs');

const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout,
});

let data = JSON.parse(fs.readFileSync("data.json","utf8"))
let wrongAnswer = 0;
let count = 0;
let gameOn= false;


console.log("Selamat Datang di permainan Tebak-Tebakan" +
"\nkamu akan diberikan pertanyaan dari file ini" +
"\nUntuk bermain, jawablah dengan jawaban yang sesuai" +
"\nGunakan 'skip' untuk menangguhkan pertanyaannya, dan diakhir pertanyaan" +
"\nakan ditanyakan lagi");


if(process.argv[2] === undefined || process.argv[2].toLowerCase() !== "data.json") {
	  console.log("\nTolong sertakan nama file sebagai inputan soalnya");
	  console.log("Misalnya 'node tebak-tebakan.js data.json'")

	}

console.log("Pertanyaan:"+ data[count].definition);

rl.setPrompt('Jawaban : ');
rl.prompt();

rl.on('line', function(line) {
  if(count === data.length){
    console.log("Anda Berhasil");
    rl.close();
  } else {
    gameOn = testAnswer(line, data[count].term);
    if(gameOn === true) {
      count++;
    }
    if(data.length > count) {
      console.log("\nPertanyaan :" + data[count].definition);
      rl.prompt();
    }
  }
}).on('close', function() {
  console.log("\nTerima Kasih Telah Bermain Tebak-Tebakan");
})


function testAnswer(userAnswer, questionAnswer) {
  if(userAnswer.toLowerCase().trim() === "skip") {
    wrongAnswer = 0;
    let answerElement = data.splice(count, 1);
    data.push(answerElement[0]);
    count--;
    return true;
  } else if(userAnswer.trim().toUpperCase() === questionAnswer.toUpperCase()) {
    console.log("Jawaban Anda Benar!\n")
    return true;
  } else  {
    wrongAnswer++;
    console.log("\Jawaban Anda Salah dan Anda Telah Salah" + wrongAnswer +
                "kali, Silahkan Coba Lagi")
    return false;
  }
}
