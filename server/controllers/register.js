const registerHandler = (req, res, db, bcrypt) => {
    const {email, password} = req.body;
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    console.log(hash);

    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                joined: new Date() 
            })
            .then(user => {
                res.json(user[0]); 
            })
            .catch(err => res.status(400).json('unable to register'));
        })
        .then(trx.commit)
        .catch(trx.rollback)
        // we don't return the err itself because we don't want to 
        // reveal information about out database
    }); 
}

module.exports = {
    registerHandler: registerHandler
};