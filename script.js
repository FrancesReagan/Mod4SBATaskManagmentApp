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

//
