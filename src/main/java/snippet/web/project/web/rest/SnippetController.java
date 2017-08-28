package snippet.web.project.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import snippet.web.project.model.Language;
import snippet.web.project.model.Snippet;
import snippet.web.project.model.User;
import snippet.web.project.model.enumerations.Role;
import snippet.web.project.model.enumerations.SnippetState;
import snippet.web.project.service.SnippetService;
import snippet.web.project.service.UserService;
import snippet.web.project.util.ResponseMessage;
import snippet.web.project.web.rest.dto.CreateSnippetDTO;


@RestController
@RequestMapping("/api/snippet")
public class SnippetController {

    @Autowired
    private SnippetService snippetService;

    @Autowired
    private UserService userService;


    @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity createNewSnippet(@RequestBody CreateSnippetDTO createSnippetDTO) {
        Snippet snippet = new Snippet();

        Language l = new Language();
        l.setId(createSnippetDTO.getLanguage());

        snippet.setDescription(createSnippetDTO.getDescription());
        snippet.setClip(createSnippetDTO.getClip());
        snippet.setLanguage(l);
        // IZMENITI!!!! Pitati sta predstavlja taj url
        snippet.setUrl_reporsitory("" + createSnippetDTO.getId());
        snippet.setEnd_date(createSnippetDTO.getEnd_date());
        snippet.setState(SnippetState.APROVED);

        snippet.setUser(userService.findByUsername("ver"));

        snippetService.save(snippet);

        return new ResponseEntity<>(snippet, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    public ResponseEntity delete(@PathVariable Long id, @RequestHeader("X-Auth-Token") String token)
    {

        User user = userService.findByToken(token);
      /*  if(user.getRole() != Role.USER || user.getRole() != Role.ADMIN){
            return new ResponseEntity<>(new ResponseMessage("You are not allowed to delete snippet!"), HttpStatus.BAD_REQUEST);
        }*/
        Snippet s = snippetService.findById(id);
        if (s.getUser().getId() == user.getId()){

         //   verifierReportService.deleteReportsOfAdvertisement(a);
            snippetService.delete(s);

            //treba obrisati i sve one iste!!!!
            return new ResponseEntity<>(s, HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseMessage("You are not allowed to delete advertisement!"), HttpStatus.BAD_REQUEST);

    }
}
