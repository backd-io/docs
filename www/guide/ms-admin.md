# admin

This microservice performs all administration of the objects on the platform: 

- applications
    - object schemas
    - permissions
- domains
    - users
    - groups
    - memberships

::: tip
Because of the operations that can be done with this service probably you won't want to expose it to the internet and keep all the operations private. 

This service is only used by administrators so you can opt to stop it while not required.
:::

## Bootstrap

### POST /bootstrap <badge>bootstrap token</badge>

As soon as you first deploy `backd`, the microservices need to create the database tables that manage the core information of the platform. This process must start by calling the `admin` service with the requirements stated below. This task can be accomplished using the (TODO: link to backd bootstrap) _cli_ for your commodity.

When the service starts, it looks into the database for the required tables. If tables are missing, it will keep waiting for its initialization. 

Access to the logs of the `admin` service is a requirement to start the bootstrapping process. The service writes the initialization code in a log with the message `server not bootstrapped` and the code. The log with the code looks as follows:

```json{5}
    {
        "level": "info",
        "ts": "2019-11-14T07:43:28.258+0100",
        "msg": "server not bootstrapped",
        "code": "8fwq620gkb1gy31094u1ukgs7q542y4k"
    }
```

The bootstrap process will create the required tables on the database, along with the `backd` application and domain.

**Request**

The request contains both the information about the code for bootstrap and administrator user for the first user creation. This user will become a **global administrator** of the platform. 

<CodeSwitcher :languages="{json:'json',sh:'sh'}">
<template v-slot:json>
 
```json{2}
{
    "code": "<code from the log>",
    "name": "<administrator name>",
    "username": "<desired username, can be the same as email>",
    "email": "<email of the administrator>",
    "password": "<desired password>"
}
```
 
</template>
<template v-slot:sh>
 
```sh{2}
curl -H '{
    "code": "<code from the log>",
    "name": "<administrator name>",
    "username": "<desired username, can be the same as email>",
    "email": "<email of the administrator>",
    "password": "<desired password>"
}' https://admin.backd.io/bootstrap
```
 
</template>
</CodeSwitcher>


**Responses**

| HTTP Status       | Explanation                                                      |
| ----------------- | ---------------------------------------------------------------- |
| 204 (No Content)  | The request and bootstrap processes were executed successfully.  |
| 400 (Bad Request) | Error on the request. Some information provided is not correct.  |
| 409 (Conflict)    | Error on the request. The platform is already bootstrapped.      |

## Domains

A domain is a set of users that access to the applications and its objects. Users can belong to groups to help permission organization.

### POST /domains <badge>write:*</badge>

Any user that have administrative permissions over the `domains` collection, can create new ones. 

::: tip
A domain can be used for many applications if we want to have different data sets for each of them. Also, an application can have multiple authentication domains if needed.
:::

**Request**

These are the fields for the `domain` object and its validation rules:

- `_id`: Application name, it will be used to identify the application on the API requests, being part of the URI itself. Rules: 
    - Regular expression: `^[a-z0-9]{2,20}$`
    - Only lower characters and numbers allowed.
    - Minimun 2, maximun 20 characters long.
- `description`: Something useful for you to identify the application. Rules:
    - This is an optional field.
    - Maximum 254 characters long.
- `type`: Defines who is in charge for the authentication duties. Currently these types are allowed:
    - `b`: `backd` is in charge of the authentication duties.
    - `ad`: Active Directory will be used for authentication. Users and groups are managed by Active Directory. Any request to the domain users and groups will fail with HTTP status code `409 Conflict`.
- `session_expiration`: Amount of time (in seconds) a single user will be able to make actions on the APIs on the same session. Sessions are created after a succesfull log in.  

**Sample:**

<CodeSwitcher :languages="{json:'json',sh:'sh'}">
<template v-slot:json>
 
```json{2}
{ 
    "_id": "<domain name>", 
    "description": "<description>",
    "type": "b",
    "session_expiration": 3600
}
```
 
</template>
<template v-slot:sh>
 
```sh{2}
curl -H 'X-Session-Id: aS30Hc1n7pzsgQEatuERRAw84fr23RRdKnjQGcIIqZQ' 
-d '{ 
    "_id": "<domain name>", 
    "description": "<description>",
    "type": "b",
    "session_expiration": 3600
}' https://admin.backd.io/domains
```
 
</template>
</CodeSwitcher>


**Responses**

```json
{ 
    "_id": "<domain name>", 
    "description": "<description>",
    "type": "b",
    "session_expiration": 3600
}
```

| HTTP Status       | Explanation                                                      |
| ----------------- | ---------------------------------------------------------------- |
| 201 (Created)     | The domain was created successfully.                             |
| 400 (Bad Request) | Error on the request. Some information provided is not correct.  |
| 401 (Unautorized) | Error on the request. Token invalid or expired.                  |

### GET /domains <badge>read:*</badge> <badge>read:domain_id</badge>

You can get information about all the domains you have permissions to `read`. 

You can use [query language](.) to query domains.

**Request**

<CodeSwitcher :languages="{json:'json',sh:'sh'}">
<template v-slot:json>
 
