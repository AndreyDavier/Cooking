function unitsListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#units/create", html: "Создать единицу" })

    let ul = tag({ tag: "ul", className: "unitsList", parent: document.body })


    fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/units/")
        .then((res) => res.json())
        .then((res) => {

            for (let item of res.data) {
                let li = tag({ tag: "li", className: "listitem", parent: ul, html: item.name })
                tag({ tag: "a", className: "delete-link", parent: li, html: "Удлаить", href: `#units/delete/${item.id}` })

                tag({ tag: "a", className: "update-link", parent: li, html: "Редактировать", href: `#units/update/${item.id}` })

            }

        })

}
function unitsDelete(unitId) {
    console.log(document.body.innerHTML = "loading...");
    fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/units/${unitId}`, {
        method: "DELETE"
    }).then(() => {
        location.hash = "#units/list"
    })
    console.log(unitId);
}

function unitsUpdate(unitId) {
    document.body.innerHTML = "loading..."

    fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/units/${unitId}`)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            tag({ tag: "h4", className: "header", parent: document.body, html: "Eдиницы" })

            let divForm = tag({ tag: "div", className: "divForm", parent: document.body })
            let input = tag({ tag: "input", className: "input", parent: divForm, value: `${res.name}` })

        })


}

function unitsCreate() {

    tag({ tag: "h4", className: "header", parent: document.body, html: "Eдиницы" })

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