"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var videoSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, '视频标题是必需的'],
    },
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    url: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    watched: {
        type: Boolean,
        default: false
    },
    uploadedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});
var Video = mongoose_1.default.models.Video || mongoose_1.default.model('Video', videoSchema);
exports.default = Video;
