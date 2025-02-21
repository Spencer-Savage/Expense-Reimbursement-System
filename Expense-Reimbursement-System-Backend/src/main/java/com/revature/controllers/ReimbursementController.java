package com.revature.controllers;

import com.revature.dtos.IncomingReimbursementDto;
import com.revature.dtos.IncomingReimbursementUpdateDto;
import com.revature.models.Reimbursement;
import com.revature.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reimbursements")
@CrossOrigin(value= "http://localhost:5173", allowCredentials = "true")
public class ReimbursementController {
    private final ReimbursementService reimService;

    @Autowired
    public ReimbursementController(ReimbursementService reimService) {
        this.reimService = reimService;
    }

    @PostMapping()
    public ResponseEntity<Reimbursement> post(@RequestBody IncomingReimbursementDto reimDto){

        return ResponseEntity.accepted().body(reimService.insertReimbursement(reimDto));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Reimbursement>> getReimbursementsByUserId(@PathVariable int userId){
        return ResponseEntity.ok().body(reimService.getReimbursementsByUseId((userId)));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Reimbursement>> getAllReimbursements(){
        return ResponseEntity.ok().body(reimService.getAllReimbursements());
    }

    @PatchMapping()
    public ResponseEntity<Reimbursement> updateReimbursementStatus( @RequestBody IncomingReimbursementUpdateDto updateDto){
        return ResponseEntity.ok().body(reimService.updateReimbursementStatus(updateDto));
    }
}
