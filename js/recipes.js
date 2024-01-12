function recipesListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#recipes/create", html: "Создать категорию" })

    let ul = tag({ tag: "ul", className: "recipesList", parent: document.body })

    fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipies/")
        .then((res) => res.json())
        .then((res) => {

            for (let item of res.data) {

                let li = tag({ tag: "li", className: 'listitem', parent: ul, html: item.name })

                tag({ tag: "a", className: "delete-link", parent: li, html: "Удалить", href: `#recipes/delete/${item.id}` })

                tag({ tag: "a", className: "update-link", parent: li, html: "Редактировать", href: `#recipes/update/${item.id}` })
            }

        })
}

function recipesDelete(recipesID) {
    document.body.innerHTML = "loading...";

    fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipies/${recipesID}`, {
        method: "DELETE"
    }).then(() => {
        location.hash = "#recipes/list"
    })
}

function recipesUpdate(recipesID) {

    fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipies/${recipesID}`)
        .then((res) => res.json())
        .then((res) => {
            tag({ tag: "h4", className: "header", parent: document.body, html: "Категории" })

            let divForm = tag({ tag: "div", className: "divForm", parent: document.body })
            let input = tag({ tag: "input", className: "input", parent: divForm, value: `${res.name}` })
        })
}

function recipesCreate() {

    tag({ tag: "h4", className: "header", parent: document.body, html: "Категории" })

    let divForm = tag({ tag: "div", className: "divForm", parent: document.body })
    let input = tag({ tag: "input", className: "input", parent: divForm })
    let button = tag({ tag: "button", className: "button", parent: divForm, html: "Сохранить" })

    button.addEventListener("click", (e) => {
        fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipies/", {
            method: "PUT",
            body: JSON.stringify({
                name: input.value
            })
        }).then(() => {
            location.hash = "#recipes/list"
        })
    })
}