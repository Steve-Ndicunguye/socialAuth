import mongoose from 'mongoose';

const userFacebookSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    facebookId: {
        type: String,
    },
    provider: {
        type: String,
        required: true,
    }
});

export default mongoose.model('userFacebook', userFacebookSchema);