import mongoose from 'mongoose';

const userGithubSchema = new mongoose.Schema({
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

    githubId: {
        type: String,
    },
    provider: {
        type: String,
        required: true,
    }
});

export default mongoose.model('userGithub', userGithubSchema);