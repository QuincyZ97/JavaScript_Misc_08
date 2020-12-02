const apiUrl = "https://jsonbox.io/"
const boxID = "box_2193656fd9fbb06a2df7";
//======================================================================

const getJsonBoxApi = async () => {
    try {
        const res = await fetch(`${apiUrl}${boxID}?sort=done`)
        const jsonResponse = await res.json()
        return (jsonResponse);
    } catch (error) {
        console.log(error)
    }
}

//======================================================================

const postJsonBoxApi = async (inputValue) => {
    try {
        const toDoInput = { description: inputValue, done: false };
        const res = await fetch(`${apiUrl}${boxID}`, {
            method: "POST",
            body: JSON.stringify(toDoInput),
            headers: { "Content-Type": "application/json" }
        })
        const jsonResponse = await res.json()
        return(jsonResponse)
    } catch (error) {
        console.log(error)
    }
  }

//======================================================================

const delJsonBoxApi = async (itemId) => {
    try {
        await fetch(`${apiUrl}${boxID}/${itemId}`, {
            method: "DELETE",
        })
        log("Item deleted")
    } catch (error) {
        console.log(error)
    }
}

//======================================================================

const putFalseJsonBoxApi = async (itemId, desc) => {
    try {
        const taskToDo = { description: desc, done: false }; // ITEM NOT DONE

        await fetch(`${apiUrl}${boxID}/${itemId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskToDo)
        })
        log("update completed")
    } catch (error) {
        console.log(error)
    }
}

const putTrueJsonBoxApi = async (itemId, desc) => { //ITEM IS DONE
    try {
        const taskDone = { description: desc, done: true };

        await fetch(`${apiUrl}${boxID}/${itemId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskDone)
        })
        log("update completed")
    } catch (error) {
        console.log(error)
    }
}

//======================================================================

const putDescJsonBoxApi = async (itemId, desc, status ) => {
    try {
        const task = { description: desc, done: status };
         await fetch(`${apiUrl}${boxID}/${itemId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task)
        })
    } catch (error) {
        console.log(error)
    }
}
