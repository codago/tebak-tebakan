"use strict";

var readline = require('readline');
var fs = require('fs');
var datajson = JSON.parse(fs.readFileSync("data.json", "utf8"));
var rl = readline.createInterface({input: process.stdin,output: process.stdout});
var kondisi = true;
var tanya = 0;
var salahjawab = 0;

/*function display() {
console.log("Selamat datang di permainan Tebak-tebakan. Kamu akan diberikan pertanyaan dari file ini 'data.json'." +
           "Gunakan 'skip' untuk menangguhkan pertanyaan dan diakhir pertanyaan akan ditanyakan lagi");
}
*/
if(process.argv[2] === undefined || process.argv[2].toLowerCase() !== "data.json") {
  console.log("\nTolong sertakan nama file sebagai inputan soalnya");
  console.log("Misalnya: 'node tebaktebakan.js data.json'")
  process.exit();
}

console.log("\nSelamat datang di permainan Tebak-tebakan. Anda akan diberikan pertanyaan dari file 'data.json'." +
            "\nUntuk bermain, jawablah dengan jawaban yang sesuai." +
            "\nGunakan 'skip' untuk menangguhkan pertanyaan dan diakhir pertanyaan akan ditanyakan lagi." +
            "\nBila Anda salah tiga kali, maka akan dilanjutkan ke pertanyaan berikutnya");

function cekjawaban(pertanyaan, jawaban) {
  if (pertanyaan.toLowerCase().trim() === "skip") {
    kondisi = true;
    var sisip = datajson.splice(tanya, 1);
    datajson.push(sisip[0]);
    tanya--;
    return true;
  } else if (pertanyaan.trim().toUpperCase() === jawaban.toUpperCase()) {
    console.log("Anda Beruntung!\n");
    return true;
  }else if (salahjawab === 2) {
    kondisi = true;
    var sisip = datajson.splice(tanya, 1);
    datajson.push(sisip[0]);
    tanya--;
    return true;
  }
  else {
    salahjawab++;
    console.log("\nAnda Kurang Beruntung! anda telah salah " + salahjawab +
                " kali, silahkan mencoba lagi.")
    return false;
  }
};
console.log("\nPertanyaan : " + datajson[tanya].definition);
rl.setPrompt('Jawaban : ' );
rl.prompt();
rl.on('line', function(line) {
  if(tanya === datajson.length) {
    console.log("Anda Berhasil!");
    rl.close();
  } else {
    kondisi = cekjawaban(line, datajson[tanya].term);
      if(kondisi === true) {
          tanya++;
      }
      if(tanya < datajson.length) {
        console.log("\nPertanyaan : " + datajson[tanya].definition);
      rl.prompt();
    }
  }
}).on('close', function() {
  console.log("\Good Bye!");
});
