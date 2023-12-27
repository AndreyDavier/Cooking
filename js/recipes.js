function recipesListRender() {
    let tagA = document.createElement("a")
    tagA.href = "#recipes/create"
    tagA.innerHTML = "Создать категорию"
    document.body.append(tagA)
}

function recipesCreate() {
    let tagH1 = document.createElement("h4")
    tagH1.innerHTML = "Категории"
    document.body.append(tagH1)
}