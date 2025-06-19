export default class apiError extends Error {
    status;
    errors;
    message;
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.message = message;
        // Remove stackTrace
        if (!(process.env.INCLUDE_STACKTRACE === "true")) {
            this.stack = undefined;
        }
    }
    static UnauthorizedError() {
        return new apiError(401, "Unauthorized");
    }
    static ForbiddenError(message) {
        if (!message)
            return new apiError(403, "Forbidden");
        return new apiError(403, message);
    }
    static InternalServerError(e) {
        return new apiError(500, "InternalServerError", [e]);
    }
    static NoContent(message) {
        if (!message)
            message = "No content";
        return new apiError(204, message);
    }
    static PageNotFoundError(message) {
        if (!message)
            message = "Not found";
        return new apiError(404, message);
    }
    static BadRequest(message) {
        if (!message)
            message = "Bad request";
        return new apiError(400, message);
    }
}
