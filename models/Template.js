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
        sections: [
            {
                title: String,
                fields: [
                    {
                        field_type: {
                            type: String,
                            require: true,
                        },
                        field_name: {
                            type: String,
                            require: true,
                        },
                        field_description: String,
                        content: {
                            type: Object,
                            require: true,
                        },
                    },
                ],
            },
        ],
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Template', TemplateSchema);
