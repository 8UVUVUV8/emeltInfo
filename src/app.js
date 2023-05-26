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
const startDate =[];
const endDate =[];
const usedFor=[]
var inputTrys = 0
// probálkozási lehetöség

const JSJoda = require('js-joda');
const LocalDate = JSJoda.LocalDate;
const fs = require("fs");
const { parse } = require("csv-parse");
const { log } = require("console");


async function csvRead(path,dataArrays,outPuts){
    
fs.createReadStream(path)
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .on("data", function (row) {
    dataArrays.push(row)
  })
  .on("error", function () {
    console.log("Hiba! A "+ path +" nevű fájl beolvasása sikertelen!");
  })
  .on("end", function () {
    console.log("Az adott ügyfélhez "+dataArrays.length+ outPuts)
  });
}

csvRead(paths.autok, autok, outPuts.autok)
csvRead(paths.berles, berles, outPuts.berlesek)
waitingForAsyc()

function waitingForAsyc(){
  let timeout
  timeout = setTimeout(sortAutok, 1000);
  timeout = setTimeout(rendszamBeker, 1010);
}


function sortAutok(){
  autok.sort();
  //console.log(berles[0][4])
  //console.log(typeof(autok[0]))
  for (let i = 0; i < autok.length; i++) {
    console.log(autok[i])
    }
  berles.sort();
  for (let i = 0; i < berles.length; i++) {
    console.log(berles[i])
    startDate.push(berles[i][0].replace(".","-").replace(".","-"))
    endDate.push(berles[i][1].replace(".","-").replace(".","-"))
    }
  }

//  "Helytelen rendszámformátum!"

function rendszamBeker(){
  //console.log(inputTrys)
  const prompt = require("prompt-sync")();
  const input = prompt("Adja meg a rendszámot: ");
  rendszamCheck(input)
}

function rendszamCheck(input){
  let youMessItUpBrah = 0;
  let inputArray = input.split("")
  let formatABC =/^[A-Z][A-Z][A-Z]-[0-9][0-9][0-9]/
    //**************************************************************************
    if(checkLength(inputArray)){
      //----------------------------------------------------------------
      if(checkData(formatABC,input)){
        kocsiVanE(input)
      }else{
        console.log("Helytelen rendszámformátum!")
        inputTrys+=1
        if(inputTrys!=2){rendszamBeker()}
      }
      //---------------------------------------------------------------
    }else{
      console.log("Helytelen rendszámformátum!")
      inputTrys+=1
      if(inputTrys!=2){rendszamBeker()}
    }
    //****************************************************************************
}

function checkLength(inputArray){
  if(inputArray.length==7){
    return true
  }
}
function checkData(format,input){
  if (format.test(input)){
    return true
  }
}

function kocsiVanE(input){
  let ar = "";
  for (let i = 0; i < autok.length; i++) {
    if(autok[i][0]=input){
      //console.log("van ilyen auto")
      ar+=autok[i][3]
      kocsiDate()
      break;
    }else{
      console.log("Nincs ilyen rendszámú autó!")
    }
    }
    mennyitHozzot(input,ar)
}

function kocsiDate(){
  for (let i = 0; i < berles.length; i++) {
    //console.log(startDate[i])
    //console.log(typeof(startDate[i]))
    joda(startDate[i],endDate[i])
  }
  //test()
}
function joda(start,end){
  let startDate = new LocalDate.parse(start);
  let endDate = new LocalDate.parse(end);

  usedFor.push(JSJoda.ChronoUnit.DAYS.between(startDate, endDate));
}

function test(){
  for (let i = 0; i < usedFor.length; i++) {
    console.log(startDate[i] + "_" + endDate[i])
    console.log(usedFor[i])
    
  }
  
}

function mennyitHozzot(input,ar){
  let arNum = parseInt(ar,10)
  let allTimes = 0
  let allProf = 0
  for (let i = 0; i < berles.length; i++) {
    if (berles[i][4]==input){
      //console.log(berles[i])
      //console.log(usedFor[i])
      allTimes+=usedFor[i]
    }
    
  }
  allProf=allTimes*arNum
  console.log("Az autót összesen "+ allTimes +" napig bérelték, ebből "+ allProf +" Ft bevétel származott.")
}