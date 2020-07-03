# E-Commerce-node
An E-commerce node api created using Node.js, Express.js and MongoDB. The API uses promises extensively to query the MongoDB database.
# Ecommerce-node
An E-commerce node api created using Node.js, Express.js and MongoDB.
The API uses promises extensively to query the MongoDB database.

# Setup
After cloning, use "npm install" and serve the app using "node server".

# To Run
After installing node packages use "npm start" to start the server. Open postman.

# To create new user
Request type:Post
IP:http://api/users/signupnewuser
{
name:xxxx,
age:yy,
gender:male/female,
address:{
street:xxx,
city:xxx,
pincode:123445,
landmark:yyyy
},
mobilenumber:1234456789,
email:example@gmail.com,
password:12345667
}

# To loginuser
Request type:Post
IP:http://api/users/login
{
email:exaple@gmail.com,
password:12345667
}
