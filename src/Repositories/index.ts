import * as ClientRepositoryInternal from "./ClientRepository";
import * as ScopeRepositoryInternal from "./ScopeRepository";
import * as UserRepositoryInternal from "./UserRepository";
import * as OTPRepositoryInternal from "./OTPRepository";

export namespace Repositories {
    export type ClientRepository = ClientRepositoryInternal.ClientRepository;
    export type ScopeRepository = ScopeRepositoryInternal.ScopeRepository;
    export type UserRepository = UserRepositoryInternal.UserRepository;
    export type OTPRepository = OTPRepositoryInternal.OTPRepository;
}
