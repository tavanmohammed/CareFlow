package careflow.api.controller;

import careflow.api.model.NewPatientRequest;
import careflow.api.model.Patient;
import careflow.api.service.NewPatientRequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/new-patients")
@CrossOrigin(origins = "http://localhost:5173")
public class NewPatientRequestController {

    private final NewPatientRequestService service;

    public NewPatientRequestController(NewPatientRequestService service) {
        this.service = service;
    }

    @PostMapping("/submit")
    public NewPatientRequest submitRequest(@RequestBody NewPatientRequest request) {
        return service.submitRequest(request);
    }

    @GetMapping
    public List<NewPatientRequest> getAllRequests() {
        return service.getAllRequests();
    }

    @PutMapping("/approve/{requestId}")
    public Patient approveRequest(@PathVariable Long requestId) {
        return service.approveRequest(requestId);
    }

    @PutMapping("/reject/{requestId}")
    public NewPatientRequest rejectRequest(@PathVariable Long requestId) {
        return service.rejectRequest(requestId);
    }
}