const generalDisplay = document.getElementById("toDoList__display") // GET API DISPLAY
const log = console.log;
//=============================================================================================
//GENERATE LIST

const displayList = async () => {
  const myToDoList = await getJsonBoxApi();
  
  generalDisplay.innerHTML = ''; //reset display

  // Make elements
  const newUl = document.createElement("ul");
  newUl.setAttribute("id", "toDoListUL");
  generalDisplay.appendChild(newUl);

  myToDoList.map(item => {
    updateList(item);
  })

}
displayList(); // initial webpage load
//=============================================================================================
//Make DIVS from items

 const updateList = async (item) => {
  const newDiv = document.createElement("div");
      newDiv.setAttribute("id", item._id);
      newDiv.setAttribute("class", "li__wrapper");

    const newLi = document.createElement("li");
    newLi.setAttribute("onclick", "updateItemDesc(this)");
      newLi.innerHTML = item.description;

    const newInput = document.createElement("input");
      newInput.setAttribute("type", "checkbox");
      newInput.setAttribute("class", "liCheckbox");
      newInput.setAttribute("onclick", "updateItemDone(this)");
      newInput.setAttribute("value", item.done);
    
        if (item.done === true)// value check
        {
          newInput.setAttribute("checked", "checked");
        }
        else if (item.done === false )
        {
          newInput.removeAttribute("checked", "checked");
        }

    const newBtn = document.createElement("button");
    newBtn.setAttribute("class", "btnRm");
    newBtn.setAttribute("onclick", "removeToDoItem(this)");
 
    const newI = document.createElement("i");
      newI.setAttribute("class", "fa fa-trash");

    //append
    newBtn.appendChild(newI);
    newDiv.append(newInput, newLi, newBtn);
  
   const myUL = document.getElementById("toDoListUL");
    myUL.appendChild(newDiv);

} 

//=============================================================================================
// INPUT ADD

const getToDoItem = async () => {
  const toDoItem = document.getElementById("toDoItem").value;
  
  if (toDoItem.length === 0) {
    alert("input cannot be empty")
  }
  else {
    const toDoResponse = await postJsonBoxApi(toDoItem);
    //log(toDoResponse);
    updateList(toDoResponse);
  }
  document.getElementById("toDoItem").value = ""; // reset input field
}

const addBtn = document.getElementById("addItem"); // +
addBtn.addEventListener("click", getToDoItem);


//=============================================================================================
//remove 1 item

 const removeToDoItem = async (clickedbtn) => { 
   const itemId = clickedbtn.parentNode.id;
   await delJsonBoxApi(itemId);
   clickedbtn.parentNode.remove();

}

//=============================================================================================
//remove all

const resetList = document.getElementById("toDoList__Reset")

const removeAllItems = async () => { 
  const myToDoList = await getJsonBoxApi(); 
  myToDoList.forEach(async item => {
    await delJsonBoxApi(item._id)
  });
  const myUl = document.getElementById("toDoListUL")
  myUl.innerHTML = '';
}
resetList.addEventListener("click", removeAllItems);

//=============================================================================================
//update done value

const updateItemDone = async (clickedbtn) => { 
  const itemId = clickedbtn.parentNode.id;
  const description = clickedbtn.nextSibling.innerHTML;
  const taskCheck = clickedbtn.value;

   if (taskCheck === "true"){
     putFalseJsonBoxApi(itemId, description);
     clickedbtn.setAttribute("checked", "checked");
   }
   else if (taskCheck === "false")
   {
     putTrueJsonBoxApi(itemId, description);
     clickedbtn.removeAttribute("checked", "checked");
  }
}

//=============================================================================================
//update Description

const updateItemDesc = async (clickedbtn) => { 
  const desc = window.prompt("Please enter a new description", clickedbtn.innerHTML);
  if (desc === null) {
    return; //break
  }
  
  const itemId = clickedbtn.parentNode.id;
  const status = clickedbtn.previousSibling.value;
  await putDescJsonBoxApi(itemId, desc, status);

  const myLi = document.getElementById(itemId).childNodes[1]
  myLi.innerHTML = desc;
  
  if (status === "true") {
    clickedbtn.previousSibling.setAttribute("checked", "checked");
  }
}


//=============================================================================================

// Requirements:
// [O]Als gebruiker wil ik een inputveld zien waarin ik mijn taak in kan vullen.
// [O]Als gebruiker kan ik op een button drukken met de tekst "Add Task" waardoor je ingevulde taak toegevoegd wordt aan de lijst.
// [O]Als gebruiker zie ik wanneer ik op de add button knop heb geklikt, de taak verschijnen in mijn takenlijst.
// [O]Taak verwijderen: Als gebruiker kan ik in de takenlijst op een icoontje klikken van een prullenbak, rechts naast de taak, waardoor de taak uit mijn takenlijst wordt verwijderd.

// API requirements:
// [O]GET: Verkrijg de (initiële) lijst met taken van de database.
// [O]POST: Update de takenlijst met 1 nieuwe taak. Stuur alleen {description: "blah", done: false} 
// [O]DELETE: Verwijder een taak uit de database. Gebruik de id die je terugkrijgt als identifier.
// [O]Maak een file genaamd api-client.js zoals je hebt geleerd in de afgelopen tijd voor al je requests.

// Extra Extra Bonus requirement:
// [O]Taak doorstrepen: Als gebruiker kan ik in de takenlijst op een checkbox klikken, links naast de taak, waardoor de tekst van de taak doorgestreept wordt en ik mijn taak kan afstrepen.
// [O]Als gebruiker wil ik op mijn taak kunnen klikken en de tekst kunnen aanpassen.

// Extra API requirements (die samenhangt met het bovenstaande):
// [O]PUT: update een bestaande taak de property done of niet done.
// [O]PUT: update een bestaande taak met de PUT method.
