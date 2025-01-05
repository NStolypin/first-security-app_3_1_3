(function(){
    csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    window.alert(csrfToken);
    person = {
        id: 2,
        username: "user3",
        yearOfBirth: 2002,
        password: "test",
        roles: [
            {
                id: "ROLE_USER",
                persons: null,
                allowedOperations: null,
                authority: "ROLE_USER"
            }
        ]
    }
    let response1 = fetch("/api/person", {
        method: 'POST',
        headers: {
            'X-XSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
      })
}());