package snippet.web.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import snippet.web.project.model.Snippet;
import snippet.web.project.repositories.SnippetRepository;

import java.util.List;

@Service
public class SnippetService {

    @Autowired
    private SnippetRepository snippetRepository;

    public Snippet findById(Long id){
        return snippetRepository.findById(id);
    }

    public Snippet save(Snippet s){
        return snippetRepository.save(s);
    }

    public List<Snippet> findAll(){ return snippetRepository.findAll();}

    public void delete(Snippet s){snippetRepository.delete(s);}

}
