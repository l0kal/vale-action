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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const git_root_dir_1 = __importDefault(require("git-root-dir"));
const path_1 = __importDefault(require("path"));
function allFiles(excludePattern) {
    return __awaiter(this, void 0, void 0, function* () {
        const gitRoot = yield git_root_dir_1.default();
        if (!gitRoot) {
            return;
        }
        let files = [];
        GetFiles(gitRoot, files);
        return files;
    });
}
exports.allFiles = allFiles;
function GetFiles(directory, files) {
    const filesInDirectory = fs_1.default.readdirSync(directory);
    for (const file of filesInDirectory) {
        const absolute = path_1.default.join(directory, file);
        if (fs_1.default.statSync(absolute).isDirectory()) {
            GetFiles(absolute, files);
        }
        else {
            files.push(absolute);
        }
    }
}
