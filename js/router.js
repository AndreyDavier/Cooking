
function router() {
    document.body.innerHTML = ""
    navRender();
    if (location.hash === "#units/create") {
        unitsCreate();
    }
    else if (location.hash === "#units/list") {
        unitsListRender();
    }

    else if (location.hash === "#categories/create") {
        categoriesCreate()
    }
    else if (location.hash === "#categories/list") {
        categoriesListRender()
    }

    else if (location.hash === "#products/create") {
        productsCreate()
    }
    else if (location.hash === "#products/list") {
        productsListRender()
    }
    else if (location.hash === "#menu/create") {
        menuCreate()
    }
    else if (location.hash === "#menu/list") {
        menuListRender()
    }
    else if (location.hash === "#recipes/create") {
        recipesCreate()
    }
    else if (location.hash === "#recipes/list") {
        recipesListRender()
    }


}



window.addEventListener("hashchange", () => {
    router()
})