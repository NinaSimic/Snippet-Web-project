package snippet.web.project.web.rest.dto;

public class CreateGradeDTO {

    private long id;

    private boolean positive;

    private String username;

    private long commentID;

    public CreateGradeDTO() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isPositive() {
        return positive;
    }

    public void setPositive(boolean positive) {
        this.positive = positive;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public long getCommentID() {
        return commentID;
    }

    public void setCommentID(long commentID) {
        this.commentID = commentID;
    }

    @Override
    public String toString() {
        return "CreateGradeDTO{" +
                "id=" + id +
                ", positive=" + positive +
                ", username='" + username + '\'' +
                ", commentID=" + commentID +
                '}';
    }
}
