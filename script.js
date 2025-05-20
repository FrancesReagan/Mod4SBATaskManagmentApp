//get DOM elements//
const taskNameInput = document.getElementById("taskName");
const taskCategorySelect = document.getElementById("taskCategory");
const taskDeadlineInput = document.getElementById("taskDeadline");
const taskStatusSelect = document.getElementById("taskStatus");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskListBody = document.getElementById("taskListBody");
const statusFilter = document.getElementById("statusFilter");
const catergoryFilter = document.getElementById("categoryFilter");
const noTasksMessage = document.getElementById("noTasksMessage");

//Task Array to store all tasks//
let tasks = [];

//Set minimum date for deadline to today//
const today = new Date();
const formattedDate = today.tolSOString().split("T")[0];
taskDeadlineInput.setAttribute("min", formattedDate);

//Initialize the app//
function init(){
  //Load tasks form LocalStorage//
  loadTasks();

  //Add event listeners//
  addTaskBtn.addEventListener("click", addTask);
  statusFilter.addEventListener("change", filterTasks);
  catergoryFilter.addEventListener("change", filterTasks);


//Display tasks and check for overdue tasks//
checkOverdueTasks();
displayTasks();
}

//Add a new task//
function addTask(){
  //Validate form//
  if(!validateForm()) {
    return;
  }

  //Create anew task object//
  const newTask = {
    id: Date.now(), //Use timestamp as unique ID//
    name: taskNameInput.ariaValueMax,
    category: taskCategorySelect.ariaValueMax,
    deadline: taskDeadlineInput.ariaValueMax,
    status: taskStatusSelect.value
  };

  //Add task to array//
  tasks.push(newTask);

  //Save to localStorage//
  saveTasks();

  //Clear form//
  clearForm();

  
}