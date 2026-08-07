
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
  -- > If we are using query selector instead of query selector all it cause giving the property to the first one only 
  