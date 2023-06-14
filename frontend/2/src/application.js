import axios from 'axios';

const routes = {
    tasksPath: () => '/api/tasks',
};

// BEGIN
export default async() => {
    let response;
    let tasks = document.querySelector("#tasks");
    let name_task_input = document.querySelector(".form-control");
    let add_task_button = document.querySelector(".btn-primary");
    response = await axios.get(routes.tasksPath());
    if (response.data.items.length != 0) {
        for (let item of response.data.items.reverse()) {
            await axios.post(routes.tasksPath(), item);
            let task = document.createElement("li");
            task.setAttribute("class", "list-group-item");
            task.appendChild(document.createTextNode(item.name));
            tasks.prepend(task);
        }
    } else {
        add_task_button.addEventListener("click", async() => {
            let task = document.createElement("li");
            task.setAttribute("class", "list-group-item");
            task.appendChild(document.createTextNode(name_task_input.value));
            await axios.post(routes.tasksPath(), { name: name_task_input.value });
            tasks.prepend(task);
        });
    }
};
// END