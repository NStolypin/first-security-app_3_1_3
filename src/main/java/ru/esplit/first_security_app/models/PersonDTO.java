package ru.esplit.first_security_app.models;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PersonDTO {
    private long id;
    private String username;
    private int yearOfBirth;
    private String password;
    private List<RoleDTO> roles;

    public List<PersonDTO> getPersonDTOList(List<Person> personList) {
        List<PersonDTO> personDTOList = new ArrayList<>();
        for (Person person : personList) {
            roles = new ArrayList<>();
            PersonDTO personDTO = new PersonDTO();
            personDTO.setId(person.getId());
            personDTO.setUsername(person.getUsername());
            personDTO.setYearOfBirth(person.getYearOfBirth());
            personDTO.setPassword(person.getPassword());
            for (Role role : person.getRoles()) {
                RoleDTO roleDTO = new RoleDTO();
                roleDTO.setId(role.getId());
                roles.add(roleDTO);
            }
            personDTO.setRoles(roles);
            personDTOList.add(personDTO);
        }
        return personDTOList;
    }
}
