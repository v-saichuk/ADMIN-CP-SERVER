import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', require: true },
        template_pack: {
            type: String,
            require: true,
        },
        description: {
            type: String,
        },
        screenshot: {
            type: String,
            default: 'No Logo Image',
        },
        sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Template', TemplateSchema);
