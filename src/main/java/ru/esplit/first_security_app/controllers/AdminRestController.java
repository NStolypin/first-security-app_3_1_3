package ru.esplit.first_security_app.controllers;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.esplit.first_security_app.models.Person;
import ru.esplit.first_security_app.models.PersonDTO;
import ru.esplit.first_security_app.services.AdminService;
import ru.esplit.first_security_app.services.RoleService;

@RestController
@RequestMapping("/api")
public class AdminRestController {

    private final AdminService adminService;
    private final RoleService roleService;

    public AdminRestController(AdminService adminService,
            RoleService roleService) {
        this.adminService = adminService;
        this.roleService = roleService;
    }

    @GetMapping("/allpeople")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<PersonDTO> showAllUsers(Model model) {
        PersonDTO personDTO = new PersonDTO();
        return personDTO.getPersonDTOList(adminService.getAllPeople()) ;
    }
}
