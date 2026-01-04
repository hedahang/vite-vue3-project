import type { MockMethod } from "vite-plugin-mock";

import authMock from "./modules/auth";
import commonMock from "./modules/common";
import userMock from "./modules/user";

export default [...userMock, ...authMock, ...commonMock] as MockMethod[];
