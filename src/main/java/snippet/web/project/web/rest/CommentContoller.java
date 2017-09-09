package snippet.web.project.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import snippet.web.project.model.Comment;
import snippet.web.project.model.Snippet;
import snippet.web.project.model.User;
import snippet.web.project.model.enumerations.Role;
import snippet.web.project.model.enumerations.UserStatus;
import snippet.web.project.repositories.CommentRepository;
import snippet.web.project.repositories.GradeRepository;
import snippet.web.project.service.CommentService;
import snippet.web.project.service.GradeService;
import snippet.web.project.service.SnippetService;
import snippet.web.project.service.UserService;
import snippet.web.project.util.ResponseMessage;
import snippet.web.project.web.rest.dto.CreateCommentDTO;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/comment")
public class CommentContoller {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @Autowired
    private SnippetService snippetService;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private GradeRepository gradeRepository;


    @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity createNewComment(@RequestBody CreateCommentDTO createCommentDTO) {

        String username = createCommentDTO.getUser();
        Long snippetID = createCommentDTO.getSnippet();
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

            ////////////////////////////////////////////////////////////
            Snippet snippet = snippetService.findById(snippetID); // <-----
            List<Comment> comments = commentRepository.findBySnippet(snippet); // <-----
            comments.add(comment);
            snippet.setComments(comments);

            comment.setSnippet(snippet);  // <-----
            //////////////////////////////////////////////////////////////
            commentService.save(comment);
            snippetService.save(snippet);

            return new ResponseEntity<>(comment, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(new ResponseMessage("You are blocked and unable to do this function!"), HttpStatus.BAD_REQUEST);
    }
    // get all comments of one snippet
    @RequestMapping(value = "/getAllComments/{id}", method = RequestMethod.GET)
    public ResponseEntity getAllComments(@PathVariable Long id) {

        System.out.println("stigao u get all comments id snippeta " + id);

        Snippet snippet = snippetService.findById(id);

        if(snippet == null) {
            return new ResponseEntity<>(new ResponseMessage("Snippet with id " + id  + " was not found!"), HttpStatus.NOT_FOUND);
        }



        List<Comment> snippetComments = snippet.getComments();
        for(Comment comment : snippetComments) {
            comment.setGrades(gradeRepository.findByComment(comment));
        }



        return new ResponseEntity<>(snippetComments, HttpStatus.OK);

    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    public ResponseEntity delete(@PathVariable Long id, @RequestHeader("X-Auth-Token") String token)
    {

        User user = userService.findByToken(token);

        if(user == null) {
            return new ResponseEntity<>(new ResponseMessage("Un-registered users cannot delete comments"), HttpStatus.FORBIDDEN);
        }


        Comment c = commentService.findById(id);
        if(c == null) {
            return new ResponseEntity<>(new ResponseMessage("Comment with id " + id  + " was not found!"), HttpStatus.NOT_FOUND);
        }

        Snippet snippet = c.getSnippet();

        if(user.getRole().equals(Role.ADMIN)){

            snippet.getComments().remove(c);

            commentService.delete(c);

            return new ResponseEntity<>(c, HttpStatus.OK);


        }
        else if(user.getRole().equals(Role.USER)){

            if(c.getUser().getId() != null){
                if (c.getUser().getId() == user.getId()){

                    snippet.getComments().remove(c);

                    commentService.delete(c);

                    return new ResponseEntity<>(c, HttpStatus.OK);
                }


            }
        }

        return new ResponseEntity<>(new ResponseMessage("You are not allowed to delete comment!"), HttpStatus.BAD_REQUEST);

    }

}
