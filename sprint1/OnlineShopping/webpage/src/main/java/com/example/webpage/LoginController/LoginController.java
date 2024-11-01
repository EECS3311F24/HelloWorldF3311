package com.example.webpage.LoginController;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.webpage.User;
import com.example.webpage.Repository.UserRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        // Check if loginRequest has a non-null email and password
        if (loginRequest.getEmail() == null || loginRequest.getUserPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email and password must be provided");
        }

        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Safe check for password matching
            if (loginRequest.getUserPassword().equals(user.getUserPassword())) {
                return ResponseEntity.ok("Login successful");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
}
