// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");


// FETCHING FROM THE API
fetch(urlAPI)
    .then(Response => Response.json())
    .then(data =>data.results)
    .then(displayEmployees)
    

// HELPER FUNCTIONS
function displayEmployees(employeeData){
    let employeeHtml = "";

    employees = employeeData;

    employees.forEach((employee,index) =>{
        let profilePic = employee.picture.large;
        let name = employee.name.first + " " + employee.name.last;
        let email = employee.email;
        let city = employee.location.city;
        


        employeeHtml +=  
        
        `<div class="card" data-index=${index}>
        <img src="${profilePic}" alt="profile image" class="avatar">
        <div class="text-container">
            <h2 class="name">${name}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
        </div>
    </div>
    ` 
       
        gridContainer.innerHTML = employeeHtml;
        
    })
    
    
}


function displayModal(index){
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
<img class="avatar" src="${picture.large}" />
<div class="text-container">
<h2 class="name">${name.first} ${name.last}</h2>
<p class="email">${email}</p>
<p class="address">${city}</p>
<hr />
<p>${phone}</p>
<p class="address">${street}, ${state} ${postcode}</p>
<p>Birthday:
${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
</div>
`;

overlay.classList.remove("hidden");
modalContainer.innerHTML = modalHTML;

}
gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element
    
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    displayModal(index);
    }
    });

    modalClose.addEventListener('click', () => {
        overlay.classList.add("hidden");
        });



    