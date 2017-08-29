const fs = require('fs');
const readline = require('readline');

if (process.argv[2] === undefined || process.argv[2].trim().toLowerCase() !== "data.json") {
  console.log("Tolong sertakan nama file sebagai inputan soalnya :)");
  console.log("misalnya node tebak-tebakan.js data.json .. gitu ya ");
  process.exit(0);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log('Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!!');
console.log('Untuk bermain jawablah dengan jawaban yang sesuai!! ');
console.log(`Gunakan 'skip' kalo lu lupa jawabannya`);


var dataJson = JSON.parse(fs.readFileSync('data.json'));
var next = 0
var jumlahsalah = 0;

rl.setPrompt('soal: ' + dataJson[next].definition + '\nJawaban: ');
rl.prompt();


rl.on('line', (answer) => {
  if (answer.trim().toLowerCase() == "skip") {
    dataJson.push(dataJson[next]);
    next++;
    rl.setPrompt('soal: ' + dataJson[next].definition + '\nJawaban: ');

  } else if(answer.trim().toLowerCase() == dataJson[next].term.toLowerCase()){
    console.log('damn you are right!! There are another questions tho ');
    next++;
  } else {
    jumlahsalah++
    console.log('salah lu udah '+ jumlahsalah + ' kali');
  }


  if(dataJson.length > next){
    rl.setPrompt('soal: ' + dataJson[next].definition + '\nJawaban: ');
    rl.prompt();
  } else {
    console.log('anda menang');
    rl.close();
  }

}).on('close', () => {
  console.log('Good bye madafaka!');
  process.exit(0);
});
