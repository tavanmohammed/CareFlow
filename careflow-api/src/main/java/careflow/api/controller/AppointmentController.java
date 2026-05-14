package careflow.api.controller;

import careflow.api.model.Appointment;
import careflow.api.service.AppointmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @PostMapping("/book/{patientId}")
    public Appointment bookAppointment(
            @PathVariable Long patientId,
            @RequestBody Appointment appointment
    ) {
        return appointmentService.bookAppointment(patientId, appointment);
    }

    @PutMapping("/cancel/{appointmentId}")
    public Appointment cancelAppointment(
            @PathVariable Long appointmentId
    ) {
        return appointmentService.cancelAppointment(appointmentId);
    }

    @PutMapping("/confirm/{appointmentId}")
    public Appointment confirmAppointment(
            @PathVariable Long appointmentId
    ) {
        return appointmentService.confirmAppointment(appointmentId);
    }

    @GetMapping("/available")
    public java.util.List<String> getAvailableSlots(
            @RequestParam Long physicianId,
            @RequestParam String date
    ) {
        return appointmentService.getAvailableSlots(
                physicianId,
                date
        );
    }
}