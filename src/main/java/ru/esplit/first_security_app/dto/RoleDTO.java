package ru.esplit.first_security_app.dto;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;

import lombok.Data;
import lombok.NoArgsConstructor;
import ru.esplit.first_security_app.models.Operation;
import ru.esplit.first_security_app.models.Person;

@Data
@NoArgsConstructor
public class RoleDTO {
    private String id;

    private List<Person> persons;

    public String getAuthority() {
        return this.id;
    }
    private List<Operation> allowedOperations;

    public Collection<? extends GrantedAuthority> getAllowedOperations() {
        return allowedOperations;
    }
}
