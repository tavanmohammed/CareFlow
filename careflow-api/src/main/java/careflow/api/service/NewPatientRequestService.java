package careflow.api.service;

import careflow.api.model.*;
import careflow.api.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewPatientRequestService {

    private final NewPatientRequestRepository requestRepository;
    private final PatientRepository patientRepository;
    private final LocationRepository locationRepository;
    private final PhysicianRepository physicianRepository;

    public NewPatientRequestService(
            NewPatientRequestRepository requestRepository,
            PatientRepository patientRepository,
            LocationRepository locationRepository,
            PhysicianRepository physicianRepository
    ) {
        this.requestRepository = requestRepository;
        this.patientRepository = patientRepository;
        this.locationRepository = locationRepository;
        this.physicianRepository = physicianRepository;
    }

    public List<NewPatientRequest> getAllRequests() {
        return requestRepository.findAll();
    }

    public NewPatientRequest submitRequest(NewPatientRequest request) {
        request.setStatus("PENDING");
        return requestRepository.save(request);
    }

    public Patient approveRequest(Long requestId) {
        NewPatientRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        Patient patient = new Patient();
        patient.setFirstName(request.getFirstName());
        patient.setLastName(request.getLastName());
        patient.setDob(request.getDob());
        patient.setPhone(request.getPhone());
        patient.setEmail(request.getEmail());
        patient.setHasHealthCard(request.isHasHealthCard());
        patient.setHealthCardNumber(request.getHealthCardNumber());

        if (request.getLocationId() != null) {
            Location location = locationRepository.findById(request.getLocationId())
                    .orElseThrow(() -> new RuntimeException("Location not found"));
            patient.setLocation(location);
        }

        if (request.getPhysicianId() != null) {
            Physician physician = physicianRepository.findById(request.getPhysicianId())
                    .orElseThrow(() -> new RuntimeException("Physician not found"));
            patient.setPhysician(physician);
        }

        request.setStatus("APPROVED");
        requestRepository.save(request);

        return patientRepository.save(patient);
    }

    public NewPatientRequest rejectRequest(Long requestId) {
        NewPatientRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus("REJECTED");
        return requestRepository.save(request);
    }
}