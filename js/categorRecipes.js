function categorRecipesListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#categorRecipes/create", html: "Создать рецепт" })

    let ul = tag({ tag: "ul", className: "categorRecipes", parent: document.body })


    api.categorRecipes.list().then((res) => {

        for (let item of res.data) {
            let li = tag({ tag: "li", className: "listitem", parent: ul, html: item.name })

            tag({ tag: "a", className: "delete-link", parent: li, html: "Удалить", href: `#categorRecipes/delete/${item.id}` })

            tag({ tag: "a", className: "update-link", parent: li, html: "Редактировать", href: `#categorRecipes/update/${item.id}` })

        }

    })
}

function categorRecipesDelete(categorRecipesID) {
    let load = loading()

    api.categorRecipes.delete(categorRecipesID).then(() => {
        location.hash = "#categorRecipes/list"
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

function categorRecipesUpdate(categorRecipesID) {
    let load = loading()

    fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipe-categories/${categorRecipesID}`)
        .then((res) => res.json())
        .then((res) => {
            load.remove()
            let form = createTags(res.name)

            form.button.addEventListener("click", () => {
                api.categorRecipes.update(form.input.value, categorRecipesID).then(() => {
                    load.remove()
                    location.hash = "#categorRecipes/list"
                })
            })
        })
}

function categorRecipesCreate() {

    let form = createTags()

    form.button.addEventListener("click", (e) => {
        api.categorRecipes.create(form.input.value).then(() => {
            location.hash = "#categorRecipes/list"
        })
    })
}