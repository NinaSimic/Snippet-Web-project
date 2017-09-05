package snippet.web.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import snippet.web.project.repositories.GradeRepository;

@Service
public class GradeService {

    @Autowired
    private GradeRepository gradeRepository;
}
