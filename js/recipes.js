function recipesListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#recipes/create", html: "Создать категорию" })

    let ul = tag({ tag: "ul", className: "recipesList", parent: document.body })


    api.recipes.list().then((res) => {

        for (let item of res.data) {

            let li = tag({ tag: "li", className: 'listitem', parent: ul, html: item.name })

            tag({ tag: "a", className: "delete-link", parent: li, html: "Удалить", href: `#recipes/delete/${item.id}` })

            tag({ tag: "a", className: "update-link", parent: li, html: "Редактировать", href: `#recipes/update/${item.id}` })
        }

    })
}

function recipesDelete(recipesID) {
    let load = loading()

    api.recipes.delete(recipesID).then(() => {
        location.hash = "#recipes/list"
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

function recipesUpdate(recipesID) {

    let load = loading()

    fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipies/${recipesID}`)
        .then((res) => res.json())
        .then((res) => {
            load.remove()

            let form = createTags(res.name)

            form.button.addEventListener("click", () => {
                api.recipes.update(form.input.value, recipesID).then(() => {
                    load.remove()
                    location.hash = "#recipes/list"
                })
            })
        })
}

function recipesCreate() {

    let form = createTags()

    form.button.addEventListener("click", (e) => {
        api.recipes.create(form.input.value).then(() => {
            location.hash = "#recipes/list"
        })
    })
}