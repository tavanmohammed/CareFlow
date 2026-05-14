package careflow.api.controller;

import careflow.api.model.Physician;
import careflow.api.repository.PhysicianRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/physicians")
@CrossOrigin(origins = "http://localhost:5173")
public class PhysicianController {

    private final PhysicianRepository physicianRepository;

    public PhysicianController(PhysicianRepository physicianRepository) {
        this.physicianRepository = physicianRepository;
    }

    @GetMapping
    public List<Physician> getAllPhysicians() {
        return physicianRepository.findAll();
    }

    @GetMapping("/location/{locationId}")
    public List<Physician> getPhysiciansByLocation(@PathVariable Long locationId) {
        return physicianRepository.findByLocationId(locationId);
    }
}