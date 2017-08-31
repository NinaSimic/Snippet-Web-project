package snippet.web.project.web.rest.dto;

public class CreateCommentDTO {

    private long id;

    private String description;

    private String user;

    public CreateCommentDTO() {
    }

    public CreateCommentDTO(long id, String description, String user) {
        this.id = id;
        this.description = description;
        this.user = user;
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
}
