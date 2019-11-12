---
weight: 1
bookFlatSection: true
title: "documentation"
---

# documentation

__Backd__ is a microservices backend that helps you focus on your application, that it's already too much work.


{{< hint "warning" >}}
**Work in progress**  
API's are still a 'Lorem Ipsum'
{{< /hint >}}

__Features:__

* __Data object storage__. Store and manage your data by using dacha schemas with validations. You can also store schema-less data if you prefer client side only validations.

* __File storage__. Simplify file storage and its access.

* __Relations between data__. Set the required relations between data as a simple graph.

* __User authentication and authorization__. For each application use the required authentication domains. Currently:

  * __backd__. User and groups are managed by *backd* itself.

  * __active directory__. Use your already existing authorization infrastructure and map the user/groups to the role grants you need on your applications.

* __User/Group membership__. Organize your users in groups to ensure a simple access pattern.

* __Roles and accesses__. Organize the permissions to access data by assigning your defined roles.

* __Function endpoints__. Create your own functions using `lua` to ensure all the logic remains on the backend. Simplify complex requests, aggregations, etc with one/less client requests.
