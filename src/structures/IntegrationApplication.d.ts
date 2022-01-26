import Application from "./interfaces/Application";
declare class IntegrationApplication extends Application {
    bot: import("./User") | null;
    termsOfServiceURL: string | null;
    privacyPolicyURL: string | null;
    rpcOrigins: Array<string>;
    summary: string | null;
    hook: boolean | null;
    cover: string | null;
    verifyKey: string | null;
    static readonly default: typeof IntegrationApplication;
    _patch(data: import("discord-typings").IntegrationApplicationData): void;
}
export = IntegrationApplication;
