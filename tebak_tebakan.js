"use strict";

const fs = require("fs");
const readline = require("readline");
var count = 0;
var countWrongAnswer = 0;
function display() {
    console.log("=================================================================================");
    console.log("Selamat datang di permainan Tebak-tebakan, kamu akan diberikan pertanyaan dari file ini " + process.argv[2] + ".\n");
    console.log("Untuk bermain, jawablah dengan jawaban yang sesuai.\nGunakan 'skip' untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan ditanyakan lagi.");
    console.log("=================================================================================\n");
}

var flag = true;
function promptQuestion(data) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pertanyaan: " + data[count].definition + "\nJawaban: "
    });
    rl.prompt();

    rl.on('line', (line) => {

        if (flag) {
            countWrongAnswer = 0;
            flag = false;
        };
        if (count === data.length - 1) {
            if (line.trim().toLowerCase() === data[count].term.toLowerCase()) {
                console.log("\nAnda Beruntung!");
                console.log("\nAnda Berhasil!");
                process.exit(0);
            } 
        }

        if (line.trim().toLowerCase() === data[count].term.toLowerCase()) {
            flag = true;
            count++;
            console.log("\nAnda Beruntung!");
            rl.setPrompt("\nPertanyaan: " + data[count].definition + "\nJawaban: ");
        } else if (line.trim().toLowerCase() === "skip") {
            flag = true;
            if(count < data.length-1){
                var temp = data[count];
                data[count] = data[count + 1];
                data[count + 1] = temp;
            }else{
                console.log("Pertanyaan terakhir, tidak bisa di skip !!!");
            }
            rl.setPrompt("\nPertanyaan: " + data[count].definition + "\nJawaban: ");

        } else {
            countWrongAnswer++;
            console.log("\nAnda Kurang Beruntung! anda telah salah " + countWrongAnswer + " kali,silahkan coba lagi.");
            rl.setPrompt("Jawaban: ")
        }


        rl.prompt();

    }).on('close', () => {
        console.log('Have a great day!');
        process.exit(0);
    });
}


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