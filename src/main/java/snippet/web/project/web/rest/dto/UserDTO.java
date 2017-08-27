package snippet.web.project.web.rest.dto;

import snippet.web.project.model.Authority;
import snippet.web.project.model.User;
import snippet.web.project.model.enumerations.Role;

public class UserDTO {

    private String username;

    private String password;

    private String firstname;

    private String lastname;

    private String phone;

    private String email;

    private String address;

    private String anumber;

    private String city;

    private String country;

    private String image;

    private Role role;

    private Authority authority;

    public UserDTO() {
    }

    public UserDTO(User user){
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
        this.phone = user.getPhone();
        this.email = user.getEmail();
        this.address = user.getAddress();
        this.anumber = user.getAnumber();
        this.city = user.getCity();
        this.country = user.getCountry();
        this.image = user.getImage();
        this.role = user.getRole();
        this.authority = user.getAuthority();
    }

    public UserDTO(String username, String password, String firstname, String lastname, String phone, String email, String address, String anumber, String city, String country, String image, Role role, Authority authority) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.anumber = anumber;
        this.city = city;
        this.country = country;
        this.image = image;
        this.role = role;
        this.authority = authority;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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

    public String getAnumber() {
        return anumber;
    }

    public void setAnumber(String anumber) {
        this.anumber = anumber;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Authority getAuthority() {
        return authority;
    }

    public void setAuthority(Authority authority) {
        this.authority = authority;
    }
}
