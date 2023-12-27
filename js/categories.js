function categoriesListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#categories/create", html: "Создать категорию" })

    fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/product-categories/")
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
        })


}

function categoriesCreate() {
    
    tag({ tag: "h4", className: "header", parent: document.body, html: "Создание категории" })

    let ul = tag({ tag: "ul", className: "categoriesList", parent: document.body })

    let divForm = tag({ tag: "div", className: "divForm", parent: document.body })
    let input = tag({ tag: "input", className: "input", parent: divForm })
    let button = tag({ tag: "button", className: "button", parent: divForm, html: "Сохранить" })

    button.addEventListener("click", (e) => {
        fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/product-categories/", {
            method: "PUT",
            body: JSON.stringify({
                name: input.value
            })
        }).then(() => {
            location.hash = "#categories/list"
        })
    })
}