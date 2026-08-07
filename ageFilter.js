import {displayUser} from "./script.js";

export async function  agefilter(from,to,data){
    
   
    data.forEach(e => {
        console.log(e);
        if (e.age < from || e.age > to) {
            e.display = false;
        } else {
            e.display = true;
        }
        
    });

    displayUser(data);

    
}
