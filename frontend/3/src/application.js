// BEGIN

export default (list) => {
    let result = document.querySelector(".result");
    let processor_options = document.querySelector("select[name=processor_eq]");
    let memory_options = document.querySelector("select[name=memory_eq]");
    let frequency_min_input = document.querySelector("input[name=frequency_gte]");
    let frequency_max_input = document.querySelector("input[name=frequency_lte]");

    let change = () => {
        Array.from(result.querySelectorAll("li")).map(el => el.remove());
        let frequency_min = +frequency_min_input.value;
        if (frequency_min == 0)
            frequency_min = -Infinity;
        let frequency_max = +frequency_max_input.value;
        if (frequency_max == 0)
            frequency_max = Infinity;
        let proccessor = processor_options.value;
        let memory = memory_options.value;
        for (let el of list) {
            if (el.frequency >= frequency_min & el.frequency <= frequency_max & (el.processor == proccessor | proccessor == "") & (el.memory == memory | memory == "")) {
                let li = document.createElement("li");
                li.append(document.createTextNode(el.model));
                result.append(li);
            }
        }
    };
    change();
    processor_options.addEventListener("change", change);
    memory_options.addEventListener("change", change);
    frequency_min_input.addEventListener("input", change);
    frequency_max_input.addEventListener("input", change);
};

// END