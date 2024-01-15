function menuListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#menu/create", html: "Создать меню" })

    let ul = tag({ tag: "ul", className: "menulist", parent: document.body })


    api.menu.list().then((res) => {
        console.log(res);

        for (let item of res.data) {

            let li = tag({ tag: "li", className: "listitem", parent: ul, html: item.name })

            tag({ tag: "a", className: "delete-link", parent: li, html: "Удалить", href: `#menu/delete/${item.id}` })

            tag({ tag: "a", className: "update-link", parent: li, html: "Редактировать", href: `#menu/update/${item.id}` })

        }
    })
}

function menuDelete(menuID) {
    let load = loading()

    api.menu.delete(menuID).then(() => {
        location.hash = "#menu/list"
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

function menuUpdate(menuID) {
    let load = loading()

    fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/menu/${menuID}`)
        .then((res) => res.json())
        .then((res) => {
            load.remove()
            let form = createTags(res.name)

            form.button.addEventListener("click", () => {
                api.menu.update(form.input.value, menuID).then(() => {
                    location.hash = "#menu/list"
                })
            })
        })
}

function menuCreate() {

    let form = createTags()

    button.addEventListener("click", (e) => {
        api.menu.create(form.input.value).then(() => {
            location.hash = "#menu/list"
        })
    })
}