const checkMarks = Array.from(document.querySelectorAll("section .circle"));
const tasks = Array.from(document.querySelectorAll("article span"));
const marksAndTasks =checkMarks.concat(tasks);
const crossIcons = document.querySelectorAll("section .cross-icon");
const taskCompletedCleaner = document.querySelector("section aside span:last-child");
const activeFilter = document.querySelector("main>aside div span:nth-child(2)");
const completedFilter = document.querySelector("main>aside div span:nth-child(3)");
const allFilter = document.querySelector("main>aside div span:nth-child(1)");
const tasksSection = document.querySelector("section");

console.log(checkMarks);
console.log(tasks);
console.log(crossIcons);
console.log(taskCompletedCleaner);
console.log(marksAndTasks);

marksAndTasks.forEach(function(element){
	element.addEventListener("click",function(){
		element.parentElement.classList.toggle("active");
	});
});

taskCompletedCleaner.addEventListener("click",function(){
	for(let i =0;i<checkMarks.length;i++){
		if(checkMarks[i].classList.contains("active")){
			let articleToRemove= checkMarks[i].parentElement;
			articleToRemove.parentElement.removeChild(articleToRemove);
		}
	}
});

activeFilter.addEventListener("click",function(){
	tasksSection.classList.toggle("active-filter");
	tasksSection.classList.remove("completed-filter");
});

completedFilter.addEventListener("click",function(){
	tasksSection.classList.toggle("completed-filter");
	tasksSection.classList.remove("active-filter");
});

allFilter.addEventListener("click",function(){
	tasksSection.classList.remove("completed-filter");
	tasksSection.classList.remove("active-filter");
});

crossIcons.forEach(function(element){
	element.addEventListener("click",function(){
		let articleToRemove = this.parentElement;
		articleToRemove.parentElement.removeChild(articleToRemove);
	});
});
