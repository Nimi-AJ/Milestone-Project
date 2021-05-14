
const form = document.getElementById("user-form");
const input = document.querySelectorAll('.user-input');
const small = document.querySelectorAll('small');
const memberInfoHeader = document.querySelector(".member-info");
let jsonArray = [];
let firstNameElement = input[0]
let surnameElement = input[1];
let ageElement = input[2];
let currentLevelElement = input[3];
let favoriteClubElement = input[4];
let headerArray = ["First Name", "Surname", "Age", "Current Level", "Favorite Club"];
const table = document.querySelector('#table');
 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // alert('formsubmit1');
    updateJson(e);
    
})
table.addEventListener('click', (e) => {
    dltUser(e);
    
})




    


function updateJson(e) {
// e.preventDefault();
    let valid = 0;
    
    requiredFields = [
        {field: firstNameElement, message: "First Name is required"},
        {field: surnameElement, message: "Surname is required"},
        {field: ageElement, message: "Age is required"},
        {field: currentLevelElement, message: "Current Level required"},
        {field: favoriteClubElement, message: "Favorite Club is required"}
       ]
       for(let i = 0; i < requiredFields.length; i++) {
           let bool = checkRequiredValue(requiredFields[i].field, requiredFields[i].message);
           if(bool === false){ 
              valid++;
           }
        }
   
       if(valid !== 0 ){
          
         e.preventDefault();  
       } 
       else{
         
        let obj = {};
        let firstName = firstNameElement.value;
        let surname =  surnameElement.value;
        let age =    ageElement.value;
        let currentLevel = currentLevelElement.value;
        let favoriteClub = favoriteClubElement.value;
        let inputValueArray = [firstName, surname, age, currentLevel, favoriteClub];
         headerArray.forEach((item, index) => {
             obj[item] = inputValueArray[index];
         })
         obj['id'] = Date.now().toString();
        jsonArray.push(obj);
        
        updateTable();
        form.reset(); 
        clearId(requiredFields);
       }
}



function updateTable() {
 
    table.innerHTML = '';
    table.className = "table table-striped table-hover";
   
    if(jsonArray.length !== 0 ) {
        let tr =  document.createElement('tr');
        let thead = document.createElement("thead");
        thead.setAttribute("class", "bg-info");
        headerArray.forEach((item) => {
            let th = document.createElement('th');
            th.innerHTML = item;
            tr.append(th)
        })
        thead.append(tr);
        table.append(thead);
       
        memberInfoHeader.style.display = "block";
        table.style.width = "80%";
        table.style.marginLeft = "10%";
        table.style.marginRight = "10%"
        
    } 
   
    jsonArray.forEach((item, index) => {
        let tr = document.createElement('tr');
        let dlt = document.createElement('td');
        tr.setAttribute("id", item.id)  //set delete  utton to hold the id which mat hes the user id in the json array
        dlt.innerHTML =  `<button class="btn btn-primary">delete</button>`;
        let valueArray = Object.values(item);
        for(let i = 0; i < valueArray.length - 1; i++){ //add every value to the table except from                                              
             let td = document.createElement('td'); //the id value which will only be used to get and delete item from JsonArray
             td.innerText = valueArray[i];
             tr.append(td);
           
        }
       
         tr.append(dlt);
        table.append(tr);
    })
}


function dltUser(e) {
        table.innerHTML = '';
        let cell =  e.target;
        if(cell.tagName !== "BUTTON"){
            return;
        }
        else if(cell.parentNode.tagName !== 'TD'){
             return;
         }
         
         let row = cell.parentNode.parentNode;
         let rowID = row.getAttribute('id');
         
     jsonArray.forEach((item, index) => {
         if(item.id === rowID){
             alert(`Delete user information for ${item["First Name"]} ${item["Surname"]}?`); 
            let spliced = jsonArray.splice(index, 1);
        
             
         }
     })

        if(jsonArray.length === 0 ){
            memberInfoHeader.style.display = "none";
        }

     return updateTable();
}


function checkRequiredValue(item, message) {
    if(item.value.trim() === "") {
        return  error(item, message);
    } else {
         return success(item);
    }
}

function error(item, message){
    item.className = 'user-input form-control is-invalid';
    const small = item.previousElementSibling.previousElementSibling;
    alert(small);
    small.innerText = message;
    small.className = "valid-feedback";
    return false;
}

function success(item){
    item.className = 'form-control is-valid';
    const small = item.previousElementSibling.previousElementSibling;
    small.innerText = 'success';
    small.className = "valid-feedback";
    return true;
}
function clearId(array){
    array.forEach((item, index) => {
        item.field.className = "user-input form-control";
        small[index].innerHTML = "";
    })
}




