```json
no data to send
```
 
</template>
<template v-slot:sh>
 
```sh
curl -H 'X-Session-Id: aS30Hc1n7pzsgQEatuERRAw84fr23RRdKnjQGcIIqZQ' 
    https://admin.backd.io/domains
```
 
</template>
</CodeSwitcher>

**Responses**

```json
[
    { 
        "_id": "<domain name>", 
        "description": "<description>",
        "type": "b",
        "session_expiration": 3600
    },
    { 
        "_id": "<domain name2>", 
        "description": "<description2>",
        "type": "b",
        "session_expiration": 3600
    }
]
```

| HTTP Status       | Explanation                                                      |
| ----------------- | ---------------------------------------------------------------- |
| 200 (Ok)          | The request was executed successfully.                           |
| 400 (Bad Request) | Error on the request. Some information provided is not correct.  |
| 401 (Unautorized) | Error on the request. Token invalid or expired.                  |


### GET /domains/:domain_id <badge>read:*</badge> <badge>read:domain_id</badge>

You can get information about one domain if you have permissions to `read` the object.

**Request**

<CodeSwitcher :languages="{json:'json',sh:'sh'}">
<template v-slot:json>
 
```json
no data to send
```
 
</template>
<template v-slot:sh>
 
```sh
curl -H 'X-Session-Id: aS30Hc1n7pzsgQEatuERRAw84fr23RRdKnjQGcIIqZQ' 
    https://admin.backd.io/domains/someid
```
 
</template>
</CodeSwitcher>

**Responses**

```json 
{ 
    "_id": "<domain name>", 
    "description": "<description>",
    "type": "b",
    "session_expiration": 3600
}
```

| HTTP Status       | Explanation                                                      |
| ----------------- | ---------------------------------------------------------------- |
| 200 (Ok)          | The request was executed successfully.                           |
| 404 (Not found)   | Error on the request. ID not found.                              |
| 401 (Unautorized) | Error on the request. Token invalid or expired.                  |

### PUT /domains/:domain_id <badge>write:*</badge> <badge>write:domain_id</badge>

Updates a domain object. 

**Request**

<CodeSwitcher :languages="{json:'json',sh:'sh'}">
<template v-slot:json>
 
```json{2}
{ 
    "description": "<new description>" 
}
```
 
</template>
<template v-slot:sh>
 
```sh{2}
curl -X PUT -H 'X-Session-Id: aS30Hc1n7pzsgQEatuERRAw84fr23RRdKnjQGcIIqZQ' 
-d '{
    "description": "<description>",
    "type": "b",
    "session_expiration": 3600
}' https://admin.backd.io/domains/name
```
 
</template>
</CodeSwitcher>


**Responses**

```json
empty response
```

| HTTP Status       | Explanation                                                      |
| ----------------- | ---------------------------------------------------------------- |
| 204 (No Content)  | The domain was updated successfully.                             |
| 400 (Bad Request) | Error on the request. Some information provided is not correct.  |
| 401 (Unautorized) | Error on the request. Token invalid or expired.                  |
| 409 (Conflict)    | Error on the request. The information conficts with expected.    |


### DELETE /domains/:domain_id <badge>admin:*</badge> <badge>admin:domain_id</badge>

Deletes a domain object. 

**Request**

<CodeSwitcher :languages="{json:'json',sh:'sh'}">
<template v-slot:json>
 
```json{2}
no data to send
```
 
</template>
<template v-slot:sh>
 
```sh{2}
curl -X DELETE -H 'X-Session-Id: aS30Hc1n7pzsgQEatuERRAw84fr23RRdKnjQGcIIqZQ' 
    https://admin.backd.io/domain/domainid
```
 
</template>
</CodeSwitcher>


**Responses**

```json
empty response
```

| HTTP Status       | Explanation                                                      |
| ----------------- | ---------------------------------------------------------------- |
| 204 (No Content)  | The domain was delete successfully.                        |
| 401 (Unautorized) | Error on the request. Token invalid or expired.                  |
| 409 (Conflict)    | Error on the request. The information conficts with expected.    |






## Applications

### POST /applications <badge>write:*</badge>

Any user that have administrative permissions over applications, can create a new one. An application is the basic definition of a whole set of:

- schemas and its data
- files
- functions
- tasks
- etc

::: tip
User and groups are part of [domains]('.'). 

An application can have users from multiple authentication domains if needed.
:::

**Request**

The application object is pretty basic. These are the fields and validation rules:

- `_id`: Application name, it will be used to identify the application on the API requests, being part of the URI itself. Rules: 
    - Regular expression: `^[a-z0-9]{2,20}$`
    - Only lower characters and numbers allowed.
    - Minimun 2, maximun 20 characters long.
- `description`: Something useful for you to identify the application. Rules:
    - This is an optional field.
    - Maximum 254 characters long.

<CodeSwitcher :languages="{json:'json',sh:'sh'}">
<template v-slot:json>
 
```json{2}
{ 
    "_id": "<application name>", 
    "description": "<description>" 
}
```
 
</template>
<template v-slot:sh>
 
