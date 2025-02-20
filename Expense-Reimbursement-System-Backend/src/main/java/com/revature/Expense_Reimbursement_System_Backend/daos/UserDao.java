package com.revature.Expense_Reimbursement_System_Backend.daos;

import com.revature.Expense_Reimbursement_System_Backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Integer> {
}
