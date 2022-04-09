
class Response {
    constructor(code, message, data = []) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

class Fail extends Response {
    constructor(code, message, data) {
        super(code, message, data);
        this.error = true;
        this.data = null;
    }
}

class Success extends Response {
    constructor(code, message, data) {
        super(code, message, data);
        this.error = false;
    }
}

module.exports = {
    Fail,
    Success
}