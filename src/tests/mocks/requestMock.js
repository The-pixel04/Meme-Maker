import { vi } from "vitest";
import request from "../../utils/request.js";

vi.mock('../../utils/request.js', () => {
    return {
        default: {
            get: vi.fn(),
            post: vi.fn(),
            put: vi.fn(),
            delete: vi.fn()
        }
    }
});

export default request;