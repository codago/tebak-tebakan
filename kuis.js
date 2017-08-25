"use strict";
const fs        = require("fs");
const readline  = require('readline');
let namaFile    = process.argv;
let file        = namaFile[2];

var dataBase;
var panjangData

try
{
  var dataBase    = JSON.parse(fs.readFileSync(file, "utf8"));
  var panjangData = dataBase.length - 1;
  var i           = 0;
  var salah       = 0;
  var skip        = false;
  var j           = [];
  var flag        = "off";


  function pertanyaan()
    {
     const rl = readline.createInterface(
       {
         input: process.stdin,
         output: process.stdout,
       }
     );

       console.log( "Pertanyaan: " + dataBase[i].definition + "\nKetik Jawaban Anda: ");
       rl.on('line', (jawabanUser) =>
       {
         var isi         = j[0];
         if (flag == "on")
         {
           if ((jawabanUser.trim().toLowerCase() === dataBase[isi].term.toLowerCase())){
              console.log("Selamat Anda Benar!");
              j.shift();
              if(j.length === 0){
                console.log("Hore Anda Menang");
                console.log("\n\nHave a great day!\nGOOD BYE");
                process.exit(0);
              }else{
                isi = isi+1;
                console.log("Pertanyaan: " + dataBase[isi].definition + "\nKetik Jawaban Anda: ");
              }
           }else if (jawabanUser.trim().toLowerCase() === "skip" ) {
             console.log("udah di skip tadi, g bisa di skip lagi");
             console.log("Pertanyaan: " + dataBase[isi].definition + "\nKetik Jawaban Anda: ");
            }else{
             salah++;
             console.log("Wkwkwkwk, Anda kurang beruntung!\nAnda telah salah "+salah+" kali");
             console.log("Coba jawab lagi: ")
           }

         }

         else if (i === panjangData) //jika pertanyaan terakhir
         {
             if (jawabanUser.trim().toLowerCase() === dataBase[i].term.toLowerCase())
             {
                if(skip === true)
                  {
                    flag="on";
                    console.log("Pertanyaan: " + dataBase[isi].definition + "\nKetik Jawaban Anda: ");
                  }
                else //jika jawaban benar dan tidak ada yang skip
                  {
                    console.log("Selamat Anda Benar!");
                    console.log("Hore Anda Menang");
                    console.log("\n\nHave a great day!\nGOOD BYE");
                    process.exit(0);
                  }
             }else if (jawabanUser.trim().toLowerCase() === "skip" ) {
               console.log("pertanyaan terakhir, g bisa di skip");
               console.log("Pertanyaan: " + dataBase[i].definition + "\nKetik Jawaban Anda: ");
              }
             else // jika pertanyaan terakhir dan salah
             {
                 salah++;
                 console.log("Wkwkwkwk, Anda kurang beruntung!\nAnda telah salah "+salah+" kali");
                 console.log("Coba jawab lagi: ")
             }
        }
        else  //jika bukan pertanyaan terakhir
        {
            if ((jawabanUser.trim().toLowerCase() === dataBase[i].term.toLowerCase()))
            {
                i++;
                salah = 0;
                console.log("Selamat Anda Benar!");
                console.log("Pertanyaan: " + dataBase[i].definition + "\nKetik Jawaban Anda: ");
            }
            else if(jawabanUser.trim().toLowerCase() == "skip")
            {

                j.push(i);
                i++;
                skip = true;
                console.log("Pertanyaan: " + dataBase[i].definition + "\nKetik Jawaban Anda: ");
            }
            else
            {
                salah++;
                console.log("Wkwkwkwk, Anda kurang beruntung!\nanda telah salah "+salah+" kali");
                console.log("Coba jawab lagi: ")
            }

            rl.prompt();

          }
        }).on('close', () =>
                {
                  console.log("\n\nHave a great day!\nGOOD BYE");
                  process.exit(0);
                })
    };

console.log("Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!");
pertanyaan();
}

//jika user belum mengetik nama file atau salah mengetik nama file
catch (err)
{
  if (namaFile[2] == undefined)
  {
      console.log("Anda belum mengetik nama file, tolong sertakan nama file");
  }
  else
  {
    console.log("nama file yang anda ketik tidak ditemukan");
  }
}
