import uniqueId from 'lodash/uniqueId.js';

// BEGIN
export default () => {
    let lists = document.querySelector("div[data-container=lists]");
    let button_lists = document.querySelector("form[data-container=new-list-form]").querySelector(".btn-primary");
    let tasks = document.querySelector("div[data-container=tasks]");
    let button_tasks = document.querySelector("form[data-container=new-task-form]").querySelector(".btn-primary");
    let list_name_input = document.querySelector("#new-list-name");
    let task_name_input = document.querySelector("#new-task-name");
    let lists_ul = document.createElement("ul");
    let tasks_ul = {};
    let name_lists = [];
    let this_list;
    lists.append(lists_ul);

    let create_list = (name_list) => {
        if (!name_lists.includes(name_list)) {
            name_lists.push(name_list);
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.setAttribute("href", `#${name_list}`);
            a.addEventListener("click", () => change_tasks_list(name_list));
            a.append(document.createTextNode(name_list));
            li.append(a);
            lists_ul.append(li);
            tasks_ul[name_list] = [];
        }
        list_name_input.value = "";
    };

    let create_task = (name_list, name_task) => {
        tasks_ul[name_list].push(name_task);
        task_name_input.value = "";
        show_tasks(name_list);
    };

    let show_tasks = (name_list) => {
        let tasks_names = tasks_ul[name_list];
        Array.from(tasks.querySelectorAll("li")).map(el => el.remove());
        for (let task of tasks_names) {
            let li = document.createElement("li");
            li.append(task);
            tasks.append(li);
        }
    };

    let change_tasks_list = (to_change_list) => {
        Array.from(lists_ul.querySelectorAll("li")).map(el => el.remove());
        for (let el of name_lists) {
            let li = document.createElement("li");
            lists_ul.append(li);
            if (el == to_change_list) {
                let b = document.createElement("b");
                b.append(document.createTextNode(el));
                li.append(b);
                this_list = el;
                show_tasks(el);
            } else {
                let a = document.createElement("a");
                a.setAttribute("href", `#${el}`);
                a.addEventListener("click", () => change_tasks_list(el));
                a.append(document.createTextNode(el));
                li.append(a);
            }
        }
    };

    create_list("General");
    change_tasks_list("General");
    button_lists.addEventListener("click", () => create_list(list_name_input.value));
    button_tasks.addEventListener("click", () => create_task(this_list, task_name_input.value));
};
// END