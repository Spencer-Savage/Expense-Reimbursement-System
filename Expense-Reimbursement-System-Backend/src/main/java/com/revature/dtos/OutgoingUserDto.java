package com.revature.dtos;

import com.revature.models.Role;
import com.revature.models.User;
import jakarta.persistence.Column;

public class OutgoingUserDto {
    private int userId;
    private String firstName;
    private String lastName;
    private String username;
    private Role role = Role.EMPLOYEE;

    public OutgoingUserDto() {
    }

    public OutgoingUserDto(User u) {
        this.userId = u.getUserId();
        this.firstName = u.getFirstName();
        this.lastName = u.getLastName();
        this.username = u.getUsername();
        this.role = u.getRole();

    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "OutgoingUserDto{" +
                "userId=" + userId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", username='" + username + '\'' +
                ", role=" + role +
                '}';
    }
}
