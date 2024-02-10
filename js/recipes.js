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
function recipesForm(html, value, categorRecipesId, person) {

    let load = loading();

    tag({ tag: "h4", className: "header", parent: document.body, html: html });

    let divForm = tag({ tag: "div", className: "divForm", parent: document.body });
    let input = tag({ tag: "input", className: "input", parent: divForm, value: value });
    let divSelect = tag({ tag: "div", className: 'div-select', parent: divForm });

    let selectCategoreiesRecipes = createSelect(divSelect, categorRecipesId)
    console.log(selectCategoreiesRecipes.value);

    let recipePlus = tag({ tag: "button", className: "button-plus", parent: divSelect, html: "+" })

    let divPerson = tag({ tag: "div", className: "quatity-block", parent: divForm })
    tag({ tag: "h4", className: "head-quatity", parent: divPerson, html: "Количетсво человек" })
    let inputPerson = tag({ tag: "input", className: "quatity-input", parent: divPerson, value: person })


    tag({ tag: "h4", className: "products-head", parent: divForm, html: "Продукты" })
    let divIngredients = tag({ tag: "div", className: "div-ingredients", parent: divForm })

    let divSelectProducts = tag({ tag: "div", className: 'div-select', parent:  divIngredients });
    let ingredientsSelect = createSelect(divSelectProducts, null)
    let productPlus = tag({ tag: "button", className: "button-plus", parent: divSelectProducts, html: "+" })
    

    api.products.list().then((res) => {
        for (let product of res.data) {
            tag({ tag: "option", className: "option", parent: ingredientsSelect, html: product.name, value: product.id })

            ingredientsSelect.value = product.id

        }
    })

    tag({ tag: "h4", className: "head-units", parent: divIngredients, html: "Количетсво" })

    let inputUnits =  tag({ tag: "input", className: "units-input", parent: divIngredients})



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
        selectCategoreiesRecipes,
        inputPerson
    };
}

function recipesUpdate(recipesId) {

    let load = loading();


    api.recipes.read(recipesId).then((res) => {
        load.remove();
        console.log(res);
        let form = recipesForm("Категория", res.name, res.recipe_category_id, res.number_persons);

        form.button.addEventListener("click", () => {
            api.recipes.update(form.input.value, recipesId, form.selectCategoreiesRecipes.value, form.inputPerson.value).then(() => {
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