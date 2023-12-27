function menuListRender() {
    let tagA = document.createElement("a")
    tagA.href = "#menu/create"
    tagA.innerHTML = "Создать меню"
    document.body.append(tagA)
}

function menuCreate() {
    let tagH1 = document.createElement("h4")
    tagH1.innerHTML = "Список меню"
    document.body.append(tagH1)
}