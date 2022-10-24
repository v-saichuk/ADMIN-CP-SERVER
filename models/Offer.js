import mongoose from 'mongoose';

const OfferSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        offerOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OfferOwner',
            require: true,
        },
        logo: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Offer', OfferSchema);
