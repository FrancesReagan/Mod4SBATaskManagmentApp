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
      const formattedDeadline = deadlineDate.toLocaleDateString("en-US",{
        year:"numeric",
        month:"short",
        day: "numeric"
      });

      //Add status class for styling//
      const statusClass=task.status.toLowerCase().replace("","-");

      //Create row HTML//
      row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.category}</td>
      <td>${formattedDeadline}</td>
      <td>
        <select class="status-dropdown ${statusClass}" data-id="${task.id}">
          <option value="Not Started" ${task.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
          <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
          <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
         <option value="Overdue" ${task.status === 'Overdue' ? 'selected' : ''} ${task.status === 'Overdue' ? 'disabled' : ''}>Overdue</option>
        </select>
      </td>
    <td>
      <button class="delete-btn" data-id="${task.id}">Delete</button>
    </td>
    `;
    //Add row to table//
    taskListBody.appendChild(row);
    });

    //Add event listeners to status dropdowns and delete buttons//
    addTaskEventListeners();
    }
    //Add event listeners to the dynamically created task elements//
    function addTaskEventListeners(){
      //Add event listeners to status dropdowns//
      const statusDropdowns = document.querySelectorAll(".status-dropdown");
      statusDropdowns.forEach(dropdown =>{
        dropdown.addEventListener("change",updateTaskStatus);
      });
      //Add event listeners to delete buttons//
      const deleteButtons = document.querySelectorAll(".delete-btn");
      deleteButtons.forEach(button=>{
        button.addEventListener("click",deleteTask);
      });
    }
    //Update task status
    function updateTaskStatus(e){
      const taskId = parseInt(e.target.getAttribute("data-id"));
      const newStatus = e.target.value;

      //Find the task and update its status//
      const taskIndex = tasks.findIndex(task=>task.id===taskId);
      if(taskIndex!==-1){
        tasks[taskIndex].status = newStatus;
      //Update status class//
      e.target.className = `status-dropdown${newStatus.toLowerCase().replace("","-")}`;

      //Save to localStorage//
      saveTasks();
      //Refresh display in case filters are active//
      displayTasks();
      }
    }
    //Delete a task//
    function deleteTasks(e){
      const taskId=parseInt(e.target.getAttribute("data-id"));

      //confirm deletion//
      if(confirm("Are you sure you want to delete this task?")){
        //filterout the task to delete//
        tasks=tasks.filter(task=>task.id!==taskId);

        //Save to local storage//
        saveTasks();
        //Refresh display//
        displayTasks();
      }
    }
    //Check for overdue tasks//
    function checkOverdueTasks(){
      const currentDate=new Date();
      currentDate.setHours(0,0,0,0);//Set to beginning of day for accurate comparsion//

          tasks.forEach(task => {
        const deadlineDate = new Date(task.deadline);
        deadlineDate.setHours(0, 0, 0, 0); // Set to beginning of day
        
        // Mark as overdue if deadline has passed and task is not completed
        if (deadlineDate < currentDate && task.status !== "Completed") {
            task.status = "Overdue";
        }
    });
    //Save updated tasks to localStorage//
    saveTasks();
    }
    //Filter tasks
    function filterTasks(){
      displayTasks();
    }
    //Save tasks to local storage//
    function saveTasks(){
      localStorage.setItem("tasks",JSON.stringify(tasks));
    }
    //Load tasks from local storage//
    function loadTasks(){
      const storedTasks = localStorage.getItem("tasks");
      if(storedTasks){
        tasks = JSON.parse(storedTasks);
      }
    }
    //Initialize the app when the DOM is loaded//
    document.addEventListener("DOMContentLoaded",init);
  }
