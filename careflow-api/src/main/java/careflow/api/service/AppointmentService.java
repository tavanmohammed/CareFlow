package careflow.api.service;

import careflow.api.model.Appointment;
import careflow.api.model.Patient;
import careflow.api.repository.AppointmentRepository;
import careflow.api.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;

    private final List<String> clinicTimeSlots = List.of(
            "8:00 AM",
            "9:00 AM",
            "10:00 AM",
            "11:00 AM",
            "12:00 PM",
            "1:00 PM",
            "2:00 PM",
            "3:00 PM",
            "4:00 PM"
    );

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            PatientRepository patientRepository
    ) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<String> getAvailableSlots(Long physicianId, String date) {
        List<Appointment> bookedAppointments =
                appointmentRepository.findByPhysicianIdAndAppointmentDateAndStatusNot(
                        physicianId,
                        date,
                        "CANCELLED"
                );

        List<String> bookedTimes = bookedAppointments
                .stream()
                .map(Appointment::getAppointmentTime)
                .toList();

        return clinicTimeSlots
                .stream()
                .filter(time -> !bookedTimes.contains(time))
                .toList();
    }

    public Appointment bookAppointment(Long patientId, Appointment appointment) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        appointment.setPatient(patient);

        boolean alreadyBooked = appointmentRepository
                .findByPhysicianIdAndAppointmentDateAndStatusNot(
                        appointment.getPhysician().getId(),
                        appointment.getAppointmentDate(),
                        "CANCELLED"
                )
                .stream()
                .anyMatch(a ->
                        a.getAppointmentTime().equals(
                                appointment.getAppointmentTime()
                        )
                );

        if (alreadyBooked) {
            throw new RuntimeException("This appointment time is already booked.");
        }

        appointment.setStatus("PENDING");

        return appointmentRepository.save(appointment);
    }

    public Appointment cancelAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus("CANCELLED");

        return appointmentRepository.save(appointment);
    }

    public Appointment confirmAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus("CONFIRMED");

        return appointmentRepository.save(appointment);
    }
}