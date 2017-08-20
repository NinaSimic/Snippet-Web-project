package snippet.web.project.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import snippet.web.project.model.Language;
import snippet.web.project.model.Snippet;
import snippet.web.project.service.SnippetService;
import snippet.web.project.service.UserService;
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

        snippet.setUser(userService.findByUsername("admin"));

        snippetService.save(snippet);

        return new ResponseEntity<>(snippet, HttpStatus.CREATED);
    }
}
