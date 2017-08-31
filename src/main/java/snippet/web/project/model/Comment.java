package snippet.web.project.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private long id;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "date", nullable = false)
    private Date date;

    @ManyToOne
    @JoinColumn(name = "user")
    private User user;

    @OneToMany(cascade = CascadeType.REMOVE)
    private List<Grade> grades;

    @Column(name = "number_positive", nullable = false)
    private int number_positive;

    @Column(name = "number_negative", nullable = false)
    private int number_negative;

    public Comment() {
    }

    public Comment(String description, Date date, User user, List<Grade> grades, int number_positive, int number_negative) {
        this.description = description;
        this.date = date;
        this.user = user;
        this.grades = grades;
        this.number_positive = number_positive;
        this.number_negative = number_negative;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Grade> getGrades() {
        return grades;
    }

    public void setGrades(List<Grade> grades) {
        this.grades = grades;
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

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", date=" + date +
                ", user=" + user +
                ", grades=" + grades +
                ", number_positive=" + number_positive +
                ", number_negative=" + number_negative +
                '}';
    }
}
