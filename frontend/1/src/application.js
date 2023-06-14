// BEGIN
export default () => {
    let input = document.querySelector(".form-control");
    let button_add = document.querySelector(".btn-primary");
    let button_reset = document.querySelector(".btn-outline-primary");
    let result = document.getElementById("result");

    button_add.addEventListener("click", () => {
        input.focus();
        let res = +result.textContent;
        if (input.value != "")
            result.textContent = `${res + +input.value}`;
        input.value = "";
    });

    button_reset.addEventListener("click", () => {
        input.focus();
        result.textContent = "0";
        input.value = "";
    });
};
// END