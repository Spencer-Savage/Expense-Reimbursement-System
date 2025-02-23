import { User } from "./User";

export interface Reimbursement{
    "reimbId": number,
        "description": string,
        "amount": number,
        "status": string,
        "user": User
}