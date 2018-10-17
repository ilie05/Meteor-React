import SimplSchema from 'simpl-schema';

export default new SimplSchema({
    title: String,
    description: String,
    userId: {
        type: String,
        optional: true
    },
    views: {
		type: Number,
		optional: true
    },
    comments: {
        type: Number,
        optional: true
    },
    createdAt: {
		type: Date,
		optional: true
    },
    type: String
});