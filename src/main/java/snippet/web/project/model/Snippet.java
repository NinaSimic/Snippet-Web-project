package snippet.web.project.model;

import snippet.web.project.model.enumerations.SnippetState;

import javax.persistence.*;
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

    @Column(name = "end_date", nullable = false)
    private Date end_date;

    @OneToMany(cascade = CascadeType.REMOVE)
    private List<Comment> comments;

    @ManyToOne
    @JoinColumn(name = "user", nullable = false)
    private User user;

    @com.sun.istack.internal.NotNull
    @Enumerated(EnumType.STRING)
    private SnippetState state;

    public Snippet() {
    }

    public Snippet(String description, String clip, Language language, String url_reporsitory, Date end_date, List<Comment> comments, User user, SnippetState state) {
        this.description = description;
        this.clip = clip;
        this.language = language;
        this.url_reporsitory = url_reporsitory;
        this.end_date = end_date;
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

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
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

    @Override
    public String toString() {
        return "Snippet{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", clip='" + clip + '\'' +
                ", language=" + language +
                ", url_reporsitory='" + url_reporsitory + '\'' +
                ", end_date=" + end_date +
                ", comments=" + comments +
                ", user=" + user +
                ", state=" + state +
                '}';
    }
}
