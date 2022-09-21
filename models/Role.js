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
        isSetting: Boolean,
        createUsers: Boolean,
        editUsers: Boolean,
        deleteUsers: Boolean,
        createProjects: Boolean,
        editProjects: Boolean,
        deleteProjects: Boolean,
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Role', RoleSchema);
