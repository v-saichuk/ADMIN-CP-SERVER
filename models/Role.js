import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        color: {
            type: String,
            require: true,
        },
        isSetting: {
            type: Boolean,
            default: false,
        },
        users: {
            createUsers: {
                type: Boolean,
                default: false,
            },
            editUsers: {
                type: Boolean,
                default: false,
            },
            deleteUsers: {
                type: Boolean,
                default: false,
            },
        },
        projects: {
            createProjects: {
                type: Boolean,
                default: false,
            },
            editProjects: {
                type: Boolean,
                default: false,
            },
            deleteProjects: {
                type: Boolean,
                default: false,
            },
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Role', RoleSchema);
