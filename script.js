import {agefilter} from "./ageFilter.js";

const searchBtm = document.querySelector(".user-search__btn");
searchBtm.addEventListener("click" , () => {
    filterUser();
})




async function  filterUser(){
    const inputForm = document.querySelector(".user-search__form");
    const input = inputForm.querySelector("input");
    try{
        const response = await fetch("https://dummyjson.com/users/search?q="+input.value);
        const userDetails = await response.json();
        if(userDetails == ""){
            return;
        }
        addDisplayTrue(userDetails);
    }
    catch(err){
        console.log(err);
    }

    
}

//my code -------------------------------------------------------------------------------------------------------------------------------------------
const departments = new Set();
let users = [];
let allUsers = [];
let specificDepartmentUser = [];
async function fetchDepartment(){
    try{
        const response = await fetch("https://dummyjson.com/users");
        const userJson = await response.json();
        allUsers = userJson.users;
        

        
       allUsers.forEach(element => {
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
                    
        });
        const button =  document.querySelectorAll(".department__filter-btn");  
        button.forEach(b => {

            b.addEventListener("click",() => {
                
                filterUserBasedOnDepartment(b.innerHTML);
                
            });

        });
   
}


async function filterUserBasedOnDepartment(department){
    try{
        const displayUserContainer = document.querySelector(".User__details");
        displayUserContainer.innerHTML = `<h3> ${department} </h3>`

        
       const response = await fetch("https://dummyjson.com/users/filter?key=company.department&value="+department);
        const data = await response.json();
        addDisplayTrue(data);
        
    }
    catch(error){
        console.log(error);

    }


    
}

async function addDisplayTrue(data){
    specificDepartmentUser = data.users;
    specificDepartmentUser.forEach(user => {
              user.display = true;
         });

    displayUser(specificDepartmentUser);    
   
}

export async function displayUser(users) {

    
    const displayUserContainer = document.querySelector(".User__details");

    displayUserContainer.innerHTML = "";

    users.forEach(user => {

    if(user.display == true){
        displayUserContainer.innerHTML += `
        <div class="user-box">

            <img
                class="user-box__image"
                src="${user.image}"
                alt="${user.firstName}"
            >

            <h3>
                ${user.firstName} ${user.lastName}
            </h3>

            <p><strong>Age:</strong> ${user.age}</p>

            <p><strong>Email:</strong> ${user.email}</p>

            <p><strong>Phone:</strong> ${user.phone}</p>

            <p><strong>Department:</strong> ${user.company.department}</p>

            <p><strong>Company:</strong> ${user.company.name}</p>

            <p><strusers
        </div>
    `;
    }
    });
}

const ageFilterBtn = document.querySelector("#age_submit");
ageFilterBtn.addEventListener("click" , () =>{
      const from = document.querySelector("#from_age").value;
      const to = document.querySelector("#to_age").value;
      if(from == 0 && to == 0){
        const input = document.querySelectorAll(".age_input");
        input.forEach(e =>[
            e.placeholder = "enter value"
        ]);
        console.log("enter value");
        return;
      }

      let data = [];
      if(specificDepartmentUser.length === 0){
        data = allUsers;
      }
      else{
        data = specificDepartmentUser;
      }
      agefilter(from,to,data);

      
});
async function init() {
    await fetchDepartment();
    displayDepartmentFilter();
    console.log(specificDepartmentUser); 

}

init();




