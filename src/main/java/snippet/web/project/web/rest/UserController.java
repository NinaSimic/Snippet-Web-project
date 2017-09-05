package snippet.web.project.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import snippet.web.project.model.User;
import snippet.web.project.model.enumerations.Role;
import snippet.web.project.model.enumerations.UserStatus;
import snippet.web.project.security.TokenUtils;
import snippet.web.project.service.AuthorityService;
import snippet.web.project.service.UserService;
import snippet.web.project.util.ResponseMessage;
import snippet.web.project.web.rest.dto.LoginDTO;
import snippet.web.project.web.rest.dto.RegisterDTO;
import snippet.web.project.web.rest.dto.RegisterResponseDTO;
import snippet.web.project.web.rest.dto.UserDTO;

import javax.servlet.ServletContext;
import java.io.IOException;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthorityService authorityService;


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private TokenUtils tokenUtils;

    @Autowired
    ServletContext servletContext;

    @RequestMapping(value = "/login", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public ResponseEntity login(@RequestBody LoginDTO loginDTO) {
        try {
            System.out.println("*** Pocinje login na backendu");

            if(loginDTO.getUsername() == null || loginDTO.getPassword() == null){
                return new ResponseEntity<>(new ResponseMessage("Username or password must be inserted!"), HttpStatus.BAD_REQUEST);
            }
            // Perform the authentication
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginDTO.getUsername(),
                    loginDTO.getPassword());
            Authentication authentication = authenticationManager.authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetails details = userDetailsService.loadUserByUsername(loginDTO.getUsername());
            String final_token = tokenUtils.generateToken(details);

            User u = userService.findByToken(final_token);
            // vratimo 200 OK, klijennt MORA DA SACUVA TRAJNi O ovaj token, i da ga stalno salje u svaki sledeci request
            // X-Auth-Header
        //    System.out.println(final_token + " " + u.getRole().name());
            return new ResponseEntity<>(new ResponseMessage(final_token + " " + u.getRole().name()), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(new ResponseMessage("Invalid login"),
                    HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/d", method = RequestMethod.GET)
    public ResponseEntity<UserDTO> getData(@RequestHeader("X-Auth-Token") String token)
    {
        System.out.println("Usao u metodu na bekendu");
        User user = userService.findByToken(token);
        System.out.println("user" + user.toString());
        return new ResponseEntity<>(new UserDTO(user), HttpStatus.OK);
    }

  /*  @RequestMapping(value = "/login", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public ResponseEntity login(@RequestBody LoginDTO loginDTO) {
        try {
            System.out.println("*** Pocinje login na backendu");

            if(loginDTO.getUsername() == null || loginDTO.getPassword() == null){
                return new ResponseEntity<>(new ResponseMessage("Username or password must be inserted!"), HttpStatus.BAD_REQUEST);
            }
            System.out.println(" backend username:" + loginDTO.getUsername());
            System.out.println(" backend password:" + loginDTO.getPassword());
            // Perform the authentication
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginDTO.getUsername(),
                    loginDTO.getPassword());
            Authentication authentication = authenticationManager.authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetails details = userDetailsService.loadUserByUsername(loginDTO.getUsername());
            String final_token = tokenUtils.generateToken(details);

            User u = userService.findByToken(final_token);
            System.out.println(final_token + " " + u.getRole().name());
            // vratimo 200 OK, klijennt MORA DA SACUVA TRAJNi O ovaj token, i da ga stalno salje u svaki sledeci request
            // X-Auth-Header
            return new ResponseEntity<>(new ResponseMessage(final_token + " " + u.getRole().name()), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(new ResponseMessage("Invalid login"),
                    HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/data", method = RequestMethod.GET)
    public ResponseEntity<UserDTO> getData(@RequestHeader("X-Auth-Token") String token)
    {
        User user = userService.findByToken(token);
        return new ResponseEntity<>(new UserDTO(user), HttpStatus.OK);
    } */

    //registracija korisnika
    @RequestMapping(value = "/register", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<RegisterResponseDTO> registerUser(@RequestBody RegisterDTO registerDTO) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // System.out.println("Pocinje registracija korisnika na backendu!");

        System.out.println("new User: " + registerDTO.toString());

        Role role = Role.USER;
        User user = new User();


        user.setUsername(registerDTO.getUsername());
        user.setPassword(encoder.encode(registerDTO.getPassword()));
        user.setFirstname(registerDTO.getFirstname());
        user.setLastname(registerDTO.getLastname());
        user.setPhone(registerDTO.getPhone());
        user.setEmail(registerDTO.getEmail());
        user.setAddress(registerDTO.getAddress());
        user.setAnumber(registerDTO.getAnumber());
        user.setCity(registerDTO.getCity());
        user.setCountry(registerDTO.getCountry());
        user.setImage(null);
        user.setRole(role);
        user.setAuthority(authorityService.findByName("ROLE_USER"));
        user.setStatus(UserStatus.APPROVED);


        userService.register(user);

        return new ResponseEntity<RegisterResponseDTO>(new RegisterResponseDTO(user.getId()), HttpStatus.OK);
    }

    @RequestMapping(value = "/uploadImage", method = RequestMethod.POST)
    public ResponseEntity<?> uploadImage(
            @RequestParam("file") MultipartFile uploadfile, @RequestParam("id") Long id) {

        if (uploadfile.isEmpty()) {
            return new ResponseEntity("please select a file!", HttpStatus.OK);
        }
        String imageUrl = "";
        try {

            String realPath = servletContext.getRealPath("/");

            imageUrl = userService.saveUploadedFiles(realPath, uploadfile, id);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(new ResponseMessage(imageUrl), new HttpHeaders(), HttpStatus.OK);

    }
}
