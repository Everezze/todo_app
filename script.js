const checkMarks = Array.from(document.querySelectorAll("section .circle"));
const tasks = Array.from(document.querySelectorAll("article span"));
const marksAndTasks =checkMarks.concat(tasks);
const crossIcons = document.querySelectorAll("section .cross-icon");
const taskCompletedCleaner = document.querySelector("section aside span:last-child");
const activeFilter = document.querySelector("main>aside div span:nth-child(2)");
const completedFilter = document.querySelector("main>aside div span:nth-child(3)");
const allFilter = document.querySelector("main>aside div span:nth-child(1)");
const tasksSection = document.querySelector("section");
const articles = Array.from(document.querySelectorAll("section article"));
const input = document.querySelector("input");

console.log(checkMarks);
console.log(tasks);
console.log(crossIcons);
console.log(taskCompletedCleaner);
console.log(marksAndTasks);

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
		let article = document.createElement("article");
		let circle = document.createElement("div");
		let img= document.createElement("img");
		let span = document.createElement("span");
		let crossIcon = document.createElement("img");
		crossIcon.setAttribute("src","images/icon-cross.svg");
		crossIcon.classList.add("cross-icon");
		enableRemoveArticle(crossIcon);
		img.setAttribute("src","images/icon-check.svg");
		span.textContent = this.value;
		addActive(span);
		addActive(circle);
		circle.classList.add("circle");
		circle.appendChild(img);
		article.appendChild(circle);
		article.appendChild(span);
		article.appendChild(crossIcon);
		//articles.push(article);

		tasksSection.insertBefore(article,taskCompletedCleaner.parentElement);
	}
});
