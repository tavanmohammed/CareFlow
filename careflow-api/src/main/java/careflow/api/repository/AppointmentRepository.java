package careflow.api.repository;

import careflow.api.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByPhysicianIdAndAppointmentDateAndStatusNot(
            Long physicianId,
            String appointmentDate,
            String status
    );
}