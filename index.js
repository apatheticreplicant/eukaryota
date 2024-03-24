/* console.log(localStorage.getItem("theme"))
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
}); */

let postl = './posts.json'
let response = await fetch(postl)
let posts = await response.json();

for (let i = 0; i < posts.length; i++) {
	const newP = document.createElement("div")
	newP.className = "post"
	
	const postH = document.createElement("header")
	
	const postT = document.createElement("h1")
	postT.className = "title"
	postT.innerHTML = posts[i].title
	postT.id = "title"

	const postM = document.createElement("p")
	postM.className = "meta"
	
	const postD = document.createElement("span")
	postD.innerText = posts[i].date
	const postTags = document.createElement("span")
	postTags.innerText = posts[i].meta
	
	const postPrw = document.createElement("p")
	postPrw.innerHTML = posts[i].stuff
	const linkOut = document.createElement("a")
	linkOut.href = posts[i].locale
	if (posts[i].locale === null) {
		linkOut.innerText = ""
	} else {
		linkOut.innerText = "view further..."
	}
	
	postM.append(postD," ∙ ",postTags)
	postH.append(postT,postM)
	newP.append(postH,postPrw,linkOut)
	document.querySelector(".posts").appendChild(newP)
}
	window.onbeforeunload = function(e){
    document.querySelector('.scroll').classList.add('out')
}
window.onload = function(e){
    document.querySelector('.scroll').classList.remove('out')
}
