![Alt text](http://cdn.javabeat.net/wp-content/uploads/2015/09/expressjs.jpg)
## This Application is my Starter for using nodejs with express js framework

This starter created not only for solving right structure for single application but also for solving the multitenancy problem.


These structures application are typically two solutions for solving the multitenancy problem : 

1. Isolated Approach: Separate Databases. Each tenant has it’s own database (it separated within each subdomain).

2. Shared Approach: Shared Database, Shared Schema. All tenants share the same database and schema. There is a main tenant-table, where all other tables have a foreign key pointing to.


#### Tools
* Gulp 
* db-migrate
* Caminte
* Mocha







