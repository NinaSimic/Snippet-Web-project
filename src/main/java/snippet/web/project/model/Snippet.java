package snippet.web.project.model;

import snippet.web.project.model.enumerations.SnippetState;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "snippet")
public class Snippet {

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private long id;

    @Column(name = "description", nullable = false)
    private String description;

    @Lob
    @Column(name = "clip", nullable = false, length=8092)
    private String clip;

    @ManyToOne
    @JoinColumn(name = "language", nullable = false)
    private Language language;

    @Column(name = "url_reporsitory", nullable = false)
    private String url_reporsitory;

    @Column(name = "end_date ", nullable = false)
    private long end_date;

    @Column(name = "creation_date", nullable = false)
    private Date creation_date;

    @OneToMany(cascade = CascadeType.REMOVE)
    private List<Comment> comments;

    @ManyToOne
    @JoinColumn(name = "user")
    private User user;

    @NotNull
    @Enumerated(EnumType.STRING)
    private SnippetState state;

    public Snippet() {
    }

    public Snippet(String description, String clip, Language language, String url_reporsitory, long end_date, Date creation_date, List<Comment> comments, User user, SnippetState state) {
        this.description = description;
        this.clip = clip;
        this.language = language;
        this.url_reporsitory = url_reporsitory;
        this.end_date = end_date;
        this.creation_date = creation_date;
        this.comments = comments;
        this.user = user;
        this.state = state;
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

    public String getClip() {
        return clip;
    }

    public void setClip(String clip) {
        this.clip = clip;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public String getUrl_reporsitory() {
        return url_reporsitory;
    }

    public void setUrl_reporsitory(String url_reporsitory) {
        this.url_reporsitory = url_reporsitory;
    }

    public long getEnd_date() {
        return end_date;
    }

    public void setEnd_date(long end_date) {
        this.end_date = end_date;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public SnippetState getState() {
        return state;
    }

    public void setState(SnippetState state) {
        this.state = state;
    }

    public Date getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(Date creation_date) {
        this.creation_date = creation_date;
    }

    @Override
    public String toString() {
        return "Snippet{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", clip='" + clip + '\'' +
                ", language=" + language +
                ", url_reporsitory='" + url_reporsitory + '\'' +
                ", end_date=" + end_date +
                ", creation_date=" + creation_date +
                ", comments=" + comments +
                ", user=" + user +
                ", state=" + state +
                '}';
    }


}
