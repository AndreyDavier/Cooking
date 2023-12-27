function unitsListRender() {
    let tagA = document.createElement("a");
    tagA.href = "#units/create";
    tagA.innerHTML = "Создать единицу";
    document.body.append(tagA);


    fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/units/")
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            
        })

}

function unitsCreate() {
    tagH1 = document.createElement("h4");
    tagH1.innerHTML = "Eдиницы";
    document.body.appendChild(tagH1);
    let input = tag({ tag: "input", className: "input", parent: document.body })
    let button = tag({ tag: "button", className: "button", parent: document.body })

    button.addEventListener("click", (e) => {
        fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/units/", {
            method: "PUT",
            body: JSON.stringify({
                name: input.value
            })
        }).then(() => {
            location.hash = "#units/list"
        })
    })

}