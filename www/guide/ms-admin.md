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

### POST /bootstrap

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

```json{2}
{
    "code": "<code from the log>",
    "name": "<administrator name>",
    "username": "<desired username, can be the same as email>",
    "email": "<email of the administrator>",
    "password": "<desired password>"
}
```

**Responses**

| HTTP Status       | Explanation                                                      |
| ----------------- | ---------------------------------------------------------------- |
| 204 (No Content)  | The request and bootstrap processes were executed successfully.  |
| 400 (Bad Request) | Error on the request. Some information provided is not correct.  |
| 409 (Conflict)    | Error on the request. The platform is already bootstrapped.      |

## Applications

### POST /applications

Any user that have administrative permissions over applications, can create a new one. An application is the basic definition of a whole set of:

- schemas and its data
- files
- functions
- schedulers
- etc

The applications does not contain user or groups, that is part of the [domains]('.')

::: tip


:::