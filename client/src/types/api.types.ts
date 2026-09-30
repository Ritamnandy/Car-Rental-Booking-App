

type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
}

type registerData = {
    name:string;
    email:string;
    password:string;
}

type loginData = {
    email:string;
    password:string;
}

type resendOtpData = {
    email:string;
}

type verifyEmailData = {
    email:string;
    otp:string;
}
type forgotPasswordData = {
    email:string;
}

type resetPasswordData = {
    token:string;
    password:string;
}

export type { ApiResponse, registerData, loginData, resendOtpData, verifyEmailData, forgotPasswordData, resetPasswordData };