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
        }
    }
}