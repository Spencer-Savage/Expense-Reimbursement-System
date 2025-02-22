package com.revature.controllers;

import com.revature.dtos.OutgoingUserDto;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(value= "http://localhost:5173", allowCredentials = "true")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<OutgoingUserDto>> getAllUsers(){

        return ResponseEntity.ok().body(userService.getAllUsers()) ;
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<OutgoingUserDto> deleteUser(@PathVariable int userId){
        return ResponseEntity.ok().body(userService.deleteUser(userId));
    }
}
