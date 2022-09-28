# donation-app-backend

API Endpoint: https://donation-app-backend.cyclic.app/

## Auth

### Signup

---

Endpoint: `/auth/signup`

> https://donation-app-backend.cyclic.app/api/auth/signup

Method: `POST`

Datapoints:

| Property   | Type   | Required | Unique | Description                      |
| ---------- | ------ | -------- | ------ | -------------------------------- |
| firstName  | String | required |
| lastName   | String |
| email      | String | required | unique |
| phoneNo    | String |
| address    | String |
| profilePic | String |
| gender     | String | required |        | ['male', 'female', 'other']      |
| language   | String | required |        | ['english', 'hindi', 'gujarati'] |
| password   | String |

### Login

---

Endpoint: `/auth/login`

> https://donation-app-backend.cyclic.app/api/auth/login

Method: `POST`

Datapoints:

| Property | Type   | Required |
| -------- | ------ | -------- |
| email    | String | required |
| password | String | required |

### Reset Password Request

---

Endpoint: `/auth/forgot-password`

> https://donation-app-backend.cyclic.app/api/auth/forgot-password

Method: `POST`

Datapoints:

| Property | Type   | Required |
| -------- | ------ | -------- |
| email    | String | required |

### Reset Password

---

Endpoint: `/auth/reset-password`

> https://donation-app-backend.cyclic.app/api/auth/reset-password

Method: `POST`

Datapoints:

| Property | Type   | Required |
| -------- | ------ | -------- |
| password | String | required |
| token    | String | required |

## Donation

### Create Donation Post

---

### Edit Donation Post

---

### View All Donation Post

---

### View Single Donation Post

---

### Delete Donation Post

---

## Request

### Create Request Post

---

### Edit Request Post

---

### View All Request Post

---

### View Single Request Post

---

### Delete Request Post

---
