import { GotClient } from "./got_client";

export const getPreferredClient = (...options: ConstructorParameters<typeof GotClient>): GotClient => {
    return new GotClient(...options);
};

export * from "./fetch_client";
export * from "./got_client";
