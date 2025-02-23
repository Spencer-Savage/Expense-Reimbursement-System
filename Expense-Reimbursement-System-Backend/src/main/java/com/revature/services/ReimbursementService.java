package com.revature.services;

import com.revature.daos.ReimbursementDao;
import com.revature.daos.UserDao;
import com.revature.dtos.IncomingReimbursementDto;
import com.revature.dtos.IncomingReimbursementUpdateDto;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {
    private final ReimbursementDao reimDao;
    private final UserDao userDao;

    @Autowired
    public ReimbursementService(ReimbursementDao dao, UserDao userDao) {
        this.reimDao = dao;
        this.userDao = userDao;
    }

    @Transactional
    public Reimbursement insertReimbursement(IncomingReimbursementDto reimbursementDto){
        // Validate input
        if (reimbursementDto.getUserId() < 0) {
            throw new IllegalArgumentException("User id is required");
        }

        if (reimbursementDto.getAmount() < 0) {
            throw new IllegalArgumentException("Reimbursement amount must be greater than 0.");
        }

        if (reimbursementDto.getDescription() == null || reimbursementDto.getDescription().isBlank()) {
            throw new IllegalArgumentException("Description must not be blank.");
        }

        // Fetch associated user entity
        Optional<User> userOpt = userDao.findById(reimbursementDto.getUserId());
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("User does not exist");
        }

        User user = userOpt.get();

        // Use the managed user entity to create a reimbursement
        Reimbursement reimToInsert = new Reimbursement(
                0,
                reimbursementDto.getDescription(),
                reimbursementDto.getAmount(),
                "PENDING",
                null);

        reimToInsert.setUser(user);

        Reimbursement insertedReimbursement = reimDao.save(reimToInsert);

        return insertedReimbursement;

    }


    public List<Reimbursement> getReimbursementsByUseId(int userId){
        User user = userDao.findById(userId).orElse(null);
        if (user == null){
            throw new IllegalArgumentException("Invalid User Id.");
        }

        return reimDao.findByUser_UserIdOrderByReimbIdAsc(userId);
    }

    public List<Reimbursement> getAllReimbursements() {
        return reimDao.findAllByOrderByReimbIdAsc();
    }

    public Reimbursement updateReimbursementStatus(IncomingReimbursementUpdateDto updateDto){
        Reimbursement reimbursement = reimDao.findById(updateDto.getReimbursementId()).orElse(null);
        if(reimbursement == null){
            throw new IllegalArgumentException("Invalid Reimbursement Id");
        }

        ArrayList<String> validStatus = new ArrayList<>(Arrays.asList("PENDING", "APPROVED", "DENIED"));
        if (!validStatus.contains(updateDto.getStatus())){
            throw new IllegalArgumentException("Invalid Status Provided");
        }

        reimbursement.setStatus(updateDto.getStatus());

        return reimDao.save(reimbursement);
    }
}
