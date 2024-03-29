function menuListRender() {

    tag({ tag: "a", className: "link", parent: document.body, href: "#menu/create", html: "Создать меню" });

    let ul = tag({ tag: "ul", className: "menulist", parent: document.body });


    api.menu.list().then((res) => {
        for (let item of res.data) {

            let li = tag({ tag: "li", className: "listitem", parent: ul, html: item.name });

            tag({ tag: "a", className: "delete-link", parent: li, html: "Удалить", href: `#menu/delete/${item.id}` });

            tag({ tag: "a", className: "update-link", parent: li, html: "Редактировать", href: `#menu/update/${item.id}` });

        }
    })
}

function menuDelete(menuId) {
    let load = loading();

    api.menu.delete(menuId).then(() => {
        location.hash = "#menu/list";
    })
}

function menuForm(value, dishes, person) {
    tag({ tag: "h4", className: "header", parent: document.body, html: "Создание меню" });

    let divForm = tag({ tag: "div", className: "divForm", parent: document.body });
    let input = tag({ tag: "input", className: "input", parent: divForm, value: value });


    let divCount = tag({ tag: "div", className: "div-count", parent: divForm })
    let headCount = tag({ tag: "span", className: "head-count", parent: divCount, html: "Количество человек" })
    let inputCount = tag({ tag: "input", className: "input-count", parent: divCount, value: person })

    let table = tag({ tag: "table", className: "table", parent: divForm })
    let thead = tag({ tag: "thead", className: "thead", parent: table })
    let tr = tag({ tag: "tr", className: "tr", parent: thead })
    let thProduct = tag({ tag: "th", className: "th", parent: tr, html: "Блюда:" })
    let thCount = tag({ tag: "th", className: "th", parent: tr, html: "На 1 чел:" })
    let thTotalWeight = tag({ tag: "th", className: "th", parent: tr, html: "Общий вес:" })
    let tbody = tag({ tag: "tbody", className: "tbody", parent: table })


    addRecipes()

    console.log(dishes);
    function addRecipes() {
        tbody.innerHTML = ""

        function reduceResult() {

            const result = dishes.reduce((acc, el) => {
                acc.unitNumber = Number(acc.unitNumber) ? Number(acc.unitNumber) + Number(el.unitNumber) : Number(el.unitNumber);
                acc.totalWeight = Number(acc.totalWeight) ? Number(acc.totalWeight) + Number(el.totalWeight) : Number(el.totalWeight);
                return acc;


            }, {})

            return result

        }


        for (let dishesInMenu of dishes) {
            let tr = tag({ tag: "tr", className: "tr", parent: tbody })
            let tdProduct = tag({ tag: "td", className: "td", parent: tr })

            let inputProduct = tag({ tag: "select", className: "select-product", parent: tdProduct, value: dishesInMenu.dishes })

            api.recipes.list().then((res) => {
                for (let recipe of res.data) {
                    tag({ tag: "option", className: "option", parent: inputProduct, html: recipe.name, value: recipe.id })
                }

                inputProduct.value = dishesInMenu.dishes


            })

            inputProduct.addEventListener("input", () => {
                dishesInMenu.dishes = inputProduct.value
            })



            let tdUnit = tag({ tag: "td", className: "td", parent: tr })



            let inputUnitcount = tag({ tag: "input", className: "input-info", parent: tdUnit, value: dishesInMenu.unitNumber })
            inputUnitcount.addEventListener("input", () => {
                dishesInMenu.unitNumber = inputUnitcount.value

                let reduce = reduceResult()
                resultCount.innerHTML = reduce.unitNumber

            })

            let inputUnit = tag({ tag: "input", className: "input-info", parent: tdUnit, value: dishesInMenu.unit })
            inputUnit.addEventListener("input", () => {
                dishesInMenu.unit = inputUnit.value
            })

            let tdTotalWeightt = tag({ tag: "td", className: "td", parent: tr })
            let inputTotalWeight = tag({ tag: "input", className: "input-info", parent: tdTotalWeightt, value: dishesInMenu.totalWeight })
            inputTotalWeight.addEventListener("input", () => {
                dishesInMenu.totalWeight = inputTotalWeight.value

                let reduce = reduceResult()

                totalRezult.innerHTML = reduce.totalWeight
            })





            let tdButton = tag({ tag: "td", className: "td", parent: tr })
            let buttonDel = tag({ tag: "button", className: "button-delete", parent: tdButton, html: "Del" });

            buttonDel.addEventListener("click", (e) => {

                let indexDishes = dishes.indexOf(dishesInMenu)
                console.log(indexDishes);
                let arrayDishes = dishes.splice(indexDishes, 1)

                let temp = e.target.closest("tr").remove()

            })
        }

        let reduce = reduceResult()

        let trresult = tag({ tag: "tr", className: "tr", parent: tbody })
        let thResult = tag({ tag: "th", className: "th", parent: trresult, html: "Итого: " })

        let resultCount = tag({ tag: "th", className: "th", parent: trresult, html: reduce.unitNumber })
        let rezultUnit = tag({ tag: "th", className: "th", parent: trresult, html: "гр" })
        let totalRezult = tag({ tag: "th", className: "th", parent: trresult, html: reduce.totalWeight })


    }
    let divResult = tag({ tag: "div", className: "result", parent: divForm })
    let headResult = tag({ tag: "span", className: "head-result", parent: divResult })

    let buttonDish = tag({ tag: "button", className: "button", parent: divForm, html: "Добавить блюдо" })
    buttonDish.addEventListener("click", () => {

        let dishesInMenu = {
            dishes: "",
            unitNumber: "",
            unit: "",
            totalWeight: ""
        }
        dishes.push(dishesInMenu)

        addRecipes()
    })


    let button = tag({ tag: "button", className: "button", parent: divForm, html: "Сохранить" });

    return {
        input,
        button,
        inputCount,
        dishes
    };
}

function menuUpdate(menuId) {
    let load = loading();

    api.menu.read(menuId).then((res) => {
        console.log(res);
        load.remove();
        let form = menuForm(res.name, res.dishes, res.numberPersons);

        form.button.addEventListener("click", () => {
            api.menu.update(form.input.value, menuId, form.inputCount.value, form.dishes).then(() => {
                location.hash = "#menu/list";
            })
        })
    })
}

function menuCreate() {

    let form = menuForm(null, []);

    form.button.addEventListener("click", () => {
        api.menu.create(form.input.value, form.inputCount.value, form.dishes).then(() => {
            location.hash = "#menu/list";
        })
    })
}