package com.revature.dtos;

public class IncomingReimbursementUpdateDto {
    private String status;
    private int reimbursementId;

    public IncomingReimbursementUpdateDto() {
    }

    public IncomingReimbursementUpdateDto(String status, int reimbursementId) {
        this.status = status;
        this.reimbursementId = reimbursementId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getReimbursementId() {
        return reimbursementId;
    }

    public void setReimbursementId(int reimbursementId) {
        this.reimbursementId = reimbursementId;
    }
}
