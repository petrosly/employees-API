# employees-API
 This is an API that uses CRUD actions to manipulate employee data for a fake company. The server is connected with a MongoDB that stores all the users.
 The actions provided are: generateUsers, createUser, findUsers, findUserById, deleteUserById, deleteDepartment, updateUser.
 
 generateUsers: the API restores the database no matter what have happened before,
 createUser: given the proper values the API creates a new user in the database,
 findUsers: the API returns all the users that exist in the database,
 findUserById: the API given a proper MongoDB id returns a specific user, if he/she exists,
 deleteUserById: the API given a proper MongoDB id deletes a specific user,
 deleteDepartment: the API given a department name deletes every user within that department,
 updateUser: the API give a proper MongoDB id finds the specific user and updates him/her with the inforamtion provided inside the body of the request.
 
 
 All of the above actions come with proper responses on every occasion.
 
 The API urls and methods are below:
 
 generateUsers GET: /api/generate,
 createUser POST: /api/employees,
 findUsers GET: /api/employees,
 findUserById GET: /api/employees/:id,
 deleteUserById DELETE: /api/employees/:id,
 deleteDepartment DELETE: /api/department/:department,
 upadteUser PUT: /api/employees/:id
 
 The server also responds on any other ulr with a reject message!
