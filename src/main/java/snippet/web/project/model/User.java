package snippet.web.project.model;

import snippet.web.project.model.enumerations.Role;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "person")
public class User {

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

  @Column(name = "PHONENUMBER", nullable = false)
  private String phoneNumber;

  @Column(name = "EMAIL", nullable = false)
  private String email;

  @Column(name = "ADDRESS", nullable = false)
  private String address;

  @Column(name = "addressNumb", nullable = false)
  private String addressNumb;

  @Column(name = "city", nullable = false)
  private String city;

  @Column(name = "country", nullable = false)
  private String country;

  @Column(name = "IMAGEURL", nullable = false)
  private String imageUrl;

  @com.sun.istack.internal.NotNull
  @Enumerated(EnumType.STRING)
  private Role role;

  public User() {
  }

  public User(String username, String password, String firstname, String lastname, String phoneNumber, String email, String address, String addressNumb, String city, String country, String imageUrl, Role role) {
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.address = address;
    this.addressNumb = addressNumb;
    this.city = city;
    this.country = country;
    this.imageUrl = imageUrl;
    this.role = role;
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

  public String getAddressNumb() {
    return addressNumb;
  }

  public void setAddressNumb(String addressNumb) {
    this.addressNumb = addressNumb;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

  @Override
  public String toString() {
    return "User{" +
            "id=" + id +
            ", username='" + username + '\'' +
            ", password='" + password + '\'' +
            ", firstname='" + firstname + '\'' +
            ", lastname='" + lastname + '\'' +
            ", phoneNumber='" + phoneNumber + '\'' +
            ", email='" + email + '\'' +
            ", address='" + address + '\'' +
            ", addressNumb='" + addressNumb + '\'' +
            ", city='" + city + '\'' +
            ", country='" + country + '\'' +
            ", imageUrl='" + imageUrl + '\'' +
            ", role=" + role +
            '}';
  }
}
