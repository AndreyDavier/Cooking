
// 1)Добавить обьект в массив
// 2)Нужна функия которая отрисовывает массив обьектов на странице 
// 3) После добовления нового объекта в массив, запускать функцию
// 4) При изменение в селекте, записывать в объект выбранное значение 
// 5) Когда отрисовываем объект в селекте устанавливать значение из объекта 


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

function recipesForm(html, value, categorRecipesId, person, products, method) {
    let load = loading();
    // let products = [];
    tag({ tag: "h4", className: "header", parent: document.body, html: html });

    let divForm = tag({ tag: "div", className: "divForm", parent: document.body });
    let input = tag({ tag: "input", className: "input", parent: divForm, value: value });
    let divSelect = tag({ tag: "div", className: 'div-select', parent: divForm });

    let selectCategoreiesRecipes = createSelect(divSelect, categorRecipesId)

    let recipePlus = tag({ tag: "button", className: "button-plus", parent: divSelect, html: "+" })

    let divPerson = tag({ tag: "div", className: "quatity-block", parent: divForm })
    tag({ tag: "h4", className: "head-quatity", parent: divPerson, html: "Количетсво человек" })
    let inputPerson = tag({ tag: "input", className: "quatity-input", parent: divPerson, value: person })


    let categoriesRecipes = api.categorRecipes.list().then((res) => {
        for (let categoriesRecipes of res.data) {
            let options = tag({ tag: "option", className: "option", parent: selectCategoreiesRecipes, html: categoriesRecipes.name, value: categoriesRecipes.id })
        }

    })
    tag({ tag: "h4", className: "products-head", parent: divForm, html: "Продукты" })

    let div = tag({ tag: "div", className: "div", parent: divForm })
    viewProducts()



    function viewProducts() {
        div.innerHTML = ''
        for (let productInRecipe of products) {

            let divIngredients = tag({ tag: "div", className: "div-ingredients", parent: div })
            let divSelectProducts = tag({ tag: "div", className: 'div-select', parent: divIngredients });
            let ingredientsSelect = createSelect(divSelectProducts, null)
            // console.log(productInRecipe.product_id);
            ingredientsSelect.addEventListener("input", () => {
                productInRecipe.product_id = ingredientsSelect.value

            })



            api.products.list().then((res) => {
                for (let product of res.data) {
                    tag({ tag: "option", className: "option", parent: ingredientsSelect, html: product.name, value: product.id })
                }
                ingredientsSelect.value = productInRecipe.product_id
            })



            let productPlus = tag({ tag: "button", className: "button-plus", parent: divSelectProducts, html: "+" })
            productPlus.addEventListener("click", () => {
                let popupBg = tag({ tag: "div", className: "popup-bg", parent: document.body })
                let popupContent = tag({ tag: "div", className: "popup-content", parent: popupBg })

                productsCreate({
                    parent: popupContent,
                    afterCreate: (responce) => {
                        popupBg.remove;

                        api.products.list().then((res) => {
                            ingredientsSelect.innerHTML = ""

                            for (let ingredient of res.data) {
                                let options = tag({ tag: "option", className: "option", parent: ingredientsSelect, html: ingredient.name, value: ingredient.id })

                                ingredientsSelect.value = responce.id

                            }
                        })
                    }
                })
            })

            tag({ tag: "h4", className: "head-units", parent: divIngredients, html: "Количетсво" })
            let divFormUnit = tag({ tag: "div", className: "unit-form", parent: divIngredients })

            let inputUnits = tag({ tag: "input", className: "units-input", parent: divFormUnit })

            inputUnits.addEventListener("input", () => {
                productInRecipe.count = inputUnits.value
            })

            inputUnits.value = productInRecipe.count

            let unitSelect = createSelect(divFormUnit, productInRecipe.unit_id)

            unitSelect.addEventListener("input", () => {
                productInRecipe.unit_id = unitSelect.value
            })

            api.units.list().then((res) => {
                for (let unit of res.data) {
                    tag({ tag: "option", className: "option", parent: unitSelect, html: unit.name, value: unit.id })

                    unitSelect.value = unit.id
                }

                unitSelect.value = productInRecipe.unit_id
            })
        }
    }


    let buttonSaveProduct = tag({ tag: "button", className: "button", parent: divForm, html: "Добавить продукт" });

    buttonSaveProduct.addEventListener("click", function () {

        let productInRecipe = {
            count: "",
            unit_id: "",
            product_id: "",
        }


        products.push(productInRecipe)

        viewProducts()
    })


    let inputCookingForm = tag({ tag: "form", className: "cooking-form", parent: divForm })
    let inputCooking = tag({ tag: "textarea", className: "cooking-input", parent: inputCookingForm })

    inputCooking.innerHTML = method

    let button = tag({ tag: "button", className: "button", parent: divForm, html: "Сохранить" });



    Promise.all([categoriesRecipes]).then(() => {
        load.remove()
    })


    return {
        input,
        button,
        selectCategoreiesRecipes,
        inputPerson,
        products,
        inputCooking
    };
}

function recipesUpdate(recipesId) {

    let load = loading();


    api.recipes.read(recipesId).then((res) => {
        load.remove();
        console.log(res);
        let form = recipesForm("Категория", res.name, res.recipe_category_id, res.number_persons, res.products, res.cooking_method);
        form.button.addEventListener("click", () => {

            api.recipes.update(form.input.value, recipesId, form.selectCategoreiesRecipes.value, form.inputPerson.value, form.products, form.inputCooking.value).then(() => {
                console.log(form.products);
                load.remove();
                location.hash = "#recipes/list";
            })
        })
    })
}

function recipesCreate() {

    let form = recipesForm("Создание рецепта", null, null, null, []);

    form.button.addEventListener("click", () => {
        api.recipes.create(form.input.value, form.selectCategoreiesRecipes.value, form.products, form.inputCooking.value, form.inputPerson.value).then(() => {
            location.hash = "#recipes/list";
        })
    })
}