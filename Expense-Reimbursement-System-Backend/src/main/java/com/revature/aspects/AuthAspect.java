package com.revature.aspects;

import jakarta.servlet.http.HttpSession;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class AuthAspect {
    @Order(1)
    @Before("within(com.revature.controllers.*)" +
            "&& !within(com.revature.controllers.AuthController)")
    public void checkLoggedIn() {

        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (attributes == null) {
            throw new IllegalArgumentException("User must be logged in to do this!");
        }

        HttpSession session = attributes.getRequest().getSession(false); // Do not create a new session

        if (session == null || session.getAttribute("userId") == null) {
            throw new IllegalArgumentException("User must be logged in to do this!");
        }
    }

    @Order(2)
    @Before("@annotation(com.revature.aspects.AdminOnly)")
    public void checkAdmin() {

        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (attributes == null) {
            throw new IllegalArgumentException("User must be logged in to do this!");
        }

        HttpSession session = attributes.getRequest().getSession(false); // Safely retrieve the session without creating a new one

        if (session == null || session.getAttribute("userId") == null) {
            throw new IllegalArgumentException("User must be logged in to do this!");
        }

        Object roleAttribute = session.getAttribute("role");
        if (roleAttribute == null) {
            throw new IllegalArgumentException("User's role information is not present!");
        }

        String role = roleAttribute.toString();

        // If the User's role is not "admin", throw an exception
        if (!"admin".equals(role)) {
            throw new IllegalArgumentException("User must have elevated privileges to do this.");
        }
    }

}
