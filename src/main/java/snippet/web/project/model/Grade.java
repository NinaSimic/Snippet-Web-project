package snippet.web.project.model;


import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
@Table(name = "grade")
public class Grade {

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private long id;

    @Column(name = "positive", nullable = false)
    private boolean positive;

    @ManyToOne
    @JoinColumn(name = "user", nullable = false)
    private User user;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "comment", nullable = false)
    private Comment comment;

    public Grade() {
    }

    public Grade(boolean positive, User user, Comment comment) {
        this.positive = positive;
        this.user = user;
        this.comment = comment;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    @Override
    public String toString() {
        return "Grade{" +
                "id=" + id +
                ", positive=" + positive +
                ", user=" + user +
                '}';
    }
}
