import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema(
    {
        template: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Template', require: true }],
        title: {
            type: String,
            require: true,
        },
        fields: [],
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Section', SectionSchema);
