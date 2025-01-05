package ru.esplit.first_security_app.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import ru.esplit.first_security_app.dto.PersonDTO;
import ru.esplit.first_security_app.dto.RoleDTO;
import ru.esplit.first_security_app.models.Person;
import ru.esplit.first_security_app.models.Role;
import ru.esplit.first_security_app.services.AdminService;
import ru.esplit.first_security_app.services.PeopleService;
import ru.esplit.first_security_app.services.RoleService;
import ru.esplit.first_security_app.util.PersonErrorResponse;
import ru.esplit.first_security_app.util.PersonNotCreatedException;
import ru.esplit.first_security_app.util.PersonNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api")
public class AdminRestController {

    private final AdminService adminService;
    private final RoleService roleService;
    private final PeopleService peopleService;

    public AdminRestController(AdminService adminService,
            RoleService roleService,
            PeopleService peopleService) {
        this.adminService = adminService;
        this.roleService = roleService;
        this.peopleService = peopleService;
    }

    @GetMapping("/allpeople")
    public List<PersonDTO> showAllUsers(Model model) {
        PersonDTO personDTO = new PersonDTO();
        return personDTO.getPersonDTOList(adminService.getAllPeople()) ;
    }

    @GetMapping("/person/{id}")
    public PersonDTO getPerson(@PathVariable("id") long id) {
        PersonDTO personDTO = new PersonDTO();
        return personDTO.getPersonDTO(peopleService.findOne(id));
    }

    @PostMapping("/person")
    public ResponseEntity<HttpStatus> create(@RequestBody @Valid PersonDTO personDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMsg = new StringBuilder();
            List<FieldError> errors = bindingResult.getFieldErrors();
            for (FieldError error : errors) {
                errorMsg.append(error.getField())
                        .append(" - ").append(error.getDefaultMessage())
                        .append(";");
            }

            throw new PersonNotCreatedException(errorMsg.toString());
        }

        peopleService.save(peopleService.convertToPerson(personDTO));
        return ResponseEntity.ok(HttpStatus.OK);
    }
    

    @ExceptionHandler
    private ResponseEntity<PersonErrorResponse> handleException(PersonNotFoundException e) {
        PersonErrorResponse response = new PersonErrorResponse(
            "Person with this id wasn't found",
            System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    private ResponseEntity<PersonErrorResponse> handleException(PersonNotCreatedException e) {
        PersonErrorResponse response = new PersonErrorResponse(
            e.getMessage(),
            System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
