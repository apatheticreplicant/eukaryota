// grab sidebar links 
let postList = '../../intranet_assets/posts.json'
let response1 = await fetch(postList)
let links = await response1.json();
// place links on bar
const sect = document.querySelector(".banner").id
for (let i = 0; i < links.length; i++) { 

	const newPost = document.createElement("li")
	newPost.className = "meta";
	
	const postName = document.createElement("a")
	postName.href=links[i].locale;	
	postName.innerHTML = '"' + links[i].title + '"'
	
	const postAuth = document.createElement("span")
	postAuth.className= "user"
	postAuth.innerText = links[i].author
	
	const postSec = links[i].sec

	newPost.append(postName," by ",postAuth," in ","hv.",postSec)
	let index = document.getElementById("index");
	let indexL = document.getElementById("indexL")
	if (postSec == sect) {
		indexL.appendChild(newPost);
	} else {
		index.appendChild(newPost);
	}
			
}
//random button 
let randBWR = document.createElement('li')
let randB = document.createElement('a')
 randB.addEventListener('click', function(){ 	
	location.href = links[Math.floor(Math.random() * links.length)].locale
}) 
randB.href = "#"
randB.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dice-2-fill" viewBox="0 0 16 16"> <path d="M0 3a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3zm5.5 1a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m6.5 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/> </svg>'
randB.title = "...roll the dice?"
randBWR.appendChild(randB)
document.querySelector(".navigation").appendChild(randBWR);

// grab posts 
let ex = './' + window.location.pathname.split('/')[4] + '.json'
ex = ex.replace('.html', '')
let response = await fetch(ex)
let commentInfo = await response.json();
// metadata 



// # of comments
let numb = commentInfo[commentInfo.length - 1].number
document.querySelectorAll(".responses").forEach((item) => {
  item.innerHTML=numb
});

// create threads
function spawnThreads() {
	for (let i = 0; i < commentInfo.length; i++) { 
	
	
	// create new comment
	const newCommentWrap = document.createElement("div");
	newCommentWrap.classList.add("post")
	
	const comTopWrap = document.createElement("div")
	comTopWrap.classList.add("post-t")
	// create top comment meta
	const comCollapse = document.createElement("span")
	comCollapse.title = "Collapse"
	comCollapse.classList.add("collapse")
	comCollapse.innerText = "[x]"
	// add collase listener 
		comCollapse.addEventListener("click", function(event){
			document.getElementById(this.parentNode.parentNode.parentNode.id).classList.toggle("toggled")
			if (document.getElementById(this.parentNode.parentNode.parentNode.id).classList.contains("toggled")) {
				this.innerHTML = "[o]"
			} else {
	
				this.innerHTML = "[x]"
			}	
		})

	const comUser = document.createElement("p")
	comUser.classList.add("user")
	comUser.innerText = commentInfo[i].user
	// check for user flare 
	const flare = commentInfo[i].flair
		switch (flare) {
			case "mod":
			case "bot":
			comUser.classList.add("mod")
			break;
			case "OP":
			comUser.classList.add("special")
	
		}

	const comTime = document.createElement("p")
	comTime.innerText = commentInfo[i].time
	// append
	comTopWrap.append(comCollapse,comUser,comTime)
	// create comment content
	const comContentWrap = document.createElement("div")
	comContentWrap.classList.add("post-c")
	comContentWrap.innerHTML = commentInfo[i].content

	// create bottom comment meta
	const comButtWrap = document.createElement("div");
	comButtWrap.classList.add("post-t")
	
	// create perma link
	const postNumb = commentInfo[i].number
	const postNumbURL = '#' + postNumb
	const save = document.createElement("a")
	save.href = postNumbURL
	save.innerText = "save"
	save.title = "You must be logged in to save posts!"
	save.classList.add("non") 
	save.classList.add("post-l") 
	
	const report = document.createElement("a")
	report.href = postNumbURL
	report.innerText = "report"
	report.title = "You must be logged in to report posts!"
	report.classList.add("non") 
	report.classList.add("post-l") 
	
	const reply = document.createElement("a")
	reply.href = postNumbURL
	reply.innerText = "reply"
	reply.title = "You must be logged in to reply to posts!"
	reply.classList.add("non") 
	reply.classList.add("post-l") 
	
	// append
	comButtWrap.append(save,report,reply)
	// append all to post
	newCommentWrap.append(comTopWrap,comContentWrap,comButtWrap)
	
	if (commentInfo[i].child === 1) {
			appendReply();
	} else if (commentInfo[i].child === 0) {
			appendMain();
	}
	
	function appendMain() {
		const chain = document.createElement("div")
		chain.id = commentInfo[i].number
		chain.id = commentInfo[i].id
		chain.classList.add("chain")
		// append post to chain 
		chain.appendChild(newCommentWrap)
		// append chain to house 
		document.getElementById("house").append(chain)
	}
	
	function appendReply() {

				// create reply
				const replyWrap = document.createElement("div")
				replyWrap.classList.add("post-r")
				replyWrap.id = commentInfo[i].id
				replyWrap.appendChild(newCommentWrap)
				// append reply
				document.getElementById(commentInfo[i].parentid).append(replyWrap)

				} 
	

	}

}
spawnThreads();
// check if thread contains image	
if (document.querySelector(".titlecontent").children[0].tagName === 'IMG') {
	let img = document.getElementById("postimg")
	img.addEventListener('click', function(){
		let imgu = this.src
		window.open(imgu, "_blank")
	})

}



