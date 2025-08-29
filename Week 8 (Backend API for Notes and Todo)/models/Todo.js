import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxLength: [200, 'Title must be less than 200 characters']
    },
    description: {
        type: String,
        maxLength: [1000, 'Description must be less than 1000 characters'],
        default: ''
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: {
            values: ['low', 'medium', 'high'],
            message: 'Priority must be one of: low, medium, high'
        },
        default: 'medium'
    },
    dueDate: {
        type: Date
    },
    category: {
        type: String,
        trim: true,
        maxLength: [50, 'Category must be less than 50 characters']
    },
    completedAt: {
        type: Date
    }
}, {
    timestamps: true
});

todoSchema.pre('save', function(next) {
    if (this.isModified('completed')) {
        this.completedAt = this.completed ? new Date() : null;
    }
    next();
});

export const Todo = mongoose.model('Todo', todoSchema);