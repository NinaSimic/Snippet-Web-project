package snippet.web.project.model;

import snippet.web.project.model.enumerations.Role;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "person")
public class Person {

  @Id
  @GeneratedValue
  @Column(name = "ID")
  private Long id;

  @Column(name = "USERNAME", nullable = false, unique = true)
  private String username;

  @Column(name = "PASSWORD", nullable = false)
  private String password;

  @Column(name = "FIRSTNAME", nullable = false)
  private String firstname;

  @Column(name = "LASTNAME", nullable = false)
  private String lastname;

  @NotNull
  @Enumerated(EnumType.STRING)
  private Role role;

  @Column(name = "PHONENUMBER", nullable = false)
  private String phoneNumber;

    @Column(name = "EMAIL", nullable = false)
  private String email;

  @Column(name = "ADDRESS", nullable = false)
  private String address;

  @Column(name = "IMAGEURL", nullable = false)
  private String imageUrl;

  public Person() {
  }

  public Person(String username, String password, String firstname, String lastname, Role role, String phoneNumber, String email, String address, String imageUrl) {
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.address = address;
    this.imageUrl = imageUrl;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getFirstname() {
    return firstname;
  }

  public void setFirstname(String firstname) {
    this.firstname = firstname;
  }

  public String getLastname() {
    return lastname;
  }

  public void setLastname(String lastname) {
    this.lastname = lastname;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }
}
