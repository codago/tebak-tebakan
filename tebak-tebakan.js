"use strict";

const fs = require("fs");
const readline = require("readline");
var hitung = 0;
var hitungJwbnSlh = 0;

if (process.argv[2] != undefined) {
    fs.readFile(process.argv[2], "utf8", function (err, data) {
        if (err) {
            console.log("file data tidak ditemukan!");
        }
        data = JSON.parse(data);
        display();
        promptQuestion(data);
    })
} else {
    console.log("Tolong sertakan nama file sebagai inputan soalnya\nMisalnya 'node solution.js data.json'");
}
function display() {
    console.log("Selamat datang di permainan Tebak-tebakan, kamu akan diberikan pertanyaan dari file ini " + process.argv[2] + ".\n");
    console.log("Untuk bermain, jawablah dengan jawaban yang sesuai.\nGunakan 'skip' untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan ditanyakan lagi.");
}
var flag = true;
function promptQuestion(data) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pertanyaan: " + data[hitung].definition + "\nJawaban: "
    });
    rl.prompt();
    console.log("Pertanyaan: " + data[hitung].definition + "\nJawaban: ");

    rl.on('line', (line) => {

        if (flag) {
            hitungJwbnSlh = 0;
            flag = false;
        };
        if (hitung === data.length - 1) {
            if (line.trim().toLowerCase() === data[hitung].term.toLowerCase()) {
                console.log("\nAnda Beruntung!");
                console.log("\nAnda Berhasil!");
                process.exit(0);
            }
        }
        if (line.trim().toLowerCase() === data[hitung].term.toLowerCase()) {
            flag = true;
            hitung++;
            console.log("\nAnda Beruntung!");
            rl.setPrompt("\nPertanyaan: " + data[hitung].definition + "\nJawaban: ");
        } else if (line.trim().toLowerCase() === "skip") {
            flag = true;
            if(hitung < data.length-1){
                var temp = data[hitung];
                data[hitung] = data[hitung + 1];
                data[hitung + 1] = temp;
            }else{
                console.log("last question gabole skip !!!");
            }
            rl.setPrompt("\nPertanyaan: " + data[hitung].definition + "\nJawaban: ");
        } else {
            hitungJwbnSlh++;
            console.log("\nAnda Kurang Beruntung! anda udah salah " + hitungJwbnSlh + " kali,silahkan coba lagi.");
            rl.setPrompt("Jawaban: ")
        }
        rl.prompt();

    }).on('close', () => {
        console.log('Bye!');
        process.exit(0);
    });
}
