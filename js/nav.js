function navRender() {

    let mainDiv = tag({ tag: 'div', className: "maindiv", parent: document.body, });

    let menu = tag({ tag: "div", className: 'menu', parent: mainDiv });
    tag({ tag: "a", className: "menu-link", parent: menu, href: "#menu/list", html: "Meню" });

    let recipes = tag({ tag: "div", className: 'recipes', parent: mainDiv });
    tag({ tag: "a", className: "recipes-link", parent: recipes, href: "#recipes/list", html: "Рецепты" });

    let products = tag({ tag: "div", className: 'products', parent: mainDiv });
    tag({ tag: "a", className: 'products-link', parent: products, href: "#products/list", html: "Продукты" });



    let units = tag({ tag: "div", className: 'units', parent: mainDiv });
    tag({ tag: "a", className: 'units-link', parent: units, href: "#units/list", html: "Список едениц" });


    let categories = tag({ tag: "div", className: 'categories', parent: mainDiv });
    tag({ tag: "a", className: 'categories-link', parent: categories, href: "#categories/list", html: "Список категорий" });


    let categorRecipes = tag({ tag: "div", className: "categorRecipes", parent: mainDiv });
    tag({ tag: "a", className: "cr-link", parent: categorRecipes, href: "#categorRecipes/list", html: "Категории рецептов" })

    let purchase = tag({ tag: "div", classNameP: "purchase", parent: mainDiv })
    tag({ tag: "a", className: "purchase-link", parent: purchase, href: "#purchase/list", html: "Закупка" })
}
