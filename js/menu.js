function menuListRender() {
    
    tag({ tag: "a", className: "link", parent: document.body, href: "#menu/create", html: "Создать меню" })


    fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/menu/")
        .then((res) => res.json())
        .then((res) => {
            console.log(res);

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