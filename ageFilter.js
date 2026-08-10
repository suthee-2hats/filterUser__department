import {displayUser} from "./script.js";

const ageFilterBtn = document.querySelector("#age_submit");
ageFilterBtn.addEventListener("click" , () =>{
      const from = document.querySelector("#from_age").value;
      const to = document.querySelector("#to_age").value;
      console.log("from"+from);
});

export async function  agefilter(from,to,data){
    
   
    data.forEach(e => {
       
        if (e.age < from || e.age > to) {
            e.display = false;
        } else {
            e.display = true;
        }
        
    });

    displayUser(data);

    
}


