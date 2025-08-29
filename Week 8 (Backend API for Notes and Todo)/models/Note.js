import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxLength: [200, 'Title must be less than 200 characters']
    },
    content: {
        type: String,
        maxLength: [10000, 'Content must be less than 10000 characters'],
        default: ''
    },
    tags: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true
});

noteSchema.pre('save', function (next) {
    if (this.tags) {
        this.tags = this.tags.filter(tag => tag.trim() !== '');
    }
    next();
});

export const Note = mongoose.model('Note', noteSchema);