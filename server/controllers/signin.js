const signinHandler = (req, res, db, bcrypt, jwt) => {
    const {email, password} = req.body;
    
    db.select('*').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        
        //*TODO insert into users table the right id from login table             
        if (isValid) {
            const token = jwt.sign(
                {email: data[0].email, id: data[0].id}, 
                'cheese', 
                {expiresIn:"1h"}
            );
            
            return db.select('*').from('users')
            .where('email', '=', email)
                .then(user => res.json({
                    message: "Auth successful", 
                    token: token
                }))
                .then(console.log(email, token))
                .catch(err => res.status(400).json('unable to get user'));
        } else {
            res.status(400).json('wrong credentials');
        }
    })
    .catch(err => res.status(400).json('wrong credentials'));
};

module.exports = {
    signinHandler: signinHandler
};