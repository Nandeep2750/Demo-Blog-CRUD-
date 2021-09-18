if (process.env.NODE_ENV == 'development') {
    var environment = 'development'
}else if(process.env.NODE_ENV == 'test') {
    var environment = 'test'
}else if(process.env.NODE_ENV == 'production') {
    var environment = 'production'
}

if (environment =='development') {
    
    // ---- Base URLS ----
    var HOST_NAME = 'localhost';
    var PORT = 3000;
    
} else if (environment =='test') {

    // ---- Base URLS ----
    var HOST_NAME = '0.0.0.0';
    var PORT = 3000;

} else if (environment == 'production') {

    // ---- Base URLS ----
    var HOST_NAME = '0.0.0.0';
    var PORT = 3000;
}


module.exports ={

    // ---- JWT ----
    JWT_ENCRYPTION_KEY : "Blog.Crud.Secret",

    // ---- Base URLS ----
    HOST_NAME : HOST_NAME,
    PORT : PORT,

} 