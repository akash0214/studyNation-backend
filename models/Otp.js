const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60,
    }
});

async function sendVerificationEmail(email, otp){
    try {
        const mailResponse = await mailSender(email, "Verification mail from StudyNation", otp);
        console.log("Mail response sent successfully: ", mailResponse);
    } catch (error) {
        console.log("Error occured while sending mail !!");
        console.error(error);
    }
}

otpSchema.pre('save', async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", otpSchema);