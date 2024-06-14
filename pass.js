app.get('/some_path',checkAuthentication,function(req,res){
    //do something only if user is authenticated
});
function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/login");
    }
}
