import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        avatarUrl: String,
        firstName: {
            type: String,
            require: true,
        },
        lastName: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        roleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
            require: true,
        },
        passwordHash: {
            type: String,
            require: true,
        },
        social: {
            twitter: {
                type: String,
                default: '',
            },
            facebook: {
                type: String,
                default: '',
            },
            telegram: {
                type: String,
                default: '',
            },
            linkedin: {
                type: String,
                default: '',
            },
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', UserSchema);
