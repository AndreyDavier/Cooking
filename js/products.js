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

function createSelect(parent, value) {
    let select = tag({ tag: "select", className: "products-select", parent: parent, value });
    return select
}


function productsForm(html, value, categoryId, unitId) {
    tag({ tag: "h4", className: "header", parent: document.body, html: html });

    let divForm = tag({ tag: "div", className: "divForm", parent: document.body });
    let input = tag({ tag: "input", className: "input", parent: divForm, value: value });



    let divSelect = tag({ tag: "div", class: "div-select", parent: divForm })
    
    let selectCategoreies = createSelect(divSelect, categoryId)

    tag({ tag: "button", className: "button-plus", parent: divSelect, html: '+' })

    let categories = api.categories.list().then((res) => {
        for (let category of res.data) {
            let options = tag({ tag: "option", class: "products-option", parent: selectCategoreies, html: category.name, value: category.id });

        }

        selectCategoreies.value = categoryId
    })




    let selectUnits = createSelect(divSelect, unitId)
    tag({ tag: "button", className: "button-plus", parent:  divSelect, html: '+' })
    console.log(unitId);

    let unints = api.units.list().then((res) => {
        for (let unit of res.data) {
            tag({ tag: "option", class: "products-option", parent: selectUnits, html: unit.name, value: unit.id });
        }

        selectUnits.value = unitId
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
        load.remove();
        let form = productsForm("Редактирование продукта", res.name, res.category_id, res.unit_id);

        form.button.addEventListener("click", () => {
            api.products.update(form.input.value, productsId).then(() => {
                load.remove();
                location.hash = "#products/list";
            })
        })
    })
}




function productsCreate() {

    let form = productsForm("Создание продукта");

    form.button.addEventListener("click", (e) => {
        api.products.create(form.input.value, form.selectCategoreies.value, form.selectUnits.value).then(() => {
            location.hash = "#products/list";

        })
    })


}