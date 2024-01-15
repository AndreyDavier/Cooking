function unitsListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#units/create", html: "Создать единицу" })

    let ul = tag({ tag: "ul", className: "unitsList", parent: document.body })

    api.units.list().then((res) => {

        for (let item of res.data) {

            let li = tag({ tag: "li", className: "listitem", parent: ul, html: item.name })

            tag({ tag: "a", className: "delete-link", parent: li, html: "Удлаить", href: `#units/delete/${item.id}` })
            tag({ tag: "a", className: "update-link", parent: li, html: "Редактировать", href: `#units/update/${item.id}` })
        }

    })

}

function unitsDelete(unitId) {
    let load = loading()

    api.units.delete(unitId).then(() => {
        location.hash = "#units/list"
    })
}

function createTags(value) {
    tag({ tag: "h4", className: "header", parent: document.body, html: "Eдиницы" })

    let divForm = tag({ tag: "div", className: "divForm", parent: document.body })
    let input = tag({ tag: "input", className: "input", parent: divForm, value: value })
    let button = tag({ tag: "button", className: "button", parent: divForm, html: "Сохранить" })

    return {
        input,
        button
    }
}

function unitsUpdate(unitId) {
    let load = loading()

    fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/units/${unitId}`)
        .then((res) => res.json())
        .then((res) => {
            load.remove();
            let form = createTags(res.name)

            form.button.addEventListener("click", () => {

                api.units.update(form.input.value, unitId).then(() => {
                    load.remove()
                    location.hash = "#units/list"
                })
            })
        })


}

function unitsCreate() {

    let form = createTags()

    form.button.addEventListener("click", (e) => {
        api.units.create(form.input.value).then(() => {
            location.hash = "#units/list"
        })
    })

}