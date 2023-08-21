![header image](assets/header.jpg)

# ISYS2099 Database Application - Database Project - Group 9

View assesment details [here](assets/Project_ISYS2099.pdf).

---

## Project Structure

TODO: Write this


## Dependencies

TODO: Write this


## Installation

### Database:

#### MySQL:

1. From the project's root directory, connect to your local instance of MySQL as the root user:
   ```bash
   mysql -u<root-username> -p
   ```
2. Execute the setup SQL scripts located in the `database/mysql/` directory in the following order:
   - `source database/mysql/reset.sql`
   - `source database/mysql/init/tables.sql`
   - `source database/mysql/init/business_rules.sql`
   - `source database/mysql/init/users.sql`
   - `source database/mysql/init/mock_data.sql` (Optional - for testing purpose only)

#### MongoDB:

**TODO: Write this**


### Backend API server in `server`:

```bash
cd server
npm clean-install
 ```

### Mall frontend in `client-mall` (for sellers and buyers):

```bash
cd client-mall
npm clean-install
```

### Warehouse dashboard frontend in `client-whadmin` (for warehouse administrators):

```bash
cd client-whadmin
npm clean-install
 ```


## Usage

1. Make sure your local instance of MySQL is running.
2. Make sure your local instance of MongoDB is running.
3. Start API server:
   ```bash
   cd server
   npm run start
   ```
   This will start the API server listening at [http://localhost:3000/](http://localhost:3000/)
4. Start Mall frontend:
   ```bash
   cd client-mall
   npm run dev
   ```
   This will start the Mall frontend at [http://localhost:3001/](http://localhost:3001/)
5. Start Warehouse Dashboard frontend:
   ```bash
   cd client-whadmin
   npm run dev
   ```
   This will start the Warehouse Dashboard frontend at [http://localhost:3002/](http://localhost:3002/)


## Video Demonstration:

Available on [YouTube](upload_and_insert_link_here).


## Contribution

| SID      | Name                 | Score |
|:---------|:---------------------|:-----:|
| s3924826 | Tran Minh Nhat       |   5   |
| s3864188 | Phan Thanh Loi       |   5   |
| s3963207 | Do Le Long An        |   5   |
| s3877562 | Vo Tuong Minh (Mike) |   5   |
