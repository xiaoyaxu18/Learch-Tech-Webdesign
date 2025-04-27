"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_s3_1 = require("@aws-sdk/client-s3");
var fs_1 = require("fs");
var path_1 = require("path");
var dotenv_1 = require("dotenv");
var db_1 = require("../app/lib/db");
var Video_1 = require("../app/models/Video");
// 加载环境变量
(0, dotenv_1.config)({ path: '.env.local' });
var s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
function uploadVideo(filePath, title, courseId, uploaderId) {
    return __awaiter(this, void 0, void 0, function () {
        var fileContent, fileName, fileKey, videoUrl, video, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    fileContent = fs_1.default.readFileSync(filePath);
                    fileName = path_1.default.basename(filePath);
                    fileKey = "course-videos/".concat(Date.now(), "-").concat(fileName);
                    // 上传到 S3
                    return [4 /*yield*/, s3Client.send(new client_s3_1.PutObjectCommand({
                            Bucket: process.env.AWS_S3_BUCKET,
                            Key: fileKey,
                            Body: fileContent,
                            ContentType: 'video/mp4' // 根据实际视频格式调整
                        }))
                        // 生成视频 URL
                    ];
                case 1:
                    // 上传到 S3
                    _a.sent();
                    videoUrl = "https://".concat(process.env.AWS_S3_BUCKET, ".s3.").concat(process.env.AWS_REGION, ".amazonaws.com/").concat(fileKey);
                    // 连接数据库
                    return [4 /*yield*/, (0, db_1.default)()
                        // 创建视频记录
                    ];
                case 2:
                    // 连接数据库
                    _a.sent();
                    return [4 /*yield*/, Video_1.default.create({
                            title: title,
                            courseId: courseId,
                            url: videoUrl,
                            key: fileKey,
                            duration: '00:00', // 这里可以添加获取视频时长的逻辑
                            uploadedBy: uploaderId
                        })];
                case 3:
                    video = _a.sent();
                    console.log('视频上传成功:', {
                        title: video.title,
                        url: video.url,
                        id: video._id
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('上传失败:', error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// 使用示例
uploadVideo('/path/to/your/video.mp4', // 本地视频文件路径
'线性代数第一课', // 视频标题
'课程ID', // MongoDB中的课程ID
'上传者ID' // MongoDB中的用户ID
);
