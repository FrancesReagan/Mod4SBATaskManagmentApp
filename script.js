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

  //Create a new task object//
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

  //Update display//
  checkOverdueTasks();
  displayTasks();

  //Validate the form inputs//
  function validateForm() {
    if(taskNameInput.value.trim()==="") {
      alert("Please enter a task name");
      return false;
    }

    if(!taskDeadlineInput.value){
      alert("Please select a deadline");
      return false;
    }

    return true;
  }

  //Clear the form inputs//
  function clearForm(){
    taskNameInput.value = "";
    taskCategorySelect.selectedIndex = 0;
    taskDeadlineInput.value = "";
    taskStatusSelect.selectedIndex = 0;
  }

  //Display tasks in the table//
  function displayTasks(){
    //Clear the task list//
    taskListBody.innerHTML = "";

    //Get filter values//
    const statusFilterValue = statusFilter.value;
    const categoryFilterValue = catergoryFilter.value;

    //Filter tasks based on selected filters//
    let filteredTasks = tasks;

    if(statusFilterValue!=="All"){
      filteredTasks = filteredTasks.filter(task => task.status === statusFilterValue);
    }

    if(categoryFilterValue!==="All"){
      filteredTasks = filteredTasks.filter(task=>task.category===categoryFilterValue);
    }

    //Display message if no tasks//
    if(filteredTasks.legnth===0){
      noTasksMessage.classList.remove("hidden");
    } else {
      noTasksMessage.classList.add("hidden");
    }

    //Display filtered tasks//
    filteredTasks.forEach(task=>{
      //Create table row//
      const row = document.createElement("tr");

      //Format the date//
      const deadlineDate = newDate(task.deadline);
    })
    }
  }
}