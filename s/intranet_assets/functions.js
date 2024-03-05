// headlights
console.log(localStorage.getItem("theme"))
const headlights = localStorage.getItem("theme");
if (headlights == "light") {
	document.body.classList.toggle("light-theme")
}
ltggle = document.getElementById("ltggle")
ltggle.title = "...turn on the lights?"
ltggle.addEventListener("click", function() {
	document.body.classList.toggle("light-theme");
	if (document.body.classList.contains("light-theme")) {
		toggle = "light"
		localStorage.setItem("theme", toggle);
		ltggle.title = "...turn off the lights?"	
	} else {
		toggle = "dark"
		localStorage.setItem("theme", toggle);
		ltggle.title = "...turn on the lights?"
	}
});



// share
function share() {
	navigator.clipboard.writeText(window.location.href);
	let dummy = document.createElement('p')
	let button = document.getElementById("share");

	button.classList.add("non");
	button.href="#"
	document.body.appendChild(dummy);
	dummy.classList.add("popup")
	dummy.innerHTML = "Thread URL copied!";
	setTimeout(function(){dummy.classList.add("fade"); },3500)
	setTimeout(function(){document.body.removeChild(dummy)},5500)
	setTimeout(function(){button.classList.remove("non"); },3000)
	setTimeout(function(){button.href="javascript:share();" },3000)
}




// mobile sidebarmenu
let ham = document.querySelector(".aside")
let menu = document.createElement("a")
let mover = document.createElement('div') 
menu.href="#"
// check if window is resized, then add / remove classifiers
window.addEventListener('resize', function(event){
responsive();
});
function responsive() {
	 if (window.screen.width > 1080 && document.body.contains(menu)) { 
		document.body.removeChild(menu);
	 	document.body.removeChild(mover);
		 if (document.querySelector(".navigation").contains(closeWr)) {
			(document.querySelector(".navigation").removeChild(closeWr)) 
		 }
		ham.style.left = null;
		ham.style.opacity = null;
	 } else	if ((window.screen.width < 1080) && (!document.body.contains(menu))) {
		document.body.appendChild(menu)
		document.body.appendChild(mover)
		mover.classList.add("mover")
		menu.innerText="☷"
		menu.classList.add("burger")
		menu.addEventListener("click", function(){	 
		ham.style.left = "0";
		mover.style.left = "0"
		ham.classList.add("transition")
		ham.style.opacity = "1"					
		closeButt();
		})
	 }
}
// check if user is swiping & add classes 
mover.addEventListener('touchmove', (e) => {
			x = e.touches[0].clientX
			console.log(x)
			ham.classList.add("moving")
			ham.classList.remove("transition")
			document.body.classList.add("moving")
			ham.style.opacity = '60%';
			ham.style.left = x + 'px'
			mover.style.left = x + 'px'
});
mover.addEventListener('touchend', (e) => {
		ham.classList.remove("moving")
		ham.classList.add("transition")
		document.body.classList.remove("moving")	
	if (x < 190) {
			ham.style.left = "0";
			mover.style.left = "0"
			ham.style.opacity = "1"						
			closeButt();	
		} else if (x > 190) {
			ham.style.left = "97%";
			mover.style.left = "94%";
			ham.style.opacity = "60%"
			document.querySelector(".navigation").removeChild(closeWr)
		}
})
// close menu function
let closeWr = document.createElement('li')
let closeIn = document.createElement('a')
function closeButt() {
	closeWr.addEventListener("click", function(){
		ham.style.left = "97%";
		mover.style.left = "94%"
		ham.style.opacity = "60%"
	})
	closeIn.href = 'javascript:;'
	closeIn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16"> <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/> </svg>'
	closeWr.appendChild(closeIn)
	document.querySelector(".navigation").appendChild(closeWr);
}
responsive();
// something in this file is probably redundant
// This whole file is redundant!!!!
