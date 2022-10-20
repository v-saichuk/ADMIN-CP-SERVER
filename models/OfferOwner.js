import mongoose from 'mongoose';

const OfferOwnerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        color: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('OfferOwner', OfferOwnerSchema);
