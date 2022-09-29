# donation-app-backend

Please join the postman workspace to make life easy for you.
Set the environment to `Development`.

I will put the API endpoints and their documentations in this README.
API test data is available in postman.

API Endpoint: `https://donation-app-backend.cyclic.app/api`

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

Endpoint: `/user/donation/create`

> https://donation-app-backend.cyclic.app/api/user/donation/create

Method: `POST`

Datapoints:

| Property      | Type     | Required | Description                         |
| ------------- | -------- | -------- | ----------------------------------- |
| donor_id      | ObjectId | required |
| categories    | String[] | required | ['book', 'cloths', 'book', 'other'] |
| description   | String   | required |
| quantity      | Number   | required |
| pickupDetails | String   | required |
| images        | String[] |          |

### Update Donation Post

---

Endpoint: `/user/donation/:id`

> https://donation-app-backend.cyclic.app/api/user/donation/:id

Method: `PATCH`

Datapoints:

| Property      | Type     | Required | Description                         |
| ------------- | -------- | -------- | ----------------------------------- |
| categories    | String[] |          | ['book', 'cloths', 'book', 'other'] |
| description   | String   |          |
| quantity      | Number   |          |
| pickupDetails | String   |          |
| images        | String[] |          |

### Get All Donation Post

---

Endpoint: `/user/donation/all`

> https://donation-app-backend.cyclic.app/api/user/donation/all

Method: `GET`

### Get Single Donation Post

---

Endpoint: `/user/donation/:id`

> https://donation-app-backend.cyclic.app/api/user/donation/:id

Method: `GET`

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
