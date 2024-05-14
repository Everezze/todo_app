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

function addActive(element){
	element.addEventListener("click",function(){
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

function enableallFilter(){
	tasksSection.classList.remove("completed-filter");
	tasksSection.classList.remove("active-filter");
};

function enableRemoveArticle(element){
	element.addEventListener("click",function(){
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
allFilter.addEventListener("click",enableallFilter);
crossIcons.forEach(enableRemoveArticle);

input.addEventListener("keydown",function(event){
	if(event.key == "Enter" && this.value != ""){
		let article = createArticle(this);
		tasksSection.insertBefore(article,taskCompletedCleaner.parentElement);
		this.value = "";
	}
});

const resObserv = new ResizeObserver(entries => {
	//console.log("entered resize event");
	//console.log(tasksSection.nextElementSibling);
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
	//e.currentTarget.setAttribute("hidden",true);
	e.currentTarget.hidden=true;
	console.log("e.target: ",e.target);
	let articleBelow = document.elementFromPoint(e.clientX,e.clientY);
	console.log("article below: ",articleBelow);
	//console.log("X: ",e.clientX,"Y: ",e.clientY);
	//e.stopPropagation();
	let elementStyles = window.getComputedStyle(e.target);
	let left = parseInt(elementStyles.left);
	let top = parseInt(elementStyles.top);
	e.currentTarget.style.left = `${left + e.movementX}px`;
	e.currentTarget.style.top = `${top + e.movementY}px`;
}

articles.forEach(function(element){
	element.addEventListener("mousedown",function(e){
		//e.stopPropagation();
		console.log(e.currentTarget);
		element.classList.add("dragging");
		articles.forEach(function(element){
			element.addEventListener("mousemove",mouseMove);
		});
	});

	element.addEventListener("mouseup",function(){
		element.classList.remove("dragging");
		element.style.left= "initial";
		element.style.top= "initial";
		//element.removeEventListener("mousemove",mouseMove);
		articles.forEach(function(element){
			element.removeEventListener("mousemove",mouseMove);
		});
	});
});
