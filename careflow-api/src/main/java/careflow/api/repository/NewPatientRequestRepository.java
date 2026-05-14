package careflow.api.repository;

import careflow.api.model.NewPatientRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewPatientRequestRepository extends JpaRepository<NewPatientRequest, Long> {
}

