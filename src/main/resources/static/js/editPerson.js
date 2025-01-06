(function(){
    csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    
    let backG = document.getElementById("ansErrorR");
    let buttonSubmitForEditNewPerson = document.getElementById("myEditPerson");
    buttonSubmitForEditNewPerson.addEventListener('click', function(event){
        event.preventDefault();
        let selectElement = document.getElementById("usersRolesR");
        let tableBody = document.getElementById("myTableBody")
        let selectedOptions = Array.from(selectElement.selectedOptions).map(option => ({id: option.value, persons: null, allowedOperations: null, authority: option.value}));

        let id = document.getElementById('idPerson').value;
        let username = document.getElementById('usernameR').value;
        let yearOfBirth = document.getElementById('yearOfBirthR').value;
        let password = document.getElementById('passwordR').value;
        person = {
            id: id,
            username: username,
            yearOfBirth: yearOfBirth,
            password: password,
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
        }).then(response => (response.ok 
            ? 
            okEditPerson(backG, tableBody, person)
            :
            notEditPerson(response)
        ));
       
    });
}());

function okEditPerson(backG, tableBody, person) {
    backG.insertAdjacentHTML("beforeEnd", 
        `<p style="color:darkgreen">
            Пользователь успешно отредактирован
        </p>`);
}

function notEditPerson(response) {
    response.json().then(function(data) {
        let ansErrors = document.getElementById("ansError");
        ansErrors.insertAdjacentHTML("beforeEnd",
        `<p style="color:red">
            ${data.message}
        </p>`
    );
    })
    
    
}