function unitsListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#units/create", html: "Создать единицу" });

    let ul = tag({ tag: "ul", className: "unitsList", parent: document.body });

    api.units.list().then((res) => {

        for (let item of res.data) {

            let li = tag({ tag: "li", className: "listitem", parent: ul, html: item.name });

            tag({ tag: "a", className: "delete-link", parent: li, html: "Удлаить", href: `#units/delete/${item.id}` });
            tag({ tag: "a", className: "update-link", parent: li, html: "Редактировать", href: `#units/update/${item.id}` });
        }

    })

}

function unitsDelete(unitId) {
    let load = loading();

    api.units.delete(unitId).then(() => {
        location.hash = "#units/list";
    })
}

function unitsForm(value, parent) {
    tag({ tag: "h4", className: "header", parent: parent, html: "Eдиницы" });

    let divForm = tag({ tag: "div", className: "divForm", parent: parent });
    let input = tag({ tag: "input", className: "input", parent: divForm, value: value });
    let button = tag({ tag: "button", className: "button", parent: divForm, html: "Сохранить" });

    return {
        input,
        button
    };
}

function unitsUpdate(unitId) {


    api.units.read(unitId).then((res) => {

        let form = unitsForm(res.name, document.body);

        form.button.addEventListener("click", () => {

            api.units.update(form.input.value, unitId).then(() => {
                location.hash = "#units/list";
            })
        })


    })


}

function unitsCreate(params) {

    let form = unitsForm(null, params.parent);

    form.button.addEventListener("click", () => {
        api.units.create(form.input.value).then((res) => {
            // location.hash = "#units/list";
            params.afterCreate(res)
        })
    })

}