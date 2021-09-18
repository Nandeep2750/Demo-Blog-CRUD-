### Technology - backend : Node (Express JS)
### DB : mysql
### Technology - frontend : react JS

## Step to run Backend : 
## ===================== 

1) Start MySql server.
2) Make database named "crud_blog".
3) Make sure your username and password of db are same as config.json "development" config
4) Make sure no project run on port 3000 (Because i have set 3000 port for run backend)
5) Run command "npx sequelize-cli db:migrate" in CMD on project path. or you can import shared database.
==> after that run "npx sequelize-cli db:seed:all" for seed database
** Run "npm install" if you are facing any issue...
6) After run migrate and seed database start server using "npm start"
7) if you have imported shared database or you seed data then you don't have to create user using api. you can direct login from front-end
    email : nandeep@gmail.com
    password : abc@123 

## postman collection link :
## =========================
Link : https://www.postman.com/collections/7625870fe155a231b056

## Api list : 
## ========

=> Register as Admin
=> Login Admin

=> Add Blog Post
=> Edit Blog Post
=> List Blog Post
=> get Blog Post by ID
=> Change Blog Post Status (Active / Inactive)
=> Delete Blog Post

## ================================================================

## Step to run frontend

1) Run backend first follow backend "README.md" first.
2) now run "npm start" for run frontend project.
3) if you have imported shared database or you seed data then you don't have to create user using api. you can direct login from front-end
    email : nandeep@gmail.com
    password : abc@123 