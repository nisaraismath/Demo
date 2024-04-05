const nodemailer = require('nodemailer');
const User = require('../models/usermodel');
const emailUsername = process.env.EMAIL_USERNAME;
const emailPassword = process.env.EMAIL_PASSWORD;
require('dotenv').config();
const upload = require('./uploadConfig');

const registerUser = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to upload image.' });
        }
    const { name, email, mobileNumber, password } = req.body;
    const image = req.file ? req.file.filename : null;

    // Validation
    if (!name || !email || !mobileNumber || !password || !image) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
        return res.status(400).json({ message: 'Invalid mobile number.' });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: 'Invalid email address.' });
    }
});
}


const verifyEmail = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email, otp });

        if (!user) {
            return res.status(400).json({ message: 'Invalid OTP or email.' });
        }

        res.status(200).json({ message: 'Email verified successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to verify email.' });
    }
};


const isEmailRegistered = async (email) => {
    return await User.exists({ email });
};

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
   const sendVerificationEmail=async(email, otp) =>{
        // const transporter = nodemailer.createTransport({
        //     host: 'smtp.gmail.com',
        //     port:587,
        //     secure:false,
        //     auth: {
        //         user: process.env.EMAIL_USERNAME,
        //         pass: process.env.EMAIL_PASSWORD
        //     },
        //     debug: true 
        // });
    
        const mailOptions = {
            from: 'nisaraismath@gmail.com',
            to: email,
            subject: 'Email Verification',
            text: `Your OTP for email verification is: ${otp}`
        };
    
        try {
            // await transporter.sendMail(mailOptions);
            console.log('Verification email sent successfully.');
        } catch (error) {
            console.error('Failed to send verification email:', error);
            throw new Error('Failed to send verification email');
        }
    }
    const getAllUsers = async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to fetch users.' });
        }
    };

    const getUserById = async (req, res) => {
        const { email } = req.params.email;
        try {
            const user = await User.findById(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to fetch user.' });
        }
    };


module.exports = {registerUser, verifyEmail, isEmailRegistered, generateOTP, sendVerificationEmail, getAllUsers,getUserById}





// try{
// const isEmailRegister = await isEmailRegistered(email);
// if (isEmailRegister){
//         return res.status(400).json({ message: 'Email already registered.' });
//     }

//     const otp = generateOTP();
//     await sendVerificationEmail(email, otp);

//         // Save user
//         const newUser = new User({ name, email, mobileNumber, password, otp });
//         await newUser.save();
//         res.status(200).json({ message: 'User registered successfully. Check your email for verification.' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to register user.' });
//     }
// }