let api = {
    units: {
        create: (unitName) => {
            return fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/units/", {
                method: "PUT",
                body: JSON.stringify({
                    name: unitName
                })
            })
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
            })
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
        update: (productName, productsID) => {
            let formdata = new FormData();
            formdata.append("name", productName)

            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/products/${productsID}`, {
                method: "POST",
                body: formdata
            })

        },
        create: (productName, categoryId) => {
            return fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/products/", {
                method: "PUT",
                body: JSON.stringify({
                    name: productName,
                    category_id: categoryId
                })
            })
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
        update: (recipesName, recipesID) => {
            let formdata = new FormData();
            formdata.append("name", recipesName)

            return fetch(`http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipies/${recipesID}`, {
                method: "POST",
                body: formdata
            })
        },
        create: (categoriesName) => {
            return fetch("http://q904002e.beget.tech/js-task/std/andrey/cook-calc/api/recipies/", {
                method: "PUT",
                body: JSON.stringify({
                    name: categoriesName
                })
            })
        }
    }


}