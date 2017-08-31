package snippet.web.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import snippet.web.project.model.Comment;
import snippet.web.project.repositories.CommentRepository;

import java.util.List;


@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> findAll() {return commentRepository.findAll();}

    public Comment save(Comment c){
        return commentRepository.save(c);
    }
}
