(function(){
    csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    
    let buttonSubmitForEditNewPerson = document.getElementById("myEditPerson");
    buttonSubmitForEditNewPerson.addEventListener('click', function(event){
        event.preventDefault();
        let selectElement = document.getElementById("usersRolesR");
        let tableBody = document.getElementById("myTableBody")
        let toAllPersonButton = document.getElementById("nav-home-tab");
        let selectedOptions = Array.from(selectElement.selectedOptions).map(option => ({id: option.value, persons: null, allowedOperations: null, authority: option.value}));

        person = {
            id: document.getElementById('idPerson').value,
            username: document.getElementById('usernameR').value,
            yearOfBirth: document.getElementById('yearOfBirthR').value,
            password: document.getElementById('passwordR').value,
            roles: selectedOptions
        }
        fetch("/api/person", {
            method: 'PATCH',
            headers: {
                'X-XSRF-TOKEN': csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        }).then(response => (response.ok ? 
            okCreatedNewPerson(toAllPersonButton, tableBody, person)
             :
            notCreatedNewPerson(response)
        ));
       
    });
}());

function okCreatedNewPerson(toAllPersonButton, tableBody, person) {
    
}

function notCreatedNewPerson(response) {
    response.json().then(function(data) {
        let ansErrors = document.getElementById("ansError");
        ansErrors.insertAdjacentHTML("beforeEnd",
        `<p style="color:red">
            ${data.message}
        </p>`
    );
    })
    
    
}