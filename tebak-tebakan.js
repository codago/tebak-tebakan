const readline = require('readline');
const fs = require('fs');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var wrongAnswers = 0;
var questionDatabase = JSON.parse(fs.readFileSync("data.json", "utf8"));
var questionIndex = 0;
var gameContinue = false;

console.log("Selamat datang di permainan Tebak-tebakan. " +
            "kamu akan diberikan pertanyaan dari file ini 'data.json'. " +
            "\nUntuk bermain, jawablah dengan jawaban yang sesuai. " +
            "\nGunakan 'skip' untuk menangguhkan pertanyaannya, dan di akhir " +
            "akan ditanyakan lagi.");


if(process.argv[2] === undefined || process.argv[2].toLowerCase() !== "data.json") {
  console.log("\nTolong sertakan nama file sebagai inputan soalnya");
  console.log("Misalnya 'node tebak-tebakan.js data.json'")
  process.exit();
}

console.log("Pertanyaan : " + questionDatabase[questionIndex].definition);

rl.setPrompt('Jawaban : ' );
rl.prompt();
rl.on('line', function(line) {
  if(questionIndex === questionDatabase.length) {
    console.log("Anda Berhasil!");
    rl.close();
  } else {
    gameContinue = checkAnswer(line, questionDatabase[questionIndex].term);
      if(gameContinue === true) {
          questionIndex++;
      }

      if(questionIndex < questionDatabase.length) {
        console.log("\nPertanyaan : " + questionDatabase[questionIndex].definition);
      rl.prompt();
    }
  }
}).on('close', function() {
  console.log("\nbyee!");
});


function checkAnswer(userAnswer, questionAnswer) {
  if(userAnswer.toLowerCase().trim() === "skip") {
    wrongAnswers = 0;
    var slicedElement = questionDatabase.splice(questionIndex, 1);
    questionDatabase.push(slicedElement[0]);
    questionIndex--;
    return true;

  } else if(userAnswer.trim().toUpperCase() === questionAnswer.toUpperCase()) {
    console.log("Anda Beruntung!\n");
    return true;

  } else {
    wrongAnswers++;
    console.log("\nAnda Kurang Beruntung! anda telah salah " + wrongAnswers +
                " kali, silahkan coba lagi.")
    return false;
  }
}
