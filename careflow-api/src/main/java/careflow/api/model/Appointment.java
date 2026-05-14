package careflow.api.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reason;
    private String appointmentDate;
    private String appointmentTime;

    // pending, confirmed, cancelled
    private String status;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    @JsonIgnoreProperties({"physician", "location"})
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "physician_id")
    @JsonIgnoreProperties({"location"})
    private Physician physician;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;
}