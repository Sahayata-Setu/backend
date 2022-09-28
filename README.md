# donation-app-backend

API Endpoint: https://donation-app-backend.cyclic.app/

## Auth

### Signup

---

Endpoint:

> https://donation-app-backend.cyclic.app/api/auth/signup

Datapoints:

> firstName: String | required
> lastName: String
> email: String | required | unique
> phoneNo: String
> address: String
> profilePic: String
> gender: String | required | ['male', 'female', 'other']
> language: String | required | ['english', 'hindi', 'gujarati']
> password: String
