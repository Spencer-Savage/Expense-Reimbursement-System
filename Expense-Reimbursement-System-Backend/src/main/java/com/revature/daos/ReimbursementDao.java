package com.revature.daos;

import com.revature.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReimbursementDao extends JpaRepository<Reimbursement, Integer> {
    List<Reimbursement>findByUser_UserId(int userId);
    List<Reimbursement>findAllByOrderByReimbIdAsc();
    List<Reimbursement>findByUser_UserIdOrderByReimbIdAsc(int userId);
}
