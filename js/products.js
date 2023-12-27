function productsListRender() {
    let tagA = document.createElement("a");
    tagA.href = "#products/create";
    tagA.innerHTML = "Создать продукт";
    document.body.append(tagA)
}

function productsCreate() {
    tagH1 = document.createElement("h4");
    tagH1.innerHTML = "Продукты"
    document.body.append(tagH1)
}