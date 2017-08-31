package snippet.web.project.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import snippet.web.project.model.Comment;
import snippet.web.project.model.User;
import snippet.web.project.model.enumerations.UserStatus;
import snippet.web.project.service.CommentService;
import snippet.web.project.service.UserService;
import snippet.web.project.util.ResponseMessage;
import snippet.web.project.web.rest.dto.CreateCommentDTO;

import java.util.Date;

@RestController
@RequestMapping("/api/comment")
public class CommentContoller {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity createNewComment(@RequestBody CreateCommentDTO createCommentDTO) {

        String username = createCommentDTO.getUser();
        User u = new User();
        if(userService.findByUsername(username) == null){
            u.setStatus(UserStatus.APPROVED);
        }
        else if(userService.findByUsername(username) != null){
            u = userService.findByUsername(username);
        }

        username = u.getUsername();
        if(u.getStatus() == UserStatus.APPROVED) {

            Comment comment = new Comment();

            comment.setDescription(createCommentDTO.getDescription());
            comment.setDate(new Date());
            comment.setUser(userService.findByUsername(username));

            commentService.save(comment);

            return new ResponseEntity<>(comment, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(new ResponseMessage("You are blocked and unable to do this function!"), HttpStatus.BAD_REQUEST);
    }
}
