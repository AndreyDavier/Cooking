function categoriesListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#categories/create", html: "Создать категорию" })

    let ul = tag({ tag: "ul", className: "categoriesList", parent: document.body })


    api.categories.list().then((res) => {
        for (let item of res.data) {
            let li = tag({ tag: "li", className: "listitem", parent: ul, html: item.name })

            tag({ tag: "a", className: "delete-link", parent: li, html: "Удалить", href: `#categories/delete/${item.id}` })
            tag({ tag: "a", className: "update-link", parent: li, html: "Редактировать", href: `#categories/update/${item.id}` })
        }

    })


}

function categoriesDelete(categoriesID) {
    let load = loading()

    api.categories.delete(categoriesID).then(() => {
        location.hash = "#categories/list"
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

function categoriesUpdate(categoriesID) {

    let load = loading()

    fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/product-categories/${categoriesID}`)
        .then((res) => res.json())
        .then((res) => {
            load.remove()
            let form = createTags(res.name)

            form.button.addEventListener("click", () => {

                api.categories.update(form.input.value, categoriesID).then(() => {
                    load.remove()
                    location.hash = "#categories/list"
                })
            })
        })

}

function categoriesCreate() {

    let form = createTags()

    form.button.addEventListener("click", (e) => {
        api.categories.create(form.input.value).then(() => {
            location.hash = "#categories/list"
        })
    })
}