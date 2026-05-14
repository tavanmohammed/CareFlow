package careflow.api;

import careflow.api.model.Location;
import careflow.api.model.Physician;
import careflow.api.repository.LocationRepository;
import careflow.api.repository.PhysicianRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final LocationRepository locationRepository;
    private final PhysicianRepository physicianRepository;

    public DataLoader(LocationRepository locationRepository,
                      PhysicianRepository physicianRepository) {
        this.locationRepository = locationRepository;
        this.physicianRepository = physicianRepository;
    }

    @Override
    public void run(String... args) {

        if (locationRepository.count() == 0) {

            Location downtown = new Location();
            downtown.setName("Downtown Clinic");
            downtown.setAddress("123 King Street Toronto");

            Location northYork = new Location();
            northYork.setName("North York Clinic");
            northYork.setAddress("456 Yonge Street Toronto");

            locationRepository.save(downtown);
            locationRepository.save(northYork);

            Physician doctor1 = new Physician();
            doctor1.setFirstName("Sarah");
            doctor1.setLastName("Ahmed");
            doctor1.setGender("Female");
            doctor1.setSpecialization("Family Medicine");
            doctor1.setLocation(downtown);

            Physician doctor2 = new Physician();
            doctor2.setFirstName("Michael");
            doctor2.setLastName("Chen");
            doctor2.setGender("Male");
            doctor2.setSpecialization("Family Medicine");
            doctor2.setLocation(downtown);

            Physician doctor3 = new Physician();
            doctor3.setFirstName("Noor");
            doctor3.setLastName("Ali");
            doctor3.setGender("Female");
            doctor3.setSpecialization("Family Medicine");
            doctor3.setLocation(northYork);

            physicianRepository.save(doctor1);
            physicianRepository.save(doctor2);
            physicianRepository.save(doctor3);
        }
    }
}