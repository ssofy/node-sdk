import * as ClientRepositoryInternal from "./ClientRepository";
import * as ScopeRepositoryInternal from "./ScopeRepository";
import * as UserRepositoryInternal from "./UserRepository";
import * as OTPRepositoryInternal from "./OTPRepository";
import * as SocialLinkRepositoryInternal from "./SocialLinkRepository";

import * as DefaultClientRepositoryInternal from "./Default/ClientRepository";
import * as DefaultScopeRepositoryInternal from "./Default/ScopeRepository";
import * as DefaultUserRepositoryInternal from "./Default/UserRepository";
import * as DefaultOTPRepositoryInternal from "./Default/OTPRepository";
import * as DefaultSocialLinkRepositoryInternal from "./Default/SocialLinkRepository";

import * as MockClientRepositoryInternal from "./Mock/ClientRepository";
import * as MockScopeRepositoryInternal from "./Mock/ScopeRepository";
import * as MockUserRepositoryInternal from "./Mock/UserRepository";
import * as MockOTPRepositoryInternal from "./Mock/OTPRepository";

export namespace Repositories {
    export type ClientRepository = ClientRepositoryInternal.ClientRepository;
    export type ScopeRepository = ScopeRepositoryInternal.ScopeRepository;
    export type UserRepository = UserRepositoryInternal.UserRepository;
    export type OTPRepository = OTPRepositoryInternal.OTPRepository;
    export type SocialLinkRepository = SocialLinkRepositoryInternal.SocialLinkRepository;

    export import DefaultClientRepository = DefaultClientRepositoryInternal.ClientRepository;
    export import DefaultScopeRepository = DefaultScopeRepositoryInternal.ScopeRepository;
    export import DefaultUserRepository = DefaultUserRepositoryInternal.UserRepository;
    export import DefaultOTPRepository = DefaultOTPRepositoryInternal.OTPRepository;
    export import DefaultSocialLinkRepository = DefaultSocialLinkRepositoryInternal.SocialLinkRepository;

    export import MockClientRepository = MockClientRepositoryInternal.ClientRepository;
    export import MockScopeRepository = MockScopeRepositoryInternal.ScopeRepository;
    export import MockUserRepository = MockUserRepositoryInternal.UserRepository;
    export import MockOTPRepository = MockOTPRepositoryInternal.OTPRepository;
}
