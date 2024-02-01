function recipesListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#recipes/create", html: "Создать категорию" });

    let ul = tag({ tag: "ul", className: "recipesList", parent: document.body });


    api.recipes.list().then((res) => {

        for (let item of res.data) {

            let li = tag({ tag: "li", className: 'listitem', parent: ul, html: item.name });

            tag({ tag: "a", className: "delete-link", parent: li, html: "Удалить", href: `#recipes/delete/${item.id}` });

            tag({ tag: "a", className: "update-link", parent: li, html: "Редактировать", href: `#recipes/update/${item.id}` });
        }

    })
}

function recipesDelete(recipesId) {
    let load = loading();

    api.recipes.delete(recipesId).then(() => {
        location.hash = "#recipes/list";
    })
}
// RECIPESFORM
function recipesForm(html, value, categorRecipesId) {

    let load = loading();

    tag({ tag: "h4", className: "header", parent: document.body, html: html });

    let divForm = tag({ tag: "div", className: "divForm", parent: document.body });
    let input = tag({ tag: "input", className: "input", parent: divForm, value: value });

    let divSelect = tag({ tag: "div", className: 'div-select', parent: divForm });

    let selectCategoreiesRecipes = createSelect(divSelect, categorRecipesId)
    console.log(selectCategoreiesRecipes.value);

    let recipePlus = tag({ tag: "button", className: "button-plus", parent: divSelect, html: "+" })


    recipePlus.addEventListener("click", () => {
        let popupBg = tag({ tag: "div", className: "popup-bg", parent: document.body })
        let popupContent = tag({ tag: "div", className: "popup-content", parent: popupBg })

        categorRecipesCreate({
            parent: popupContent,
            afterCreate: (responce) => {
                popupBg.remove();

                api.categorRecipes.list().then((res) => {
                    selectCategoreiesRecipes.innerHTML = ''

                    for (let categoriesRecipes of res.data) {
                        let options = tag({ tag: "option", className: "option", parent: selectCategoreiesRecipes, html: categoriesRecipes.name, value: categoriesRecipes.id })

                        selectCategoreiesRecipes.value = responce.id
                    }
                })
            }
        })

    })

    let categoriesRecipes = api.categorRecipes.list().then((res) => {
        for (let categoriesRecipes of res.data) {
            let options = tag({ tag: "option", className: "option", parent: selectCategoreiesRecipes, html: categoriesRecipes.name, value: categoriesRecipes.id })
        }

    })

    let button = tag({ tag: "button", className: "button", parent: divForm, html: "Сохранить" });

    Promise.all([categoriesRecipes]).then(() => {
        load.remove()
    })

    return {
        input,
        button,
        selectCategoreiesRecipes
    };
}

function recipesUpdate(recipesId) {

    let load = loading();


    api.recipes.read(recipesId).then((res) => {
        load.remove();
        console.log(res);
        let form = recipesForm("Категория", res.name, res.recipe_category_id);

        form.button.addEventListener("click", () => {
            api.recipes.update(form.input.value, recipesId, form.selectCategoreiesRecipes.value).then(() => {
                load.remove();
                location.hash = "#recipes/list";
            })
        })
    })
}

function recipesCreate() {

    let form = recipesForm("Создание рецепта");

    form.button.addEventListener("click", () => {
        api.recipes.create(form.input.value, form.selectCategoreiesRecipes.value).then(() => {
            location.hash = "#recipes/list";
        })
    })
}