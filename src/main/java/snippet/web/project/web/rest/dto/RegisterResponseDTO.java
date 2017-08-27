package snippet.web.project.web.rest.dto;

public class RegisterResponseDTO {

    private Long id;

    public RegisterResponseDTO() {
    }

    public RegisterResponseDTO(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
