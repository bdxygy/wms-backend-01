import { User } from "@/models";
import { Hono } from "hono";
export interface Applications {
    Variables: {
        user: User;
    };
}
export declare const createApp: () => Hono<Applications, import("hono/types").BlankSchema, "/">;
//# sourceMappingURL=hono.d.ts.map