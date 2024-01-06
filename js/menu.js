function menuListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#menu/create", html: "Создать меню" })

    let ul = tag({ tag: "ul", className: "menulist", parent: document.body })

    fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/menu/")
        .then((res) => res.json())
        .then((res) => {
            console.log(res);

            for (let item of res.data) {

                let li = tag({ tag: "li", className: "listitem", parent: ul, html: item.name })

                tag({ tag: "a", className: "delete-link", parent: li, html: "Удалить", href: `#menu/delete/${item.id}` })

                tag({ tag: "a", className: "update-link", parent: li, html: "Редактировать", href: `#menu/update/${item.id}` })

            }
        })
}

function menuDelete(menuID) {
    console.log(document.body.innerHTML = "loading...");

    fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/menu/${menuID}`, {
        method: "DELETE"
    }).then(() => {
        location.hash = "#menu/list"
    })
}

function menuUpdate(menuID) {
    fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/menu/${menuID}`)
        .then((res) => res.json())
        .then((res) => {
            tag({ tag: "h4", className: "header", parent: document.body, html: "Меню" })

            let divForm = tag({ tag: "div", className: "divForm", parent: document.body })
            let input = tag({ tag: "input", className: "input", parent: divForm, value: `${res.name}` })
        })
}

function menuCreate() {

    tag({ tag: "h4", className: "header", parent: document.body, html: "Список меню" })


    let ul = tag({ tag: "ul", className: "menuList", parent: document.body })

    let divForm = tag({ tag: "div", className: "divForm", parent: document.body })
    let input = tag({ tag: "input", className: "input", parent: divForm })
    let button = tag({ tag: "button", className: "button", parent: divForm, html: "Сохранить" })

    button.addEventListener("click", (e) => {
        fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/menu/", {
            method: "PUT",
            body: JSON.stringify({
                name: input.value
            })
        }).then(() => {
            location.hash = "#menu/list"
        })
    })
}