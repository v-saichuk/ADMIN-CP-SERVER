import mongoose from 'mongoose';

const LegalsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        language: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Language', require: true }],
        offer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer', require: true }],
        website: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Websites', require: true }],
        offerOwner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OfferOwner', require: true }],
        enabled: {
            type: Boolean,
            require: true,
            default: true,
        },
        content: {
            title: {
                type: String,
                default: '',
            },
            description: {
                type: String,
                default: '',
            },
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Legals', LegalsSchema);
