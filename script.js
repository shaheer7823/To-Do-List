var tasks = [];

function addTask() {
    var taskInput = document.getElementById("task-input");
    var taskText = taskInput.value.trim();
    
    if (!taskText) {
        alert("Please enter a task.");
        return;
    }

    var now = new Date();
    var date = now.toLocaleDateString();
    var time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    var task = {
        id: Date.now(),
        text: taskText,
        date: date,
        time: time
    };

    tasks.push(task);
    renderTasks();
    clearInput();
}

function clearInput() {
    document.getElementById("task-input").value = "";
}

function renderTasks() {
    var taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        var taskItem = document.createElement("li");
        taskItem.className = "task-item";

        taskItem.innerHTML = `
            <div class="task-text">
                <strong>${task.text}</strong>
                <span>Added on: ${task.date} at ${task.time}</span>
            </div>
            <div class="task-actions">
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(taskItem);
    });
}

function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
}

function editTask(id) {
    var task = tasks.find((task) => task.id === id);
    var newText = prompt("Edit your task:", task.text);

    if (newText === null || newText.trim() === "") {
        alert("Task text cannot be empty.");
        return;
    }

    task.text = newText.trim();
    renderTasks();
}

renderTasks();
