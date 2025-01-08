import jwt from 'jsonwebtoken';

 export const generateToken = (res, userId) => {
    const token = jwt.sign({_id: userId}, process.env.JWT_SECRET, {expiresIn: '24h'});

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',    // csrf
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });  

return token;

}

