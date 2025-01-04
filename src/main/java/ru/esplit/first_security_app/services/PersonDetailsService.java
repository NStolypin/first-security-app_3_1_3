package ru.esplit.first_security_app.services;

import java.util.Optional;

import org.hibernate.Hibernate;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import ru.esplit.first_security_app.models.Person;
import ru.esplit.first_security_app.repositories.PeopleRepository;
import ru.esplit.first_security_app.security.PersonDetails;

@Service
public class PersonDetailsService implements UserDetailsService {

    private final PeopleRepository peopleRepository;

    public PersonDetailsService(PeopleRepository peopleRepository) {
        this.peopleRepository = peopleRepository;
    }

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Person> person = peopleRepository.findByUsername(username);

        if (person.isEmpty()) {
            throw new UsernameNotFoundException("user not found!");
        } else {
            Hibernate.initialize(person.get().getRoles());
            return new PersonDetails(person.get());
        }
    }
}
