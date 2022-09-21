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
        twitter: String,
        facebook: String,
        telegram: String,
        linkedin: String,
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', UserSchema);
