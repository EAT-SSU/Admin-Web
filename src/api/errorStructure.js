import CustomError from './customError';

// CustomError 객체를 생성하는 함수
function parseCustomError(errorData) {
    // 기본값(false, 500, '에러발생')
    const {
        isSuccess = false,
        code = 500,
        message = '에러 발생',
    } = errorData;

    return new CustomError(isSuccess, code, message);
}

const ErrorStructure = {
    parseError: (error) => {
        return parseCustomError(error.response.data);
    }
};

export default ErrorStructure;
