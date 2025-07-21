import { Hono } from "hono";
import { User } from "../models";
export interface Applications {
    Variables: {
        user: User;
    };
}
export declare const createApp: () => Hono<Applications, import("hono/types").BlankSchema, "/">;
//# sourceMappingURL=hono.d.ts.map