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

    @Column(name = "user", nullable = false)
    private User user;

    @OneToMany(cascade = CascadeType.REMOVE)
    private Grade grade;

    @OneToMany(cascade = CascadeType.REMOVE)
    private List<Grade> grades;

    public Comment() {
    }

    public Comment(String description, Date date, User user, Grade grade, List<Grade> grades) {
        this.description = description;
        this.date = date;
        this.user = user;
        this.grade = grade;
        this.grades = grades;
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

    public Grade getGrade() {
        return grade;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }

    public List<Grade> getGrades() {
        return grades;
    }

    public void setGrades(List<Grade> grades) {
        this.grades = grades;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", date=" + date +
                ", user=" + user +
                ", grade=" + grade +
                ", grades=" + grades +
                '}';
    }
}
