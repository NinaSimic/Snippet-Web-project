package snippet.web.project.service;

        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;
        import snippet.web.project.model.Language;
        import snippet.web.project.repositories.LanguageRepository;

        import java.util.List;

@Service
public class LanguageService {

    @Autowired
    private LanguageRepository languageRepository;

    public Language findByName(String name){return languageRepository.findByName(name);}

    public List<Language> findAll() {return languageRepository.findAll();}
}
