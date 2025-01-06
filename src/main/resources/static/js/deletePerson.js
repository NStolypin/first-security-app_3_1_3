(function () {
    csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');

    let SpLst = document.getElementById('myTableBody');
    SpLst.onclick = function (event) {
        let td = event.target.closest('.dltPerson');
        if (!td) return;
        if (!SpLst.contains(td)) return;
        evclick(td);
    }
}());

function evclick(item) {
    let id = { id: Number(item.getAttribute('data-dlt-person')) }
    fetch("/api/delete", {
        method: 'DELETE',
        headers: {
            'X-XSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    }).then(response => response.ok
        ?
        deletePersonOK(item)
        :
        doNotDeletePerson()
    );
}

function deletePersonOK(item) {
    item.parentElement.parentElement.remove();
}

function doNotDeletePerson() {
    alert("Пользователь не удален");
}