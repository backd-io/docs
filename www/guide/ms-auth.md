

# auth

This microservice performs all the authentication duties for the platform.

::: warning
Before make any operation with this microservice, the platform must be [bootstrapped](./ms_admin.md#post-bootstrap).
:::

## Sessions

### POST /session

This endpoint supports the session creation.

**Request**

To authenticate to the platform you must send your credentials (`domain`, `username` and `password`).

<CodeSwitcher :languages="{json:'json',sh:'sh'}">
<template v-slot:json>
 
```json
{
    "domain": "<domain name>",
    "username": "<your username>",
    "password": "<your password>"
}
```
 
</template>
<template v-slot:sh>
 
```sh
curl -X POST -d '{ 
    "domain": "<domain name>", 
    "username": "<your username>", 
    "password": "<your password>" 
}' https://auth.backd.io/session
```
 
</template>
</CodeSwitcher>



**Responses**

When the credentials are correct this endpoint returns the `session` information:

- `id` must is used to authenticate all the API requests in every service. 
- `expires_at` represents the amount of seconds since January 1, 1970 on UTC time zone (epoch). *To display this information, remember to convert to your current time zone.*

```json
{
    "id": "sample_sample_sample_sample_sample",
    "expires_at" :1573830453
}
```

| HTTP Status       | Explanation                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| 201 (Created)     | The request was successful. Authentication successful.                      |
| 400 (Bad Request) | Error on the request. Some information provided is not correct.             |
| 409 (Conflict)    | Error on the request. The platform is already bootstrapped.                 |


### GET /session 

Retrieves information of the current session. This information is limited to the session `id` and `expires_at`, that can be useful to ensure when to extend a session (if the configuration allows it).

**Request**

<CodeSwitcher :languages="{json:'json',sh:'sh'}">
<template v-slot:json>
 
```json
no data to send
```
 
</template>
<template v-slot:sh>
 
```sh
curl -H 'X-Session-Id: sample_sample_sample_sample_sample' \
    https://auth.backd.io/session
```
 
</template>
</CodeSwitcher>

**Responses**

If the session is valid, this endpoint returns its information:
- `Session ID` must is used to authenticate all the API requests in every service. 
- `Session expiration` represents the amount of seconds since January 1, 1970 on UTC time zone. To display this information, remember to convert to your current time zone.

```json
{
    "id": "sample_sample_sample_sample_sample",
    "expires_at" :1573830453
}
```

| HTTP Status          | Explanation                                                           |
| -------------------- | --------------------------------------------------------------------- |
| 201 (Created)        | The request was successful.                                           |
| 401 (Not Authorized) | The token is not valid or expired, so there is no session anymore.    |

### DELETE /session 

Logs out this session.

**Request**

<CodeSwitcher :languages="{json:'json',sh:'sh'}">
<template v-slot:json>
 
```json
no data to send
```
 
</template>
<template v-slot:sh>
 
```sh
curl X DELETE -H 'X-Session-Id: sample_sample_sample_sample_sample' \
    https://auth.backd.io/session
```
 
</template>
</CodeSwitcher>

**Responses**

If the session is valid, it gets deleted.

| HTTP Status          | Explanation                        |
| -------------------- | ---------------------------------- |
| 204 (No Content)     | The request was successful.        |
| 401 (Not Authorized) | The token is not valid or expired. |

## Current User

### GET /me 

Retrieves the information of the user identified by current session.

**Request**

<CodeSwitcher :languages="{json:'json',sh:'sh'}">
<template v-slot:json>
 
```json
no data to send
```
 
</template>
<template v-slot:sh>
 
```sh
curl -H 'X-Session-Id: sample_sample_sample_sample_sample' \
    https://auth.backd.io/me
```
 
</template>
</CodeSwitcher>

**Responses**

If the session is valid, this endpoint returns the information of the user.

```json
{
    "_id": "bn77oavbudgnsm86us8g",
    "_created_at": 1573813291,
    "_updated_at": 1573813291,
    "username": "john.doe",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "active": true,
    "validated": true}
}
```

| HTTP Status          | Explanation                                                           |
| -------------------- | --------------------------------------------------------------------- |
| 200 (OK)             | The request was successful.                                           |
| 401 (Not Authorized) | The token is not valid or expired.                                    |