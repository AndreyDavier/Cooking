function purchaseListRender() {

    //отоброзить блюда
    //отоброзить продукты
    //сумировать одинаковые продукты из разных блюд
    tag({ tag: "a", className: "link", parent: document.body, href: "#purchase/create" })

    let purchaseSelect = tag({ tag: "select", className: "purchase-select", parent: document.body })


    api.menu.list().then((res) => {
        for (let item of res.data) {
            let option = tag({ tag: "option", class: "products-option", parent: purchaseSelect, value: item.id, html: item.name });
        }
    })


    let div = tag({ tag: "div", className: "div", parent: document.body })


    purchaseSelect.addEventListener("input", () => {
        div.innerHTML = ""
        api.menu.read(purchaseSelect.value).then((res) => {

            let dishesHead = tag({ tag: "h3", className: "dishes-list-head", parent: div, html: "Блюда" })

            let dishesList = tag({ tag: "ul", className: "dishes-list", parent: div })



            res.dishes.forEach(elem => {
                api.recipes.read(elem.dishes).then((res) => {
                    let li = tag({ tag: "li", className: "dishes-item", parent: dishesList, html: res.name })

                    let productHead = tag({ tag: "h5", className: "dishes-list-head", parent: li, html: "Состоит из:" })


                    res.products.forEach(elem => {
                        console.log(elem.product_id);
                        api.products.read(elem.product_id).then((res) => {
                            let ul = tag({ tag: "ul", className: "products-list", parent: li })
                            let list = tag({ tag: "li", className: "product-item", parent: ul, html: res.name })
                        })

                    })



                });
            })
        })
    })
}