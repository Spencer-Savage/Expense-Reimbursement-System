package com.revature.services;

import com.revature.daos.ReimbursementDao;
import com.revature.daos.UserDao;
import com.revature.dtos.OutgoingUserDto;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserDao userDao;
    private final ReimbursementDao reimDao;

    @Autowired
    public UserService(UserDao userDao, ReimbursementDao reimDao) {
        this.userDao = userDao;
        this.reimDao = reimDao;
    }


    public List<OutgoingUserDto> getAllUsers() {
        List<User> userList = userDao.findAllByOrderByFirstName().orElse(null);
        if(userList == null){
           userList = new ArrayList<>();
        }
        return userList.stream().map(OutgoingUserDto::new).toList();
    }

    @Transactional
    public OutgoingUserDto deleteUser(int userId) {
         User user = userDao.findById(userId).orElse(null);
        if(user == null){
            throw new IllegalArgumentException("User id not found.");
        }

        List<Reimbursement> reimList = reimDao.findByUser_UserId(userId);
        if(!reimList.isEmpty()){
            reimList.forEach(reimDao::delete);
        }

        userDao.delete(user);
        return new OutgoingUserDto(user);
    }
}
