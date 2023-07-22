### Basic Info

**Database Used**: PostgreSQL with Sequelize as ORM

## Sign Up

Used to Register a User;
**URL** : `/users`
**Method** : `POST`
**Auth required** : NO
**Data constraints**

```json
{
    "name":"<name of the user>",
    "email":"<email of user>",
    "password":"<password of user>",
    "age":<age of user>
}
```

### Success Response

**Code** : `200 OK`
**Content example**

```json
{
  "name": "Zishan Siddique",
  "email": "zishansiddique8@gmail.com",
  "age": 100
}
```

### Error Response

**Condition** : If email is already registered
**Code** : `400 Bad Request`
**Content** :

```json
{
  "error": "User already registered, please login"
}
```

**Condition** : If any of the required data are missing
**Code** : `400 Bad Request`
**Content** :

```json
{
  "error": "User already registered, please login"
}
```

## Login

Used to collect a Token for a registered User.
**URL** : `/login`
**Method** : `POST`
**Auth required** : NO
**Data constraints**

```json
{
  "email": "[valid email address]",
  "password": "[password in plain text]"
}
```

**Data example**

```json
{
  "email": "sample@example.com",
  "password": "abcd1234"
}
```

### Success Response

**Code** : `200 OK`
**Content example**

```json
{
  "token": "<token string>",
  "email": "sample@gmail.com",
  "name": "Lorem Ipsum"
}
```

### Error Response

**Condition** : If 'username' and 'password' combination is wrong.
**Code** : `401 BAD Unauthorized`
**Content** :

```json
{
  "error": "email or password not found"
}
```

## Getting All Users

Get the details of the currently Authenticated User along with basic
subscription information.
**URL** : `/users`
**Method** : `GET`
**Auth required** : None
**Permissions required** : None

### Success Response

**Code** : `200 OK`
**Content examples**
Lists all the user in the database currently opened just for dev environment

```json
[
  {
    "email": "zishansiddique585@gmail.com",
    "name": "Zishan Siddique",
    "age": null
  },
  {
    "email": "zishansiddique80@gmail.com",
    "name": "Zishan Siddique",
    "age": 20
  }
]
```

## Getting single user

**URL** : `/users/:id`
**Method** : `GET`
**Auth required** : None
**Permissions required** : None

### Success Response

**Code** : `200 OK`
**Content examples**
For a user with given id example: 1

```json
{
  "id": 1,
  "email": "zishansiddique585@gmail.com",
  "name": "Zishan Siddique",
  "age": null
}
```

## For Putting Up Orders

Get the details of the currently Authenticated User along with basic
subscription information.
**URL** : `/orders`
**Method** : `POST`
**Auth required** : Yes
**_token received is sent in the authorization header_**

**Code** : `200 OK`
**Content examples**
an array of following structure is sent as request body

```json
[
  {
    "id": 1,
    "quantity": 2
  },
  {
    "id": 1,
    "quantity": 10
  }
]
```

### Success Response

**Code** : `200 OK`
**Content examples**

```json
{
  "order": {
    "id": 9,
    "userId": 2,
    "orderDate": "2023-07-07T07:18:56.995Z",
    "totalAmount": "120000.00"
  },
  "order_items": [
    {
      "id": 12,
      "orderId": 9,
      "productId": 1,
      "quantity": 2
    },
    {
      "id": 13,
      "orderId": 9,
      "productId": 1,
      "quantity": 10
    }
  ]
}
```

### Error Response

**Condition** : if none of the ordered product are in the database
**Code** : `401 BAD Unauthorized`
**Content** :

```json
{
  "error": "none of the ordered product found"
}
```

## Getting All Products

Get the details of the products currently available
**URL** : `/products`
**Method** : `GET`
**Auth required** : None
**Permissions required** : None

### Success Response

**Code** : `200 OK`
**Content examples**
Lists all the products currently in the database

```json
[
  {
    "name": "Phone",
    "description": "It is a smartphone",
    "price": "10000.00"
  },
  {
    "name": "Keyring",
    "description": "The future of locks",
    "price": "100.00"
  }
]
```

## Getting single product

**URL** : `/products/:id`
**Method** : `GET`
**Auth required** : None
**Permissions required** : None

### Success Response

**Code** : `200 OK`
**Content examples**
For a product with given id example: 1

```json
{
  "id": 1,
  "name": "Phone",
  "description": "It is a smartphone",
  "price": "10000.00"
}
```
