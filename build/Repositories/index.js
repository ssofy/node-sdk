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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repositories = void 0;
const DefaultClientRepositoryInternal = __importStar(require("./Default/ClientRepository"));
const DefaultScopeRepositoryInternal = __importStar(require("./Default/ScopeRepository"));
const DefaultUserRepositoryInternal = __importStar(require("./Default/UserRepository"));
const DefaultOTPRepositoryInternal = __importStar(require("./Default/OTPRepository"));
const DefaultSocialLinkRepositoryInternal = __importStar(require("./Default/SocialLinkRepository"));
const MockClientRepositoryInternal = __importStar(require("./Mock/ClientRepository"));
const MockScopeRepositoryInternal = __importStar(require("./Mock/ScopeRepository"));
const MockUserRepositoryInternal = __importStar(require("./Mock/UserRepository"));
const MockOTPRepositoryInternal = __importStar(require("./Mock/OTPRepository"));
var Repositories;
(function (Repositories) {
    Repositories.DefaultClientRepository = DefaultClientRepositoryInternal.ClientRepository;
    Repositories.DefaultScopeRepository = DefaultScopeRepositoryInternal.ScopeRepository;
    Repositories.DefaultUserRepository = DefaultUserRepositoryInternal.UserRepository;
    Repositories.DefaultOTPRepository = DefaultOTPRepositoryInternal.OTPRepository;
    Repositories.DefaultSocialLinkRepository = DefaultSocialLinkRepositoryInternal.SocialLinkRepository;
    Repositories.MockClientRepository = MockClientRepositoryInternal.ClientRepository;
    Repositories.MockScopeRepository = MockScopeRepositoryInternal.ScopeRepository;
    Repositories.MockUserRepository = MockUserRepositoryInternal.UserRepository;
    Repositories.MockOTPRepository = MockOTPRepositoryInternal.OTPRepository;
})(Repositories = exports.Repositories || (exports.Repositories = {}));
