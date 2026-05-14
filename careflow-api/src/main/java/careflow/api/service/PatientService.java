package careflow.api.service;

import careflow.api.model.Patient;
import careflow.api.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Optional<Patient> findByHealthCardNumber(String healthCardNumber) {

        if (healthCardNumber == null || !healthCardNumber.matches("\\d{10}")) {
            throw new RuntimeException("Health card number must be exactly 10 digits.");
        }

        return patientRepository.findByHealthCardNumber(healthCardNumber);
    }
}