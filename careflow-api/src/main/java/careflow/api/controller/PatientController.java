package careflow.api.controller;

import careflow.api.model.Patient;
import careflow.api.service.PatientService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/health-card/{healthCardNumber}")
    public Optional<Patient> getPatientByHealthCard(
            @PathVariable String healthCardNumber
    ) {
        return patientService.findByHealthCardNumber(healthCardNumber);
    }
}