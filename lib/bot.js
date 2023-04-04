"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var baileys_1 = __importStar(require("@adiwajshing/baileys"));
var logger_1 = __importDefault(require("@adiwajshing/baileys/lib/Utils/logger"));
var baileys_bottle_1 = __importDefault(require("baileys-bottle"));
var Dalai = require("dalai");
console.clear();
console.log("Initializing DB...");
baileys_bottle_1.default.init({
    type: "sqlite",
    database: "db.sqlite",
}).then(function (bottle) { return __awaiter(void 0, void 0, void 0, function () {
    var client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("DB initialized");
                client = function (clientName) { return __awaiter(void 0, void 0, void 0, function () {
                    var logger, _a, auth, store, _b, state, saveState, startSocket;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                console.log("Starting client \"".concat(clientName, "\""));
                                logger = logger_1.default.child({});
                                logger.level = "silent";
                                console.log("Creating store...");
                                return [4 /*yield*/, bottle.createStore(clientName)];
                            case 1:
                                _a = _c.sent(), auth = _a.auth, store = _a.store;
                                console.log("Creating auth...");
                                return [4 /*yield*/, auth.useAuthHandle()];
                            case 2:
                                _b = _c.sent(), state = _b.state, saveState = _b.saveState;
                                console.log("Done");
                                startSocket = function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var _a, version, isLatest, sock;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, (0, baileys_1.fetchLatestBaileysVersion)()];
                                            case 1:
                                                _a = _b.sent(), version = _a.version, isLatest = _a.isLatest;
                                                console.log("using WA v".concat(version.join("."), ", isLatest: ").concat(isLatest));
                                                sock = (0, baileys_1.default)({
                                                    version: version,
                                                    printQRInTerminal: true,
                                                    auth: state,
                                                    logger: logger,
                                                });
                                                store.bind(sock.ev);
                                                sock.ev.process(function (events) { return __awaiter(void 0, void 0, void 0, function () {
                                                    var upsert, _loop_1, _i, _a, msg, update, connection, lastDisconnect;
                                                    var _b, _c;
                                                    return __generator(this, function (_d) {
                                                        switch (_d.label) {
                                                            case 0:
                                                                if (!events["messages.upsert"]) return [3 /*break*/, 4];
                                                                upsert = events["messages.upsert"];
                                                                console.log("recv messages ", JSON.stringify(upsert, undefined, 2));
                                                                if (!(upsert.type === "notify")) return [3 /*break*/, 4];
                                                                _loop_1 = function (msg) {
                                                                    var msgbuilder, rawtkn_1;
                                                                    return __generator(this, function (_e) {
                                                                        switch (_e.label) {
                                                                            case 0:
                                                                                if (!!msg.key.fromMe) return [3 /*break*/, 4];
                                                                                // mark message as read
                                                                                return [4 /*yield*/, sock.readMessages([msg.key])];
                                                                            case 1:
                                                                                // mark message as read
                                                                                _e.sent();
                                                                                console.log(msg);
                                                                                sock.fetchStatus;
                                                                                msgbuilder = "###Instruction: You are chatbot \n\n###Response:" +
                                                                                    ((msg.message.hasOwnProperty("extendedTextMessage")) ? "\n[".concat(msg.key.remoteJid === msg.message.extendedTextMessage.contextInfo.participant ? msg.pushName : ("917262933876@s.whatsapp.net" === msg.message.extendedTextMessage.contextInfo.participant ? "ChatBot" : "Someone"), "]: ").concat(msg.message.extendedTextMessage.contextInfo.quotedMessage.conversation || msg.message.extendedTextMessage.contextInfo.quotedMessage.extendedTextMessage.text) : "") +
                                                                                    "\n[".concat(msg.pushName, "]: ").concat(msg.message.conversation || msg.message.extendedTextMessage.text) +
                                                                                    "\n[ChatBot]: ";
                                                                                console.log(msgbuilder);
                                                                                rawtkn_1 = "";
                                                                                return [4 /*yield*/, new Dalai().request({
                                                                                        //  url: "ws://localhost:3000",
                                                                                        model: "alpaca.7B",
                                                                                        prompt: msgbuilder,
                                                                                        threads: 6,
                                                                                        n_predict: 3,
                                                                                        skip_end: false,
                                                                                    }, function (token) {
                                                                                        rawtkn_1 += token;
                                                                                    })];
                                                                            case 2:
                                                                                _e.sent();
                                                                                rawtkn_1 = rawtkn_1.slice(msgbuilder.length - 1);
                                                                                rawtkn_1 = rawtkn_1.split("[".concat(msg.pushName, "]:"))[0];
                                                                                rawtkn_1 = rawtkn_1.split("[ChatBot]:")[0];
                                                                                rawtkn_1 = rawtkn_1.split("[Someone]:")[0];
                                                                                rawtkn_1 = rawtkn_1.split("[")[0]; //WIP
                                                                                rawtkn_1 = rawtkn_1.replace(/[\n\r]/g, "")
                                                                                    .replace("<end>", "")
                                                                                    .replace("[end of text]", "");
                                                                                rawtkn_1 = rawtkn_1.trim();
                                                                                return [4 /*yield*/, sock.sendMessage(msg.key.remoteJid, { text: rawtkn_1 }, { quoted: msg })];
                                                                            case 3:
                                                                                _e.sent();
                                                                                _e.label = 4;
                                                                            case 4: return [2 /*return*/];
                                                                        }
                                                                    });
                                                                };
                                                                _i = 0, _a = upsert.messages;
                                                                _d.label = 1;
                                                            case 1:
                                                                if (!(_i < _a.length)) return [3 /*break*/, 4];
                                                                msg = _a[_i];
                                                                return [5 /*yield**/, _loop_1(msg)];
                                                            case 2:
                                                                _d.sent();
                                                                _d.label = 3;
                                                            case 3:
                                                                _i++;
                                                                return [3 /*break*/, 1];
                                                            case 4:
                                                                if (!events["creds.update"]) return [3 /*break*/, 6];
                                                                return [4 /*yield*/, saveState()];
                                                            case 5:
                                                                _d.sent();
                                                                _d.label = 6;
                                                            case 6:
                                                                if (events["connection.update"]) {
                                                                    update = events["connection.update"];
                                                                    connection = update.connection, lastDisconnect = update.lastDisconnect;
                                                                    connection === "open"
                                                                        ? console.log("Connected")
                                                                        : connection === "close"
                                                                            ? ((_c = (_b = lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error) === null || _b === void 0 ? void 0 : _b.output) === null || _c === void 0 ? void 0 : _c.statusCode) !==
                                                                                baileys_1.DisconnectReason.loggedOut
                                                                                ? startSocket()
                                                                                : console.log("Connection closed. You are logged out.")
                                                                            : null;
                                                                }
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); });
                                                return [2 /*return*/];
                                        }
                                    });
                                }); };
                                startSocket();
                                return [2 /*return*/];
                        }
                    });
                }); };
                return [4 /*yield*/, client("client 1")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=bot.js.map