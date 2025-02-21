package com.revature.controllers;

import com.revature.dtos.LoginDto;
import com.revature.dtos.OutgoingUserDto;
import com.revature.models.User;
import com.revature.services.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(value= "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<OutgoingUserDto> register(@RequestBody User user){
        OutgoingUserDto outgoingUserDto = authService.register(user);

        return ResponseEntity.ok(outgoingUserDto);
    }

    @GetMapping("/login")
    public ResponseEntity<OutgoingUserDto> login(@RequestBody LoginDto loginDto, HttpSession session){

        OutgoingUserDto outgoingUserDto = authService.login(loginDto);

        if (outgoingUserDto == null){
            throw new IllegalArgumentException("Invalid username or password.");
        }

        session.setAttribute("userId",  outgoingUserDto.getUserId());
        session.setAttribute("username",  outgoingUserDto.getUserId());
        session.setAttribute("firstName",  outgoingUserDto.getUserId());
        session.setAttribute("lastName",  outgoingUserDto.getUserId());
        session.setAttribute("role",  outgoingUserDto.getUserId());


        return ResponseEntity.ok(outgoingUserDto);
    }
}
