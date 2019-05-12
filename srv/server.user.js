const users = Object.freeze([
    { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' },
    { id: 0, username: "admin", password: "admin", firstName: 'Andrzej', lastName: 'Sikorski' }
]);

// -----------------------------------------------------------------------------

function authenticate(username, password) {
    return users.filter( user => user.username === username && user.password === password );
}

exports.authenticate = function(request, response) {
    const { username, password, ...rest} = request.body
    
    let user = authenticate(username, password);
    
    if(user.legth === 0) {
        response.send([{
            ok: false
        }]);
        
        return false;
    }
    
    user = user[0];
    
    let responseJson = {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
    };
    
    response.send({
        ok: true,
        ...responseJson
    });
}

// -----------------------------------------------------------------------------

exports.getUsers = function(request, response) {
    const btoaValue = Buffer.from('test:test').toString('base64');
    
    if(request.headers && request.headers.authorization === `Basic ${btoaValue}`) {
        response.send({
            ok: true,
            users: [...users]
        });
        
        return true;
    }
    
    // response.send(401, 'Invalid token...');
    response.status(401).send('Invalid token...');
    // response.send({
    //     ok: false,
    //     status: 401,
    //     text: ''
    // });
    
    
    return false;
} 