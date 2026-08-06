const searchBtm = document.querySelector(".user-search__btn");
searchBtm.addEventListener("click" , () => {
    filterUser();
})


const departments = new Set();

async function  filterUser(){
    const inputForm = document.querySelector(".user-search__form");
    const input = inputForm.querySelector("input");
    try{
        const response = await fetch("https://dummyjson.com/users/search?q="+input.value);
        const userDetails = await response.json();
        if(userDetails == ""){
            return;
        }
        console.log(userDetails);
    }
    catch(err){
        console.log(err);
    }

    
}

//my code -------------------------------------------------------------------------------------------------------------------------------------------
async function fetchDepartment(){
    try{
        const response = await fetch("https://dummyjson.com/users");
        const userJson = await response.json();
        const users = userJson.users;
        

        
       users.forEach(element => {
        departments.add(element.company.department);
           
        });

        console.log(departments);
        return departments;
      
    }
    catch(error){
        console.log(error);
    }
}



async function displayDepartmentFilter() {

    const filterContainer = document.querySelector(".department__filter");
    departments.forEach(e => {
            filterContainer.innerHTML += `<button class ="department__filter-btn">${e}</button>`;
            const button =  document.querySelector(".department__filter-btn"); 
            button.addEventListener("click",() => {
                filterUserBasedOnDepartment(button.innerHTML);
                
            });
                 
        });
    
}


async function filterUserBasedOnDepartment(department){
    try{
        const response = await fetch("https://dummyjson.com/users/filter?key=company.department&value="+department);
        const data = await response.json();
        console.log(data);

    }
    catch(error){
        console.log(error);

    }


    
}

async function init() {
    await fetchDepartment();
    displayDepartmentFilter();
}

init();


