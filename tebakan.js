'use strict'

const readline = require('readline');
const fs = require('fs');

let salah = 0;
let data = fs.readFileSync('data.json','utf-8');
data = JSON.parse(data)

if(process.argv[2] === undefined || process.argv[2].toLowerCase() !== "data.json") {
  console.log("\nTolong sertakan nama file sebagai inputan soalnya");
  console.log("Misalnya: 'node tebakan.js data.json'")
  process.exit(0);
}

let count =0;
//console.log(data[count].definition);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



console.log("\nSelamat datang di permainan Tebak-tebakan. Kamu akan diberikan pertanyaan dari file 'data.json'." +
"\nUntuk bermain, jawablah dengan jawaban yang sesuai." +
"\nGunakan 'skip' untuk menangguhkan pertanyaan dan diakhir pertanyaan akan ditanyakan lagi." +
"\nBila Anda salah tiga kali, maka pertanyaan akan lompat ke pertanyaan berikutnya");

rl.setPrompt ("Pertanyaan :" + data[count].definition + "\nJawaban :")
rl.prompt();

rl.on('line', (answer) => {

  if(answer.trim().toLowerCase() == "skip"){
    data.push(data[count]);
    count++
    rl.setPrompt ("Pertanyaan :" + data[count].definition + "\nJawaban :")
  }else if(answer.trim().toLowerCase() == data[count].term.toLowerCase()) {

    count++
    console.log('Selamat Anda Benar!');

  }else{
    salah++
    console.log('WKWKW Anda Kurang Beruntung!' + "anda telah salah sebanyak" + salah +"kali");
    rl.setPrompt ("Pertanyaan :" + data[count].definition + "\nJawaban :")
  }

  if (count < data.length){
    rl.setPrompt ("Pertanyaan :" + data[count].definition + "\nJawaban :")

    rl.prompt();

  }else {

    console.log('Hore Anda Menang!');
    rl.close();
  }
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});
