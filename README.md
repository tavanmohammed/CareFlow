# CareFlow – Multi-Location Patient Booking System

CareFlow is a full-stack healthcare appointment booking platform that allows patients to book appointments with their family physicians across multiple clinic locations.

This project was built as a technical assessment to demonstrate:

- Product thinking
- Patient booking workflows
- Scheduling logic
- Backend API development
- Database relationships
- Admin operational workflows
- Calendar scheduling management

The platform supports both existing patients and new patients while allowing clinic administrators to manage appointments, approvals, and schedules.

---

# Problem Being Solved

Many clinics still rely on manual booking systems, phone calls, and front-desk scheduling.

This creates problems such as:

- Long wait times for patients
- Manual scheduling errors
- Double bookings
- Difficulty managing multiple clinic locations
- Lack of visibility into physician schedules
- Slow onboarding for new patients

CareFlow solves this by digitizing the booking process.

---

# Core User Flows

---

## 1. Existing Patient Booking Flow

Existing patients can quickly book appointments using their health card number.

### Flow:
1. Patient enters health card number
2. System searches database
3. If patient exists:
   - Patient profile loads
   - Assigned physician loads
   - Assigned clinic location loads
4. Patient selects:
   - Appointment date
   - Available appointment time
   - Reason for visit
5. Patient submits booking request
6. Request appears in admin dashboard
7. Admin confirms or cancels appointment

---

## 2. New Patient Registration Flow

If the patient is not found:

- They can register as a new patient

### Flow:
1. Enter personal information
2. Enter DOB
3. Enter contact information
4. Choose preferred clinic location
5. Choose physician gender preference
6. Select appointment reason
7. Submit request

The request goes to admin for review.

Admin can:

- Approve request
- Reject request
- Register patient into database

---

## 3. No Health Card Flow

Patients without health insurance can still request appointments.

Flow includes:

- Patient selects no health card option
- They submit request
- Admin receives request
- Can approve manually

---

# Admin Dashboard Features

The admin dashboard allows clinics to manage scheduling operations.

---

## Appointment Management

Admins can:

- View all appointments
- View patient details
- View physician details
- View appointment reasons
- Confirm appointments
- Cancel appointments

---

## New Patient Management

Admins can:

- View all new patient requests
- Approves new patients
- Reject requests
- Register approved patients into the system

---

## Scheduling Dashboard Metrics

Dashboard shows:

- Pending appointments
- Confirmed appointments
- Approved requests
- Cancelled appointments
- Open slots for today
- Open slots for tomorrow

---

## Physician Schedule View

Admin can see:

- Physician assigned
- Patient assigned
- Appointment date
- Appointment time
- Booking status

---

## Calendar Scheduling

Admin dashboard includes:

- Monthly calendar
- Weekly calendar
- Daily calendar
- View upcoming bookings
- Navigate:
  - Next
  - Back
  - Today

Built using:

- React Big Calendar

---

# Double Booking Prevention

A major feature implemented:

Patients cannot book already reserved appointment slots.

Example:

If Dr. Sarah Ahmed already has:

- May 15 → 10:00 AM booked

Another patient cannot reserve:

- May 15 → 10:00 AM

This is validated in backend scheduling logic.

---

# Clinic Time Scheduling Logic

Each physician has available slots from:

- 8:00 AM
- 9:00 AM
- 10:00 AM
- 11:00 AM
- 12:00 PM
- 1:00 PM
- 2:00 PM
- 3:00 PM
- 4:00 PM

System dynamically removes booked times.

---

# Multi-Location Support

Patients can be assigned to:

- Downtown Clinic
- Additional clinic locations

Architecture supports scaling to multiple clinics.

---

# Authentication

Basic admin login was implemented.

Admin can log in to access:

- Dashboard
- Scheduling
- Patient approvals

(Current implementation uses simple login logic for demo purposes.)

---

# Frontend Tech Stack

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- React Big Calendar
- Date-fns

---

# Backend Tech Stack

- Java
- Spring Boot
- Spring Data JPA
- REST APIs
- Maven

---

# Database

- MySQL

---

# Database Entities

---

## Patient

Stores:

- First name
- Last name
- DOB
- Health card
- Email
- Phone
- Assigned physician
- Assigned location

---

## Physician

Stores:

- First name
- Last name
- Specialization
- Gender
- Assigned location

---

## Location

Stores:

- Clinic name
- Clinic address

---

## Appointment

Stores:

- Appointment date
- Appointment time
- Reason
- Status

Statuses:

- Pending
- Confirmed
- Cancelled

---

## NewPatientRequest

Stores:

- Personal details
- Contact info
- Health card info
- Preferred physician gender
- Request status

Statuses:

- Pending
- Approved
- Rejected
- 
<img width="1904" height="897" alt="Screenshot 2026-05-14 000441" src="https://github.com/user-attachments/assets/62142397-f5f7-4c1b-b018-58382108e640" />
<img width="1771" height="918" alt="Screenshot 2026-05-14 000659" src="https://github.com/user-attachments/assets/2477ef66-7f39-4d6c-b2d9-beca49e0c473" />
<img width="1663" height="894" alt="Screenshot 2026-05-14 000722" src="https://github.com/user-attachments/assets/1c996c09-3bf1-4a9e-b5ef-29dee22980fa" />
<img width="1652" height="859" alt="Screenshot 2026-05-14 000430" src="https://github.com/user-attachments/assets/a4189b09-1897-42d7-8c9e-9e00f5cc298c" />
<img width="1893" height="883" alt="Screenshot 2026-05-14 000358" src="https://github.com/user-attachments/assets/6b350c68-7793-42f1-b81d-8f1e95c9eef4" />
<img width="1871" height="882" alt="Screenshot 2026-05-14 000406" src="https://github.com/user-attachments/assets/8e95a65b-ab94-4b1e-bbdf-8aaf250d87cc" />
<img width="1771" height="918" alt="Screenshot 2026-05-14 000659" src="https://github.com/user-attachments/assets/0b0dd684-310f-42ab-b7ec-20c5fef6871c" />







---

# Project Structure

```bash
careflow/
│
├── frontend/
│   └── frontend/
│       ├── src/
│       ├── components/
│       ├── pages/
│
└── careflow-api/
    ├── controllers/
    ├── services/
    ├── repositories/
    ├── models/





