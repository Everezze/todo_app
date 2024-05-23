const checkMarks = Array.from(document.querySelectorAll("section .circle"));
const tasks = Array.from(document.querySelectorAll("article span"));
const marksAndTasks =checkMarks.concat(tasks);
const crossIcons = document.querySelectorAll("section .cross-icon");
const taskCompletedCleaner = document.querySelector("section aside span:last-child");
const filterContainer = document.querySelector("main>aside div");
const activeFilter = document.querySelector("main>aside div span:nth-child(2)");
const completedFilter = document.querySelector("main>aside div span:nth-child(3)");
const allFilter = document.querySelector("main>aside div span:nth-child(1)");
const tasksSection = document.querySelector("section");
const articles = Array.from(document.querySelectorAll("section article"));
const input = document.querySelector("input");
const main = document.querySelector("main");
const secondAside = document.querySelector("main > asidel");

let preventClick = false;
let prevArticle = "";
let usedDragging = false;

function addActive(element){
	element.addEventListener("click",function(){
		if(preventClick){
			preventClick=false;
			console.log("entered this preventing click event");
			return null;
		}
		element.parentElement.classList.toggle("active");
	});
};

function enableActiveFilter(){
	tasksSection.classList.toggle("active-filter");
	tasksSection.classList.remove("completed-filter");
};

function enableCompletedFilter(){
	tasksSection.classList.toggle("completed-filter");
	tasksSection.classList.remove("active-filter");
};

function enableAllFilter(){
	tasksSection.classList.remove("completed-filter");
	tasksSection.classList.remove("active-filter");
};

function enableRemoveArticle(element){
	element.addEventListener("click",function(){
		if(preventClick){
			preventClick=false;
			return;
		}
		let articleToRemove = this.parentElement;
		articleToRemove.parentElement.removeChild(articleToRemove);
	});
};

function createArticle(input){
	let article = document.createElement("article");
	let circle = document.createElement("div");
	let img= document.createElement("img");
	let span = document.createElement("span");
	let crossIcon = document.createElement("img");
	crossIcon.setAttribute("src","images/icon-cross.svg");
	crossIcon.classList.add("cross-icon");
	enableRemoveArticle(crossIcon);
	img.setAttribute("src","images/icon-check.svg");
	span.textContent = input.value;
	addActive(span);
	addActive(circle);
	circle.classList.add("circle");
	circle.appendChild(img);
	article.appendChild(circle);
	article.appendChild(span);
	article.appendChild(crossIcon);
	articles.push(article);
	article.addEventListener("mousedown",enableDragging);
	article.addEventListener("mouseup",disableDragging);
	
	return article;
}

marksAndTasks.forEach(addActive);
taskCompletedCleaner.addEventListener("click",function(){
	for(let i =0;i<articles.length;i++){
		if(articles[i].classList.contains("active")){
			let articleToRemove= articles[i];
			articleToRemove.parentElement.removeChild(articleToRemove);
		}
	}
});
activeFilter.addEventListener("click", enableActiveFilter);
completedFilter.addEventListener("click", enableCompletedFilter);
allFilter.addEventListener("click",enableAllFilter);
crossIcons.forEach(enableRemoveArticle);

input.addEventListener("keydown",function(event){
	if(event.key == "Enter" && this.value != ""){
		let article = createArticle(this);
		tasksSection.insertBefore(article,taskCompletedCleaner.parentElement);
		this.value = "";
	}
});

const resObserv = new ResizeObserver(entries => {
	for(let entry of entries){
		if(entry.contentRect.width >= 652){
			taskCompletedCleaner.parentElement.insertBefore(filterContainer,taskCompletedCleaner);
		}
		else{
			tasksSection.nextElementSibling.insertBefore(filterContainer,null);
		};
	}
});
resObserv.observe(main);

function mouseMove(e){
	let elementStyles = window.getComputedStyle(e.currentTarget);
	let left = parseInt(elementStyles.left);
	let top = parseInt(elementStyles.top);
	e.currentTarget.style.left = `${left + e.movementX}px`;
	e.currentTarget.style.top = `${top + e.movementY}px`;
	e.currentTarget.classList.add("dragging");
	if(e.target.tagName != "ARTICLE"){
		preventClick = true;
	};
	e.currentTarget.style.visibility="hidden";
	let articleBelow = document.elementFromPoint(e.clientX,e.clientY);
	e.currentTarget.style.visibility="visible";
	if(articleBelow.tagName == "SECTION" && prevArticle){
		console.log("prev article :",prevArticle);
		articleBelow = prevArticle;
		console.log("section before =>",articleBelow);
	}
	if(articleBelow.tagName == "SPAN" || articleBelow.tagName == "IMG" || articleBelow.tagName == "DIV"){
		articleBelow = articleBelow.parentElement;
	};

	if(e.currentTarget.tagName == "ARTICLE" && articleBelow.tagName == "ARTICLE"){
		if(!prevArticle){
			prevArticle = articleBelow;
			console.log("prev article added first time :",prevArticle);
		}
		else if(prevArticle !== articleBelow){
			prevArticle.style.margin = "0";
			prevArticle = articleBelow;
		}
		let targetRect = e.currentTarget.getBoundingClientRect();
		let belowElRect = articleBelow.getBoundingClientRect();
		if(targetRect.top <= belowElRect.top + belowElRect.height * .10){
			articleBelow.style.marginTop = `${targetRect.height}px`;
			articleBelow.style.marginBottom = `0`;
		}
		else if(targetRect.bottom >= belowElRect.bottom - belowElRect.height * .10){
			articleBelow.style.marginBottom = `${targetRect.height}px`;
			articleBelow.style.marginTop = `0`;
		}
	}
	if(!usedDragging){
		usedDragging=true;
	}
}

function enableDragging(e){
	e.currentTarget.addEventListener("mousemove",mouseMove);
};

function disableDragging(e){
	if(usedDragging){
		if(prevArticle.style.marginTop != "0px"){
			tasksSection.insertBefore(e.currentTarget,prevArticle);
		}
		else if(prevArticle.style.marginBottom != "0px"){
			tasksSection.insertBefore(e.currentTarget,prevArticle.nextElementSibling);
		}
		prevArticle.style.margin = "0";
	}
	e.currentTarget.classList.remove("dragging");
	e.currentTarget.style.left="initial";
	e.currentTarget.style.top="initial";
	e.currentTarget.removeEventListener("mousemove",mouseMove);
	prevArticle = "";
	usedDragging = false;
};

articles.forEach(function(element){
	element.addEventListener("mousedown",enableDragging);
	element.addEventListener("mouseup",disableDragging);
});
