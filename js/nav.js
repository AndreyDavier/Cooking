function navRender() {

    
    let mainDiv = tag({ tag: 'div', className: "maindiv", parent: document.body, })




    let units = tag({ tag: "div", className: 'units', parent: mainDiv })
    
    tag({ tag: "a", className: 'unitsLink', parent: units, href: "#units/list", html: "Список едениц" })



   
    let categories = tag({ tag: "div", className: 'ucategories', parent: mainDiv })
   

    tag({ tag: "a", className: 'categoriesLink', parent: categories, href: "#categories/list", html: "Список категорий" })


    let products = tag({ tag: "div", className: 'products', parent: mainDiv })

    
    tag({ tag: "a", className: 'productsLink', parent: products, href: "#products/list", html: "Продукты" })

    // let divMenu = document.createElement("div");
    // divMenu.classList.add("menu");
    // mainDiv.append(divMenu);

    // let linkMenu = document.createElement("a");
    // linkMenu.href = "#menu/list";
    // linkMenu.innerHTML = "Меню";
    // divMenu.append(linkMenu);


    // let divrecipes = document.createElement("div");
    // divrecipes.classList.add("recipes");
    // mainDiv.append(divrecipes);

    // let linkrecipes = document.createElement("a");
    // linkrecipes.href = "#recipes/list";
    // linkrecipes.innerHTML = "Категории рецепт";
    // divrecipes.append(linkrecipes);





}
