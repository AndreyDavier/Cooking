function categoriesListRender() {
    let tagA = document.createElement("a")
    tagA.href = "#categories/create"
    tagA.innerHTML = "Создать категорию"
    document.body.append(tagA)
}

function categoriesCreate() {
    let tagH1 = document.createElement("h4")
    tagH1.innerHTML = "Создание категории"
    document.body.append(tagH1)
}