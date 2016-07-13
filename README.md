## Angel 
Angel is not a framework, is a Express 4 Bootstrap Starter. 

### Setting up Single Tenant Application
##### 1. Create Configuration JSON file in folder .config/client/subdomain.json
##### 2. Running migration for new instance subdomain 
   ```
   $ db-migrate --config ./config/client/subdomain.json -e db up
   ```
##### 3. run on your url http://subdomain.etalastic.com

### Migration
#### creating migration
```
$ npm run migrate create added-table-users
```
#### Running Migration
For single tenancy migration
```
$ npm run migrate up
```

For multi tenancy migration 
```
npm run migrate-multi --config ./config/client/domain.json up
```