const readline = require('readline');
const fs = require ('fs');
let hitung = 0;
let jawabanSlh = 0;
let data = JSON.parse(fs.readFileSync("data.json", "utf8"))
let word = data.length -1;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
if(process.argv[2] === undefined) {
  console.log("tolong seratakan nama sebagai inputan soalnya \n misalnya 'node tebak-tebakan.js data.json'")
  process.exit(0);
} else {
  console.log("selamat datang di permainan tebak-tebakan, kamu akan diberikan pertanyaan dari file ini 'data.json'" +
  "\nuntuk bermain, jawablah pertanyaan dengan jawaban yang sesuai." +
  "\ngunakan 'skip' untuk menangguhkan pertanyaan, dan diakhir pertanyaan akan ditanyakan lagi.");
}
rl.setPrompt ("pertanyaan :" + data[hitung].definition + "\nTebakan :")
rl.prompt();
rl.on('line', (line) => {
  if(line.trim().toLowerCase() == "skip"){
    data.push(data[hitung]);
    hitung++;
    rl.setPrompt('Pertanyaan :'+ data[hitung].definition+"\nTebakan :")
  }else if (line.trim().toLowerCase() === data[hitung].term.toLowerCase()) {
    hitung++
    console.log("Selamat bro, lu bener!")
  }else {
    jawabanSlh++
    console.log('Mamam! salah!' +"anda salah sebanyak" + jawabanSlh + "kali")
    rl.setPrompt('Pertanyaan :'+ data[hitung].definition+"\nTebakan :")
  }if(data.length > hitung){
    rl.setPrompt('pertanyaan : ' + data[hitung].definition + '\nTebakan: ');
    rl.prompt();
  } else {
    console.log('anda menang');
    rl.close();
  }
}).on('close',() => {
  console.log('Dadah bro!');
  process.exit(0);
});
