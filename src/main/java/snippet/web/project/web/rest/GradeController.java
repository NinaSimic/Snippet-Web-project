package snippet.web.project.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import snippet.web.project.model.Comment;
import snippet.web.project.model.Grade;
import snippet.web.project.model.User;
import snippet.web.project.model.enumerations.UserStatus;
import snippet.web.project.repositories.GradeRepository;
import snippet.web.project.service.CommentService;
import snippet.web.project.service.GradeService;
import snippet.web.project.service.UserService;
import snippet.web.project.util.ResponseMessage;
import snippet.web.project.web.rest.dto.CreateGradeDTO;

import java.util.List;

@RestController
@RequestMapping("/api/grade")
public class GradeController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private GradeService gradeService;

    @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity createNewGrade(@RequestBody CreateGradeDTO createGradeDTO) {

        System.out.println("Usao u kreiranje grade na backendu");

        String username = createGradeDTO.getUsername();
        Long commentID = createGradeDTO.getCommentID();

        Grade grade = new Grade();

        grade.setUser(userService.findByUsername(username));
        System.out.println("setovao oceni usera na " + grade.getUser());
        grade.setPositive(createGradeDTO.isPositive());
        System.out.println("setovao oceni positive na " + grade.isPositive());
        grade.setComment(commentService.findById(commentID));
        System.out.println("setovao oceni coment na " + grade.getComment());

        Comment comment = commentService.findById(commentID);

        if(grade.isPositive() == true){
            int num_positive = comment.getNumber_positive();
            num_positive++;
            comment.setNumber_positive(num_positive);
        }
        else if(grade.isPositive() == false){
            int num_negative = comment.getNumber_negative();
            num_negative++;
            comment.setNumber_negative(num_negative);
        }

        grade.setComment(comment);

        gradeService.save(grade);
        commentService.save(comment);


        return new ResponseEntity<>(grade, HttpStatus.CREATED);
        }

}
