let api = {
    units: {
        create: (unitName) => {
            return fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/units/", {
                method: "PUT",
                body: JSON.stringify({
                    name: unitName
                })
            }).then((res) => res.json())
        },
        update: (unitName, unitId) => {
            let formdata = new FormData();
            formdata.append("name", unitName)

            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/units/${unitId}`, {
                method: "POST",
                body: formdata
            })
        },
        list: () => {
            return fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/units/")
                .then((res) => res.json())
        },
        delete: (unitId) => {
            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/units/${unitId}`, {
                method: "DELETE"
            })
        },
        read: (unitId) => {
            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/units/${unitId}`)
                .then((res) => res.json())
        }
    },

    categories: {
        list: () => {
            return fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/product-categories/")
                .then((res) => res.json())
        },
        delete: (categoriesID) => {

            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/product-categories/${categoriesID}`, {
                method: "DELETE"
            })
        },
        update: (categoriesName, categoriesID) => {
            let formdata = new FormData();
            formdata.append("name", categoriesName)
            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/product-categories/${categoriesID}`, {
                method: "POST",
                body: formdata
            })
        },
        create: (categoriesName) => {
            return fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/product-categories/", {
                method: "PUT",
                body: JSON.stringify({
                    name: categoriesName
                })
            }).then((res) => res.json())
        },
        read: (categoriesId) => {
            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/product-categories/${categoriesId}`)
                .then((res) => res.json())
        }
    },
    products: {
        list: () => {
            return fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/products/")
                .then((res) => res.json())
        },
        delete: (productsID) => {
            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/products/${productsID}`, {
                method: "DELETE"
            })
        },
        update: (productName, productsID, categoryId, unitId) => {
            let formdata = new FormData();
            formdata.append("name", productName)
            formdata.append("category_id", categoryId)
            formdata.append("unit_id", unitId)

            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/products/${productsID}`, {
                method: "POST",
                body: formdata
            })

        },
        create: (productName, categoryId, unitId) => {
            return fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/products/", {
                method: "PUT",
                body: JSON.stringify({
                    name: productName,
                    category_id: categoryId,
                    unit_id: unitId
                })
            })
        },
        read: (productsId) => {
            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/products/${productsId}`)
                .then((res) => res.json())
        }
    },
    menu: {
        list: () => {
            return fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/menu/")
                .then((res) => res.json())
        },
        delete: (menuID) => {
            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/menu/${menuID}`, {
                method: "DELETE"
            })
        },
        update: (menuName, menuID) => {
            let formdata = new FormData()
            formdata.append("name", menuName)

            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/menu/${menuID}`, {
                method: "POST",
                body: formdata
            })
        },
        create: (menuName) => {
            return fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/menu/", {
                method: "PUT",
                body: JSON.stringify({
                    name: menuName
                })
            })
        },
        read: (menuId) => {
            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/menu/${menuId}`)
                .then((res) => res.json())
        }

    },
    categorRecipes: {
        list: () => {
            return fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipe-categories/")
                .then((res) => res.json())
        },
        delete: (categorRecipesID) => {
            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipe-categories/${categorRecipesID}`, {
                method: "DELETE"
            })
        },
        update: (categorRecipesName, categorRecipesID) => {
            let formdata = new FormData()
            formdata.append("name", categorRecipesName)

            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipe-categories/${categorRecipesID}`, {
                method: "POST",
                body: formdata
            })

        },
        create: (categorRecipesName) => {
            return fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipe-categories/", {
                method: "PUT",
                body: JSON.stringify({
                    name: categorRecipesName
                })
            })
        },
        read: (categorRecipesId) => {
            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipe-categories/${categorRecipesId}`)
                .then((res) => res.json())
        }
    },
    recipes: {
        list: () => {
            return fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipies/")
                .then((res) => res.json())
        },
        delete: (recipesID) => {
            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipies/${recipesID}`, {
                method: "DELETE"
            })
        },
        update: (recipesName, recipesId, categoryId, person, products) => {
            let formdata = new FormData();
            formdata.append("name", recipesName)
            formdata.append("recipe_category_id", categoryId)
            formdata.append("number_persons", person)
            let json = JSON.stringify(products)
            formdata.append("products", json)
            console.log(json);


            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipies/${recipesId}`, {
                method: "POST",
                body: formdata
            })
        },
        create: (categoriesName, categoryId) => {
            return fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipies/", {
                method: "PUT",
                body: JSON.stringify({
                    name: categoriesName,
                    recipe_category_id: categoryId
                })
            })
        },
        read: (recipesId) => {
            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipies/${recipesId}`)
                .then((res) => res.json())
        }
    }
}