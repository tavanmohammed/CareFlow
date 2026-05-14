package careflow.api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String healthCardNumber;

    private String firstName;
    private String lastName;
    private String dob;
    private String phone;
    private String email;

    private boolean hasHealthCard;

    @ManyToOne
    private Physician physician;

    @ManyToOne
    private Location location;
}