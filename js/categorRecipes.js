function categorRecipesListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#categorRecipes/create", html: "Создать рецепт" })


    fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipe-categories/")
        .then((res) => res.json())
        .then((res) => {
            console.log(res);

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