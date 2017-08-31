package snippet.web.project.web.rest.dto;

public class CreateCommentDTO {

    private long id;

    private String description;

    // username usera koji je ostavio komentar
    private String user;

    // id snippeta na koji je ostavio komentar
    private Long snippet;

    public CreateCommentDTO() {
    }

    public CreateCommentDTO(long id, String description, String user, Long snippet) {
        this.id = id;
        this.description = description;
        this.user = user;
        this.snippet = snippet;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Long getSnippet() {
        return snippet;
    }

    public void setSnippet(Long snippet) {
        this.snippet = snippet;
    }
}
