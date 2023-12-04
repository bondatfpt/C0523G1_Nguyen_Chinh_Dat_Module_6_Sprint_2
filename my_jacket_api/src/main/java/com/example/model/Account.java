package com.example.model;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
public class Account {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String useName;

    private String password;

    private Date birthday;

    private String email;
    private String phoneNumber;

    private String avatar;

    @Column(columnDefinition = "boolean default false")
    private boolean isDeleted ;

    @Column(columnDefinition = "boolean default false")
    private boolean isActive ;

    @ManyToOne
    @JoinColumn(name = "role_id",referencedColumnName = "id")
    private Role role;

    @ManyToOne
    @JoinColumn(name = "gender_id",referencedColumnName = "id")
    private Gender gender;

    @ManyToOne
    @JoinColumn (name = "location_id",referencedColumnName = "id")
    private Location location;

    public Account() {
    }

    public Account(Integer id, String name, String useName, String password, Date birthday, String email, String phoneNumber, String avatar, boolean isDeleted, boolean isActive, Role role, Gender gender, Location location) {
        this.id = id;
        this.name = name;
        this.useName = useName;
        this.password = password;
        this.birthday = birthday;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.avatar = avatar;
        this.isDeleted = isDeleted;
        this.isActive = isActive;
        this.role = role;
        this.gender = gender;
        this.location = location;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUseName() {
        return useName;
    }

    public void setUseName(String useName) {
        this.useName = useName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
