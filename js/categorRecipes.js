function categorRecipesListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#categorRecipes/create", html: "Создать рецепт" });

    let ul = tag({ tag: "ul", className: "categorRecipes", parent: document.body });


    api.categorRecipes.list().then((res) => {

        for (let item of res.data) {
            let li = tag({ tag: "li", className: "listitem", parent: ul, html: item.name });

            tag({ tag: "a", className: "delete-link", parent: li, html: "Удалить", href: `#categorRecipes/delete/${item.id}` });

            tag({ tag: "a", className: "update-link", parent: li, html: "Редактировать", href: `#categorRecipes/update/${item.id}` });

        }

    })
}

function categorRecipesDelete(categorRecipesId) {
    let load = loading();

    api.categorRecipes.delete(categorRecipesId).then(() => {
        location.hash = "#categorRecipes/list"
    })
}

function categorRecipesForm(value, parent) {
    tag({ tag: "h4", className: "header", parent: parent, html: "Создание рецепта" })

    let divForm = tag({ tag: "div", className: "divForm", parent: parent });
    let input = tag({ tag: "input", className: "input", parent: divForm, value: value });
    let button = tag({ tag: "button", className: "button", parent: divForm, html: "Сохранить" });

    return {
        input,
        button
    };
}

function categorRecipesUpdate(categorRecipesId) {
    let load = loading();


    api.categorRecipes.read(categorRecipesId).then((res) => {
        console.log(res);
        load.remove();
        let form = categorRecipesForm(res.name);

        form.button.addEventListener("click", () => {
            api.categorRecipes.update(form.input.value, categorRecipesId).then(() => {
                load.remove();
                location.hash = "#categorRecipes/list";
            })
        })
    })
}

function categorRecipesCreate(params) {

    let form = categorRecipesForm(null, params.parent)

    form.button.addEventListener("click", () => {
        api.categorRecipes.create(form.input.value).then((res) => {
          params.afterCreate(res)
        })
    })
}