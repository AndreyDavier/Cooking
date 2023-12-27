function navRender() {


    let mainDiv = tag({ tag: 'div', className: "maindiv", parent: document.body, });



    let units = tag({ tag: "div", className: 'units', parent: mainDiv });
    tag({ tag: "a", className: 'unitsLink', parent: units, href: "#units/list", html: "Список едениц" });


    let categories = tag({ tag: "div", className: 'ucategories', parent: mainDiv });
    tag({ tag: "a", className: 'categoriesLink', parent: categories, href: "#categories/list", html: "Список категорий" });


    let products = tag({ tag: "div", className: 'products', parent: mainDiv });
    tag({ tag: "a", className: 'productsLink', parent: products, href: "#products/list", html: "Продукты" });


    let menu = tag({ tag: "div", className: 'menu', parent: mainDiv });
    tag({ tag: "a", className: "menuLink", parent: menu, href: "#menu/list", html: "Meню" });


    let recipes = tag({ tag: "div", className: 'recipes', parent: mainDiv });
    tag({ tag: "a", className: "recipesLink", parent: recipes, href: "#recipes/list", html: "Категории рецептов" });

    let categorRecipes = tag({ tag: "div", className: "categorRecipes", parent: mainDiv });
    tag({ tag: "a", className: "crLink", parent: categorRecipes, href: "#categorRecipes/list", html: "Рецепты" })
}
