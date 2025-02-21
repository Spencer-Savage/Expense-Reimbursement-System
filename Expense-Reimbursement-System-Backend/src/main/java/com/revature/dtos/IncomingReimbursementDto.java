package com.revature.dtos;

import com.revature.models.User;
import java.math.BigDecimal;

public class IncomingReimbursementDto {
    private int userId;
    private String description;
    private int amount;

    public IncomingReimbursementDto() {

    }

    public IncomingReimbursementDto(int userId, String description, int amount) {
        this.userId = userId;
        this.description = description;
        this.amount = amount;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "IncomingReimbursementDto{" +
                "userId=" + userId +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                '}';
    }
}
