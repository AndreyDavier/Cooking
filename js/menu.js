function menuListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#menu/create", html: "Создать меню" });

    let ul = tag({ tag: "ul", className: "menulist", parent: document.body });


    api.menu.list().then((res) => {
        for (let item of res.data) {

            let li = tag({ tag: "li", className: "listitem", parent: ul, html: item.name });

            tag({ tag: "a", className: "delete-link", parent: li, html: "Удалить", href: `#menu/delete/${item.id}` });

            tag({ tag: "a", className: "update-link", parent: li, html: "Редактировать", href: `#menu/update/${item.id}` });

        }
    })
}

function menuDelete(menuId) {
    let load = loading();

    api.menu.delete(menuId).then(() => {
        location.hash = "#menu/list";
    })
}

function menuForm(value) {
    tag({ tag: "h4", className: "header", parent: document.body, html: "Создание меню" });

    let divForm = tag({ tag: "div", className: "divForm", parent: document.body });
    let input = tag({ tag: "input", className: "input", parent: divForm, value: value });
    let button = tag({ tag: "button", className: "button", parent: divForm, html: "Сохранить" });

    return {
        input,
        button
    };
}

function menuUpdate(menuId) {
    let load = loading();

    api.menu.read(menuId).then((res) => {
        load.remove();
        let form = menuForm(res.name);

        form.button.addEventListener("click", () => {
            api.menu.update(form.input.value, menuId).then(() => {
                location.hash = "#menu/list";
            })
        })
    })
}

function menuCreate() {

    let form = menuForm();

    form.button.addEventListener("click", () => {
        api.menu.create(form.input.value).then(() => {
            location.hash = "#menu/list";
        })
    })
}