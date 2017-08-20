package snippet.web.project.model;


import javax.persistence.*;

@Entity
@Table(name = "grade")
public class Grade {

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private long id;

    @Column(name = "number_positive", nullable = false)
    private int number_positive;

    @Column(name = "number_negative", nullable = false)
    private int number_negative;

    @ManyToOne
    @JoinColumn(name = "user", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "comment", nullable = false)
    private Comment comment;

    public Grade() {
    }

    public Grade(int number_positive, int number_negative, User user, Comment comment) {
        this.number_positive = number_positive;
        this.number_negative = number_negative;
        this.user = user;
        this.comment = comment;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getNumber_positive() {
        return number_positive;
    }

    public void setNumber_positive(int number_positive) {
        this.number_positive = number_positive;
    }

    public int getNumber_negative() {
        return number_negative;
    }

    public void setNumber_negative(int number_negative) {
        this.number_negative = number_negative;
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
                ", number_positive=" + number_positive +
                ", number_negative=" + number_negative +
                ", user=" + user +
                ", comment=" + comment +
                '}';
    }
}
