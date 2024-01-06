function productsListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#products/create", html: "Создать продукт" })

    let ul = tag({ tag: "ul", className: "productsList", parent: document.body })

    fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/products/")
        .then((res) => res.json())
        .then((res) => {

            for (let item of res.data) {

                let li = tag({ tag: "li", className: "listitem", parent: ul, html: item.name })

                tag({ tag: "a", className: "delete-link", parent: li, html: "Удалить", href: `#products/delete/${item.id}` })

                tag({ tag: "a", className: "update-link", parent: li, html: "Редактировать", href: `#products/update/${item.id}` })
            }

        })
}

function productsDelete(productsID) {
    console.log(document.body.innerHTML = "loading...");

    fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/products/${productsID}`, {
        method: "DELETE"
    }).then(() => {
        location.hash = "#products/list"
    })
}

function productsUpdate(productsID) {
    document.body.innerHTML = "loading..."

    fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/products/${productsID}`)
        .then((res) => res.json())
        .then((res) => {

            tag({ tag: "h4", className: "header", parent: document.body, html: "Продукты" })

            let divForm = tag({ tag: "div", className: "divForm", parent: document.body })
            let input = tag({ tag: "input", className: "input", parent: divForm, value: `${res.name}` })
        })
}


function productsCreate() {

    tag({ tag: "h4", className: "header", parent: document.body, html: "Продукты" })

    let divForm = tag({ tag: "div", className: "divForm", parent: document.body })
    let input = tag({ tag: "input", className: "input", parent: divForm })
    let button = tag({ tag: "button", className: "button", parent: divForm, html: "Сохранить" })

    button.addEventListener("click", (e) => {
        fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/products/", {
            method: "PUT",
            body: JSON.stringify({
                name: input.value
            })
        }).then(() => {
            location.hash = "#products/list"
        })
    })
}