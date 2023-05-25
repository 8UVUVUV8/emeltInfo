const paths = {
    autok: "./Autok.csv",
    berles: "./Berles.csv"
}

const outPuts = {
    berlesek: " bérlési esemény tartozik.",
    autok: " különböző autót bérelt."
}

const autok = [];
const berles = [];


const fs = require("fs");
const { parse } = require("csv-parse");


function csvRead(path,dataArrays,outPuts){
    
fs.createReadStream(path)
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .on("data", function (row) {
    dataArrays.push(row)
  })
  .on("error", function () {
    console.log("Hiba! A "+ path +" nevű fájl beolvasása sikertelen!");
  })
  .on("end", function () {
    console.log("Az adott ügyfélhez "+dataArrays.length+ outPuts),
    adatKezeles(dataArrays)
  });
}



csvRead(paths.autok, autok, outPuts.autok)
csvRead(paths.berles, berles, outPuts.berlesek)


function adatKezeles(dataArrays){
    dataArrays.sort();
    for (let i = 0; i < dataArrays.length; i++) {
        console.log(dataArrays[i]);
    }
}