(function(){
    csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    
    let buttonSubmitForCreateNewPerson = document.getElementById("myCreateNewPerson");
    buttonSubmitForCreateNewPerson.addEventListener('click', function(event){
        event.preventDefault();
        let selectElement = document.getElementById("usersRoles");
        let tableBody = document.getElementById("myTableBody")
        let toAllPersonButton = document.getElementById("nav-home-tab");
        let selectedOptions = Array.from(selectElement.selectedOptions).map(option => ({id: option.value, persons: null, allowedOperations: null, authority: option.value}));

        person = {
            id: 0,
            username: document.getElementById('username').value,
            yearOfBirth: document.getElementById('yearOfBirth').value,
            password: document.getElementById('password').value,
            roles: selectedOptions
        }
        fetch("/api/person", {
            method: 'POST',
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
    document.getElementById('username').value = "";
    document.getElementById('yearOfBirth').value = 0;
    document.getElementById('password').value = "";
    tableBody.insertAdjacentHTML("beforeEnd", 
        `<tr>
            <td>${person.id}</td>
            <td>${person.username}</td>
            <td>${person.yearOfBirth}</td>
            <td>${person.roles}</td>
            <td>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editUser">Редактировать</button>
            </td>
            <td>
                <form method=\"POST\" action=\"/admin/users/${person.id}/delete\">
                    <input class=\"btn btn-danger\" type=\"submit\" value=\"Удалить\" />
                </form>
            </td>
        </tr>`);

    toAllPersonButton.click();
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