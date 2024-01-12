function categorRecipesListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#categorRecipes/create", html: "Создать рецепт" })

    let ul = tag({ tag: "ul", className: "categorRecipes", parent: document.body })

    fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipe-categories/")
        .then((res) => res.json())
        .then((res) => {

            for (let item of res.data) {
                let li = tag({ tag: "li", className: "listitem", parent: ul, html: item.name })

                tag({ tag: "a", className: "delete-link", parent: li, html: "Удалить", href: `#categorRecipes/delete/${item.id}` })

                tag({ tag: "a", className: "update-link", parent: li, html: "Редактировать", href: `#categorRecipes/update/${item.id}` })

            }

        })
}

function categorRecipesDelete(categorRecipesID) {
    document.body.innerHTML = "loading...";

    fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipe-categories/${categorRecipesID}`, {
        method: "DELETE"
    }).then(() => {
        location.hash = "#categorRecipes/list"
    })
}

function categorRecipesUpdate(categorRecipesID) {
    
    fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipe-categories/${categorRecipesID}`)
        .then((res) => res.json())
        .then((res) => {
            tag({ tag: "h4", className: "header", parent: document.body, html: "Рецепты" })

            let divForm = tag({ tag: "div", className: "divForm", parent: document.body })
            let input = tag({ tag: "input", className: "input", parent: divForm, value: `${res.name}` })
        })
}

function categorRecipesCreate() {

    tag({ tag: "h4", className: "header", parent: document.body, html: "Рецепты" })

    let ul = tag({ tag: "ul", className: "crList", parent: document.body })

    let divForm = tag({ tag: "div", className: "divForm", parent: document.body })
    let input = tag({ tag: "input", className: "input", parent: divForm })
    let button = tag({ tag: "button", className: "button", parent: divForm, html: "Сохранить" })

    button.addEventListener("click", (e) => {
        fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipe-categories/", {
            method: "PUT",
            body: JSON.stringify({
                name: input.value
            })
        }).then(() => {
            location.hash = "#units/list"
        })
    })
}