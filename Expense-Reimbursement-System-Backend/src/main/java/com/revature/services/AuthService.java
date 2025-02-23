package com.revature.services;

import com.revature.daos.UserDao;
import com.revature.dtos.LoginDto;
import com.revature.dtos.OutgoingUserDto;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserDao userDao;

    @Autowired
    public AuthService(UserDao userDao) {
        this.userDao = userDao;
    }

    public OutgoingUserDto register(User user){
        if (user == null){
            throw new IllegalArgumentException("Invalid registration data.");
        }

        if(user.getFirstName() == null || user.getFirstName().isBlank()){
            throw new IllegalArgumentException("First name must be provided.");
        }

        if(user.getLastName() == null || user.getLastName().isBlank()){
            throw new IllegalArgumentException("Last name must be provided.");
        }

        if(user.getUsername() == null || user.getUsername().isBlank()){
            throw new IllegalArgumentException("Username must be provided.");
        }

        if(userDao.findByUsername(user.getUsername()).isPresent()){
            throw new IllegalArgumentException("Please choose a different username.");
        }

        if(user.getPassword() == null || user.getPassword().isBlank()){
            throw new IllegalArgumentException("Password must be provided.");
        }

        return new OutgoingUserDto(userDao.save(user));
    }
    public OutgoingUserDto login(LoginDto loginDto){
        if (loginDto == null){
            throw new IllegalArgumentException("Invalid login data.");
        }

        if (loginDto.getUsername() == null || loginDto.getUsername().isBlank()){
            throw new IllegalArgumentException("Username cannot be empty.");
        }

        if (loginDto.getPassword() == null || loginDto.getPassword().isBlank()){
            throw new IllegalArgumentException("Password cannot be empty.");
        }

        User returnedUser = userDao.findByUsernameAndPassword(
                loginDto.getUsername(), loginDto.getPassword())
                .orElse(null);

        if(returnedUser == null){
            throw new IllegalArgumentException("Invalid username or password.");
        }
        return new OutgoingUserDto(returnedUser);
    }
}
