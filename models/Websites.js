import mongoose from 'mongoose';

const WebsitesSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            require: true,
        },
        offers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer', require: true }],
        enabled: {
            type: Boolean,
            require: true,
            default: true,
        },
        notes: {
            type: String,
            require: true,
            default: 'No information',
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Websites', WebsitesSchema);