```sh{2}
curl -H 'X-Session-Id: aS30Hc1n7pzsgQEatuERRAw84fr23RRdKnjQGcIIqZQ' 
-d '
{ 
    "_id": "<application name>", 
    "description": "<description>" 
}' https://admin.backd.io/applications
```
 
</template>
</CodeSwitcher>


**Responses**

```json
{ 
    "_id": "<application name>", 
    "description": "<description>" 
}
```

| HTTP Status       | Explanation                                                      |
| ----------------- | ---------------------------------------------------------------- |
| 201 (Created)     | The application was created successfully.                        |
| 400 (Bad Request) | Error on the request. Some information provided is not correct.  |
| 401 (Unautorized) | Error on the request. Token invalid or expired.                  |


### GET /applications <badge>read:*</badge> <badge>read:application_id</badge>

You can get information about all the applications you have permissions to `read`. 

::: warning
Having the right to see the application definition does not mean you can make anything on its objects. _You must explicitly set collection-level permissions for objects and files._
:::

You can use [query language](.) to query objects.

**Request**

<CodeSwitcher :languages="{json:'json',sh:'sh'}">
<template v-slot:json>
 
```json
no data to send
```
 
</template>
<template v-slot:sh>
 
```sh
curl -H 'X-Session-Id: aS30Hc1n7pzsgQEatuERRAw84fr23RRdKnjQGcIIqZQ' 
    https://admin.backd.io/applications
```
 
</template>
</CodeSwitcher>

**Responses**

```json
[
    { 
        "_id": "<application name>", 
        "description": "<description>" 
    },
    { 
        "_id": "<application name2>", 
        "description": "<description2>" 
    }
]
```

| HTTP Status       | Explanation                                                      |
| ----------------- | ---------------------------------------------------------------- |
| 200 (Ok)          | The request was executed successfully.                           |
| 400 (Bad Request) | Error on the request. Some information provided is not correct.  |
| 401 (Unautorized) | Error on the request. Token invalid or expired.                  |


### GET /applications/:application_id <badge>read:*</badge> <badge>read:application_id</badge>

You can get information about one applications if you have permissions to `read` the object.

::: warning
Having the right to see the application definition does not mean you can make anything on its objects. _You must explicitly set collection-level permissions for objects and files._
:::


**Request**

<CodeSwitcher :languages="{json:'json',sh:'sh'}">
<template v-slot:json>
 
```json
no data to send
```
 
</template>
<template v-slot:sh>
 
```sh
curl -H 'X-Session-Id: aS30Hc1n7pzsgQEatuERRAw84fr23RRdKnjQGcIIqZQ' 
    https://admin.backd.io/applications/someid
```
 
</template>
</CodeSwitcher>

**Responses**

```json 
{ 
    "_id": "<application name>", 
    "description": "<description>" 
}
```

| HTTP Status       | Explanation                                                      |
| ----------------- | ---------------------------------------------------------------- |
| 200 (Ok)          | The request was executed successfully.                           |
| 404 (Not found)   | Error on the request. ID not found.                              |
| 401 (Unautorized) | Error on the request. Token invalid or expired.                  |

### PUT /applications/:application_id <badge>write:*</badge> <badge>write:application_id</badge>

Updates an application object. 

**Request**

<CodeSwitcher :languages="{json:'json',sh:'sh'}">
<template v-slot:json>
 
```json{2}
{ 
    "description": "<new description>" 
}
```
 
</template>
<template v-slot:sh>
 
```sh{2}
curl -X PUT -H 'X-Session-Id: aS30Hc1n7pzsgQEatuERRAw84fr23RRdKnjQGcIIqZQ' 
-d '
{ 
    "description": "<new description>" 
}' https://admin.backd.io/applications/applicationname
```
 
</template>
</CodeSwitcher>


**Responses**

```json
{ 
    "_id": "applicationname", 
    "description": "<description>" 
}
```

| HTTP Status       | Explanation                                                      |
| ----------------- | ---------------------------------------------------------------- |
| 204 (No Content)  | The application was updated successfully.                        |
| 400 (Bad Request) | Error on the request. Some information provided is not correct.  |
| 401 (Unautorized) | Error on the request. Token invalid or expired.                  |
| 409 (Conflict)    | Error on the request. The information conficts with expected.    |


### DELETE /applications/:application_id <badge>admin:*</badge> <badge>admin:application_id</badge>

Delete an application object. 

**Request**

<CodeSwitcher :languages="{json:'json',sh:'sh'}">
<template v-slot:json>
 
```json{2}
no data to send
```
 
</template>
<template v-slot:sh>
 
```sh{2}
curl -X DELETE -H 'X-Session-Id: aS30Hc1n7pzsgQEatuERRAw84fr23RRdKnjQGcIIqZQ' 
    https://admin.backd.io/applications/applicationname
```
 
</template>
</CodeSwitcher>


**Responses**

```json
empty response
```

| HTTP Status       | Explanation                                                      |
| ----------------- | ---------------------------------------------------------------- |
| 204 (No Content)  | The application was delete successfully.                        |
| 401 (Unautorized) | Error on the request. Token invalid or expired.                  |
| 409 (Conflict)    | Error on the request. The information conficts with expected.    |
