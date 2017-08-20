package snippet.web.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import snippet.web.project.model.Snippet;
import snippet.web.project.repositories.SnippetRepository;

@Service
public class SnippetService {

    @Autowired
    private SnippetRepository snippetRepository;

    public Snippet save(Snippet s){
        return snippetRepository.save(s);
    }

}
