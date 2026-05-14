package careflow.api.controller;

import careflow.api.model.AdminLoginRequest;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final String ADMIN_PASSWORD = "admin123";

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody AdminLoginRequest request) {
        Map<String, Object> response = new HashMap<>();

        if (ADMIN_PASSWORD.equals(request.getPassword())) {
            response.put("success", true);
            response.put("message", "Login successful");
        } else {
            response.put("success", false);
            response.put("message", "Invalid password");
        }

        return response;
    }
}