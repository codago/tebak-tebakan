
const readline = require('readline');
const fs = require('fs');
let file=process.argv[2]
if (file) {


  let data = fs.readFileSync(file, 'utf8');

  data=JSON.parse(data)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let next = 0;
  let count =0;
  rl.setPrompt('tebakan: ')
  console.log('selamat datang dipermainan tebak kata,silahkan isi dengan jawaban yang benar ya!');
  console.log(`\npertanyaan : ${data[next].definition}`);
  rl.prompt()

  rl.on('line', (answer) => {
    if(answer.trim().toLowerCase() == "skip"){
      data.push(data[next])
      next++;
      console.log(`\npertanyaan : ${data[next].definition}`);

    }else{
      //if jawaban benar
      if(answer.trim().toLowerCase() == data[next].term.toLowerCase()){
        console.log('anda benar');
        next++;
        if(data.length > next){
          console.log(`\npertanyaan : ${data[next].definition}`);

        }else{ //soal habis
          console.log('anda menang');
          rl.close();
        }
      }else{  //kalau ngga bener
        count++;
        console.log(`\nanda kurang beruntung! anda telah salah ${count} kali,silahkan coba lagi`);

      }
      //check soal habis

    }
    rl.prompt();
  }).on('close', () => {
    console.log('good bye');
    process.exit(0);
  });
}else {
  console.log('tolong sertakan nama file sebagai inputan soalnya');
  console.log("misalnya:'node solution.js data.json'");
}
