package com.revature.Expense_Reimbursement_System_Backend.models;

public enum Status {
    PENDING("pending"),
    APPROVED("approved"),
    DENIED("denied");

    private final String status;

    Status(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
