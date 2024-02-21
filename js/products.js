function productsListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#products/create", html: "Создать продукт" });

    let ul = tag({ tag: "ul", className: "productsList", parent: document.body })

    api.products.list().then((res) => {
        for (let item of res.data) {

            let li = tag({ tag: "li", className: "listitem", parent: ul, html: item.name });

            tag({ tag: "a", className: "delete-link", parent: li, html: "Удалить", href: `#products/delete/${item.id}` });

            tag({ tag: "a", className: "update-link", parent: li, html: "Редактировать", href: `#products/update/${item.id}` });
        }

    })
}

function productsDelete(productsId) {
    let load = loading();

    api.products.delete(productsId).then(() => {
        location.hash = "#products/list";
    })
}



function productsForm(html, value, categoryId, unitId, parent) {

    let load = loading();

    tag({ tag: "h4", className: "header", parent: parent, html: html });

    let divForm = tag({ tag: "div", className: "divForm", parent: parent });
    let input = tag({ tag: "input", className: "input", parent: divForm, value: value });

    let divSelect = tag({ tag: "div", class: "div-select", parent: divForm })

    let selectCategoreies = createSelect(divSelect, categoryId)

    let categoriesPlus = tag({ tag: "button", className: "button-plus", parent: divSelect, html: '+' })


    categoriesPlus.addEventListener("click", () => {
        let popupBg = tag({ tag: 'div', className: "popup-bg", parent: document.body })

        let popupContent = tag({ tag: "div", className: "popup-content", parent: popupBg })

        categoriesCreate({
            parent: popupContent,
            afterCreate: (responce) => {
                popupBg.remove();

                api.categories.list().then((res) => {
                    selectCategoreies.innerHTML = '';

                    for (let category of res.data) {
                        let option = tag({ tag: "option", class: "products-option", parent: selectCategoreies, html: category.name, value: category.id });

                        selectCategoreies.value = responce.id
                    }



                })
            }
        })
    })

    let categories = api.categories.list().then((res) => {

        for (let category of res.data) {
            let options = tag({ tag: "option", className: "option", parent: selectCategoreies, html: category.name, value: category.id });
        }

        selectCategoreies.value = categoryId
    })






    let selectUnits = createSelect(divSelect, unitId)
    let unitPlus = tag({ tag: "button", className: "button-plus", parent: divSelect, html: '+' })



    unitPlus.addEventListener('click', () => {
        let popupBg = tag({ tag: "div", className: "popup-bg", parent: document.body });
        let popupContent = tag({ tag: "div", className: "popup-content", parent: popupBg });

        unitsCreate({
            parent: popupContent,
            afterCreate: (responce) => {
                popupBg.remove();


                api.units.list().then((res) => {
                    selectUnits.innerHTML = "";

                    for (let unit of res.data) {
                        tag({ tag: "option", class: "products-option", parent: selectUnits, html: unit.name, value: unit.id });

                        selectUnits.value = responce.id
                    }
                })
            }
        })

    })

    let units = api.units.list().then((res) => {

        for (let unit of res.data) {
            tag({ tag: "option", class: "products-option", parent: selectUnits, html: unit.name, value: unit.id });
        }

        selectUnits.value = unitId
    })

    Promise.all([categories, units]).then(() => {
        load.remove()
    })

    let button = tag({ tag: "button", className: "button", parent: divForm, html: "Сохранить" })



    return {
        input,
        button,
        selectCategoreies,
        selectUnits
    };
}


function productsUpdate(productsId) {

    let load = loading();

    api.products.read(productsId).then((res) => {
        load.remove()
        console.log(res);
        let form = productsForm("Редактирование продукта", res.name, res.category_id, res.unit_id);

        form.button.addEventListener("click", () => {
            api.products.update(form.input.value, productsId, form.selectCategoreies.value, form.selectUnits.value).then(() => {
                load.remove();
                location.hash = "#products/list";
            })
        })

    })
}




function productsCreate(params) {

    let form = productsForm("Создание продукта", null, null, null, params.parent);

    form.button.addEventListener("click", () => {
        api.products.create(form.input.value, form.selectCategoreies.value, form.selectUnits.value).then((res) => {
            params.afterCreate(res)
        })
    })
}