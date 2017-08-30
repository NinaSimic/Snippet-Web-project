package snippet.web.project.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import snippet.web.project.model.Snippet;
import snippet.web.project.model.User;
import snippet.web.project.model.enumerations.Role;
import snippet.web.project.service.AuthorityService;
import snippet.web.project.service.SnippetService;
import snippet.web.project.service.UserService;
import snippet.web.project.util.ResponseMessage;
import snippet.web.project.web.rest.dto.RegisterDTO;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthorityService authorityService;

    @Autowired
    private SnippetService snippetService;

    //registracija administratora i verifikatora!
    @RequestMapping(value = "/modify", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity modifyUser(@RequestBody RegisterDTO changedUserDTO, @RequestHeader("X-Auth-Token") String token) {
        User user = userService.findByToken(token);


        user.setUsername(changedUserDTO.getUsername());
        user.setPassword(changedUserDTO.getPassword());
        user.setFirstname(changedUserDTO.getFirstname());
        user.setLastname(changedUserDTO.getLastname());
        user.setPhone(changedUserDTO.getPhone());
        user.setEmail(changedUserDTO.getEmail());
        user.setAddress(changedUserDTO.getAddress());
        user.setAnumber(changedUserDTO.getAnumber());
        user.setCity(changedUserDTO.getCity());
        user.setCountry(changedUserDTO.getCountry());
        // promenitiiiii
        user.setImage(null);
        Role role = Role.ADMIN;
        user.setRole(role);
        user.setAuthority(authorityService.findByName("ROLE_ADMIN"));

        userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/getAllMySnippets", method = RequestMethod.GET)
    public ResponseEntity getAllMyAdvertisements(@RequestHeader("X-Auth-Token") String token) {




            User user = userService.findByToken(token);
            if (user.getRole() == Role.ADMIN){

                List<Snippet> mySnippets = new ArrayList<>();

                for (Snippet s : snippetService.findAll()) {
                    if (s.getUser().getId() == user.getId()){
                        mySnippets.add(s);
                    }
                }
                return new ResponseEntity<>(mySnippets, HttpStatus.OK);
            }

            return new ResponseEntity<>(new ResponseMessage("Loged user is not registrated user!"), HttpStatus.BAD_REQUEST);
        }
}
