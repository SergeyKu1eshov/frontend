// BEGIN
export default (list) => {
    let container = document.querySelector(".container");
    for (let el of list) {
        let button = document.createElement("button");
        button.setAttribute("class", "btn btn-primary");
        button.append(document.createTextNode(el.name));
        button.addEventListener("click", () => {
            let div = container.querySelector("div");
            if (div) {
                let text_prev = div.textContent;
                div.textContent = el.description;
                if (text_prev == div.textContent)
                    div.remove();
            } else {
                div = document.createElement("div");
                div.append(document.createTextNode(el.description));
                container.append(div);
            }
        });
        container.append(button);
    }
};
// END