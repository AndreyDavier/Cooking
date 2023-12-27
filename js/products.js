function productsListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#products/create", html: "Создать продукт" })

    fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/products/")
        .then((res) => res.json())
        .then((res) => {
            console.log(res);

        })
}

function productsCreate() {

    tag({ tag: "h4", className: "header", parent: document.body, html: "Продукты" })

    let ul = tag({ tag: "ul", className: "productsList", parent: document.body })

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