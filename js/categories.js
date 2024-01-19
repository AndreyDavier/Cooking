function categoriesListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#categories/create", html: "Создать категорию" });

    let ul = tag({ tag: "ul", className: "categoriesList", parent: document.body });


    api.categories.list().then((res) => {
        for (let item of res.data) {
            let li = tag({ tag: "li", className: "listitem", parent: ul, html: item.name });

            tag({ tag: "a", className: "delete-link", parent: li, html: "Удалить", href: `#categories/delete/${item.id}` });
            tag({ tag: "a", className: "update-link", parent: li, html: "Редактировать", href: `#categories/update/${item.id}` });
        }

    })


}

function categoriesDelete(categoriesId) {
    let load = loading();

    api.categories.delete(categoriesId).then(() => {
        location.hash = "#categories/list";
    })
}

function categoriesForm(value) {
    tag({ tag: "h4", className: "header", parent: document.body, html: "Создание категории" });

    let divForm = tag({ tag: "div", className: "divForm", parent: document.body });
    let input = tag({ tag: "input", className: "input", parent: divForm, value: value });
    let button = tag({ tag: "button", className: "button", parent: divForm, html: "Сохранить" });

    return {
        input,
        button
    };
}

function categoriesUpdate(categoriesId) {

    let load = loading();


    api.categories.read(categoriesId).then((res) => {
        load.remove();
        let form = categoriesForm(res.name);

        form.button.addEventListener("click", () => {

            api.categories.update(form.input.value, categoriesID).then(() => {
                load.remove();
                location.hash = "#categories/list";
            })
        })
    })

}

function categoriesCreate() {

    let form = categoriesForm()

    form.button.addEventListener("click", () => {
        api.categories.create(form.input.value).then(() => {
            location.hash = "#categories/list"
        })
    })
}