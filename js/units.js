function unitsListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#units/create", html: "Создать единицу" })


    fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/units/")
        .then((res) => res.json())
        .then((res) => {
            console.log(res.data[0].name);
            // for (let item of res.data) {

            // }

        })

}

function unitsCreate() {

    tag({ tag: "h4", className: "header", parent: document.body, html: "Eдиницы" })


    let ul = tag({ tag: "ul", className: "unitsList", parent: document.body })

    let divForm = tag({ tag: "div", className: "divForm", parent: document.body })
    let input = tag({ tag: "input", className: "input", parent: divForm })
    let button = tag({ tag: "button", className: "button", parent: divForm, html: "Сохранить" })

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