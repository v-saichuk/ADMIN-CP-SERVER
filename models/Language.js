import mongoose from 'mongoose';

const LanguageSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true,
    },
    icon: {
        type: String,
        require: true,
        unique: true,
    },
    enabled: {
        type: Boolean,
        require: true,
    },
});

export default mongoose.model('Language', LanguageSchema);
