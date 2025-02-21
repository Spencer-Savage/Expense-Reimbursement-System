package com.revature.models;

public enum Role {
    EMPLOYEE("employee"),
    MANAGER("manager");

    private final String role;

    Role(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }


}
