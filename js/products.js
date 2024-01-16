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

function productsForm(html, value) {
    tag({ tag: "h4", className: "header", parent: document.body, html: html });

    let divForm = tag({ tag: "div", className: "divForm", parent: document.body });
    let input = tag({ tag: "input", className: "input", parent: divForm, value: value });
    let button = tag({ tag: "button", className: "button", parent: divForm, html: "Сохранить" })

    return {
        input,
        button
    };
}


function productsUpdate(productsId) {

    let load = loading();

    fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/products/${productsId}`)
        .then((res) => res.json())
        .then((res) => {
            load.remove();
            let form = productsForm("Редактирование продукта", res.name);

            form.button.addEventListener("click", () => {
                api.products.update(form.input.value, productsID).then(() => {
                    load.remove();
                    location.hash = "#products/list";
                })
            })
        })
}

function productsOptions() {
    let select = tag({ tag: "select", className: "products-select", parent: document.body });

    let categories = api.categories.list().then((res) => {
        console.log(res.data);
        for (let category of res.data) {
            tag({ tag: "option", class: "products-option", parent: select, html: category.name, value: category.id });
        }
    })

    return {
        select
    };

}

function productsCreate() {

    let form = productsForm("Создание продукта");
    let options = productsOptions();

    form.button.addEventListener("click", (e) => {
        api.products.create(form.input.value, options.select.value).then(() => {
            location.hash = "#products/list";

        })
    })


}