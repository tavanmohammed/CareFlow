package careflow.api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewPatientRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String dob;
    private String phone;
    private String email;

    private String reason;

    private boolean hasHealthCard;
    private String healthCardNumber;

    // pending, approved, rejected
    private String status;
    private Long locationId;
    private Long physicianId;
}