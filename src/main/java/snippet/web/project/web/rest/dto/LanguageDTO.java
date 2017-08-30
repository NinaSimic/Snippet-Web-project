package snippet.web.project.web.rest.dto;

public class LanguageDTO {

    private Long id;

    private String name;

    public LanguageDTO() {
    }

    public LanguageDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "LanguageDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
