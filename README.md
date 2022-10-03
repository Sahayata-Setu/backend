# donation-app-backend

Please join the postman workspace to make life easy for you.
Set the environment to `Development`.

I will put the API endpoints and their documentations in this README.
API test data is available in postman.

API Endpoint: `https://donation-app-backend.cyclic.app/api`

## Auth

---

---

Token is signed using user's id (\_id) and role (role).

### Signup

---

Endpoint: `/auth/signup`

> https://donation-app-backend.cyclic.app/api/auth/signup

Method: `POST`

Datapoints:

| Property   | Type   | Required | Unique | Description                                               |
| ---------- | ------ | -------- | ------ | --------------------------------------------------------- |
| firstName  | String | required |
| lastName   | String |
| email      | String | required | unique |
| phoneNo    | String |
| address    | String |
| city       | String |          |        | ['rajkot', 'ahmedabad', 'surat', 'vadodara', 'bhavnagar'] |
| profilePic | String |
| gender     | String | required |        | ['male', 'female', 'other']                               |
| language   | String | required |        | ['english', 'hindi', 'gujarati']                          |
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

| Property      | Type     | Required | Description                                               |
| ------------- | -------- | -------- | --------------------------------------------------------- |
| donor_id      | ObjectId | required |
| categories    | String[] | required | ['book', 'cloths', 'book', 'other']                       |
| description   | String   | required |
| quantity      | Number   | required |
| city          | String   | required | ['rajkot', 'ahmedabad', 'surat', 'vadodara', 'bhavnagar'] |
| pickupDetails | String   | required |
| images        | String[] |          |

### Update Donation Post

---

Endpoint: `/user/donation/:id`

> https://donation-app-backend.cyclic.app/api/user/donation/:id

Method: `PATCH`

Datapoints:

| Property      | Type     | Required | Description                                               |
| ------------- | -------- | -------- | --------------------------------------------------------- |
| categories    | String[] |          | ['book', 'cloths', 'book', 'other']                       |
| description   | String   |          |
| quantity      | Number   |          |
| city          | String   |          | ['rajkot', 'ahmedabad', 'surat', 'vadodara', 'bhavnagar'] |
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

### Get All Donations By User

---

Endpoint: `/user/donation/user/:id`

> https://donation-app-backend.cyclic.app/api/user/donation/user/:id

Method: `GET`

### Get All Donations By City

---

Endpoint: `/user/donation/city/:city`

> https://donation-app-backend.cyclic.app/api/user/donation/city/:city

Method: `GET`

### Delete Donation Post

---

Endpoint: `/user/donation/:id`

> https://donation-app-backend.cyclic.app/api/user/donation/:id

Method: `DELETE`

## Request

### Create Request Post

---

Endpoint: `/user/request/create`

> https://donation-app-backend.cyclic.app/api/user/request/create

Method: `POST`

Datapoints:

| Property       | Type     | Required | Description                                               |
| -------------- | -------- | -------- | --------------------------------------------------------- |
| beneficiary_id | ObjectId | required |
| categories     | String[] | required | ['book', 'cloths', 'book', 'other']                       |
| description    | String   | required |
| quantity       | Number   | required |
| city           | String   | required | ['rajkot', 'ahmedabad', 'surat', 'vadodara', 'bhavnagar'] |
| pickupDetails  | String   | required |
| images         | String[] |          |

### Update Request Post

---

Endpoint: `/user/request/:id`

> https://donation-app-backend.cyclic.app/api/user/request/:id

Method: `PATCH`

Datapoints:

| Property      | Type     | Required | Description                                               |
| ------------- | -------- | -------- | --------------------------------------------------------- |
| categories    | String[] |          | ['book', 'cloths', 'book', 'other']                       |
| description   | String   |          |
| quantity      | Number   |          |
| city          | String   |          | ['rajkot', 'ahmedabad', 'surat', 'vadodara', 'bhavnagar'] |
| pickupDetails | String   |          |
| images        | String[] |          |

### View All Request Post

---

Endpoint: `/user/request/all`

> https://donation-app-backend.cyclic.app/api/user/request/all

Method: `GET`

### View Single Request Post

---

Endpoint: `/user/request/:id`

> https://donation-app-backend.cyclic.app/api/user/request/:id

Method: `GET`

### Delete Request Post

---

Endpoint: `/user/request/:id`

> https://donation-app-backend.cyclic.app/api/user/request/:id

Method: `DELETE`
