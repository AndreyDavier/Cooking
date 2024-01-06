
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
    else if (location.hash === "#categorRecipes/create") {
        categorRecipesCreate()
    }
    else if (location.hash === "#categorRecipes/list") {
        categorRecipesListRender()
    }
    else if (location.hash.includes("#units/delete")) {
        unitsDelete(location.hash.slice("#units/delete/".length))
    }
    else if (location.hash.includes("#units/update")) {
        unitsUpdate(location.hash.slice("#units/update/".length))
    }
    else if (location.hash.includes("#products/delete")) {
        productsDelete(location.hash.slice("products/delete/".length))
    }
    else if (location.hash.includes("#products/update")) {
        productsUpdate(location.hash.slice("#products/update/".length))
    }
    else if (location.hash.includes("#menu/delete")) {
        menuDelete(location.hash.slice("menu/delete/".length))
    }
    else if (location.hash.includes("menu/update")) {
        menuUpdate(location.hash.slice("#menu/update/".length))
    }
    else if (location.hash.includes("#recipes/delete")) {
        recipesDelete(location.hash.slice("#recipes/delete/".length))
    }
    else if (location.hash.includes("#recipes/update")) {
        recipesUpdate(location.hash.slice("#recipes/update/".length))
    }
    else if (location.hash.includes("#categorRecipes/delete")) {
        categorRecipesDelete(location.hash.slice("categorRecipes/delete/".length))
    }
    else if (location.hash.includes("#categorRecipes/update")) {
        categorRecipesUpdate(location.hash.slice("#categorRecipes/update/".length))
    }
    else if (location.hash.includes("#categories/delete")) {
        categoriesDelete(location.hash.slice("categories/delete/".length))
    }
    else if (location.hash.includes("#categories/update")) {
        categoriesUpdate(location.hash.slice("#categories/update/".length))
    }
}



window.addEventListener("hashchange", () => {
    router()
})