package careflow.api.repository;

import careflow.api.model.Physician;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhysicianRepository extends JpaRepository<Physician, Long> {
    List<Physician> findByLocationId(Long locationId);
}