package ru.esplit.first_security_app.models;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;

import lombok.Data;
import lombok.NoArgsConstructor;

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
