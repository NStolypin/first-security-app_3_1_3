(async function(){
    let response = await fetch("/api/allpeople");

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    let json = await response.json();
    let tableBody = document.getElementById("myTableBody")
    json.forEach(function(item) {
        tableBody.insertAdjacentHTML("beforeEnd", 
            `<tr>
                <td>${item.id}</td>
                <td>${item.username}</td>
                <td>${item.yearOfBirth}</td>
                <td>${item.roles}</td>
                <td>
                    <button type=\"button\" class=\"btn btn-primary\" data-bs-toggle=\"modal\" data-bs-target=\"${'#editUser' + item.id}\">Редактировать</button>
                </td>
                <td>
                    <form method=\"POST\" action=\"/admin/users/${item.id}/delete\">
                        <input class=\"btn btn-danger\" type=\"submit\" value=\"Удалить\" />
                    </form>
                </td>
            </tr>`);
    });
    
    } else {
    alert("Ошибка HTTP: " + response.status);
    }
}());