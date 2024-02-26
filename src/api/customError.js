class CustomError extends Error {
    constructor(isSuccess, code, message) {
        super(message);
        this.isSuccess = isSuccess;
        this.code = code;
        this.name = this.constructor.name;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;