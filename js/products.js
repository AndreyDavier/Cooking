function productsListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#products/create", html: "Создать продукт" })

    let ul = tag({ tag: "ul", className: "productsList", parent: document.body })

    api.products.list().then((res) => {

        for (let item of res.data) {

            let li = tag({ tag: "li", className: "listitem", parent: ul, html: item.name })

            tag({ tag: "a", className: "delete-link", parent: li, html: "Удалить", href: `#products/delete/${item.id}` })

            tag({ tag: "a", className: "update-link", parent: li, html: "Редактировать", href: `#products/update/${item.id}` })
        }

    })
}

function productsDelete(productsID) {
    let load = loading()

    api.products.delete(productsID).then(() => {
        location.hash = "#products/list"
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


function productsUpdate(productsID) {

    let load = loading()

    fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/products/${productsID}`)
        .then((res) => res.json())
        .then((res) => {
            load.remove();
            let form = createTags(res.name)

            form.button.addEventListener("click", () => {
                api.products.update(form.input.value, productsID).then(() => {
                    load.remove()
                    location.hash = "#products/list"
                })
            })
        })
}


function productsCreate() {

    let form = createTags()

    form.button.addEventListener("click", (e) => {
        api.products.create(form.input.value).then(() => {
            location.hash = "#products/list"
        })
    })
}