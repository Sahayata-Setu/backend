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
