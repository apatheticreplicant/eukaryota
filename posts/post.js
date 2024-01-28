// wordcount

let article = document.querySelector("article").innerText
let wordcount = article.trim().split(/\s+/).length;
document.getElementById("wordcount").innerText = wordcount + ' words'

console.log(wordcount)

// time to read 
let wpm = 230
let time = Math.ceil(wordcount / wpm)
document.getElementById("time").innerText = time + " minutes"
// accessdate 
let currentdate = new Date();

Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

let accessed = "This document was last accessed on " + new Date().today() + " at " + new Date().timeNow() + " (ATC)";
document.getElementById("accessed").innerHTML = accessed
