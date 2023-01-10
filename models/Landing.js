import mongoose from 'mongoose';

const LandingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        country: {
            type: Array,
            require: true,
        },
        language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', require: true },
        website: { type: mongoose.Schema.Types.ObjectId, ref: 'Websites', require: true },
        offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', require: true },
        template_pack: {
            type: String,
            require: true,
        },

        status: {
            type: Boolean,
            require: true,
        },
        note: {
            type: String,
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

export default mongoose.model('Landing', LandingSchema);
