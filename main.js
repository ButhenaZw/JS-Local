document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginBtn");
    if (loginButton) {
        const emailInput = document.getElementById("email");
        const emailError = document.getElementById("emailError");
        const passwordInput = document.getElementById("password");

        loginButton.addEventListener("click", (event) => {
            event.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            let isValid = true;

            if (!emailRegex.test(email)) {
                emailError.textContent = "Invalid email";
                isValid = false;
            } else {
                emailError.textContent = "";
            }
            if (!passwordRegex.test(password)) {
                passwordInput.nextElementSibling.textContent =
                    "The Password must contain 8 Characters, number, and special Characters";
                isValid = false;
            } else {
                passwordInput.nextElementSibling.textContent = "";
            }
            if (isValid) {
                const username = email.split("@")[0];
                localStorage.setItem("username", username);
                alert(`Welcome, ${username}!`);
                window.location.href = "index.html";
            }
        });
    }
    const taskInput = document.getElementById("taskinput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const deleteCheckedButton = document.getElementById("deleteChecked");

    if (taskInput && addTaskButton) {
        addTaskButton.addEventListener("click", addTask);

        taskInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                addTask();
            }
        });

        deleteCheckedButton.addEventListener("click", deleteCheckedTasks);

        function addTask() {
            const inputTask = taskInput.value.trim();
            if (inputTask === "") {
                alert("Please enter a task.");
                return;
            }

            const listItem = document.createElement("li");
            listItem.classList.add("task-item", "d-flex", "align-items-center", "mb-3");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("form-check-input", "me-2");

            const span = document.createElement("span");
            span.textContent = inputTask;
            span.classList.add("task-text", "flex-grow-1");

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.classList.add("btn", "btn-warning", "me-2");
            editBtn.addEventListener("click", () => editTask(span));

            const completeBtn = document.createElement("button");
            completeBtn.textContent = "Complete";
            completeBtn.classList.add("btn", "btn-success", "me-2");
            completeBtn.addEventListener("click", () => toggleComplete(span));

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("btn", "btn-danger");
            deleteBtn.addEventListener("click", () => listItem.remove());

            listItem.append(checkbox, span, editBtn, completeBtn, deleteBtn);
            taskList.appendChild(listItem);

            taskInput.value = "";
        }

        function editTask(taskText) {
            const currentText = taskText.textContent;
            const input = document.createElement("input");
            input.type = "text";
            input.value = currentText;
            input.classList.add("form-control", "me-2");

            taskText.replaceWith(input);

            input.addEventListener("keypress", (event) => {
                if (event.key === "Enter") {
                    const newText = input.value.trim();
                    if (newText) {
                        taskText.textContent = newText;
                        input.replaceWith(taskText);
                    }
                }
            });
        }

        function toggleComplete(taskText) {
            taskText.classList.toggle("completed");
        }

        function deleteCheckedTasks() {
            const checkedTasks = taskList.querySelectorAll("input:checked");
            checkedTasks.forEach(task => task.parentElement.remove());
        }
    }
});
