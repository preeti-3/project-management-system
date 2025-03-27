import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const ResponseObj = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: ""
        }

        if (exception instanceof HttpException) {
            ResponseObj.statusCode = exception.getStatus();
            ResponseObj.message = exception.message;
        } else if (exception instanceof PrismaClientValidationError || exception instanceof PrismaClientKnownRequestError) {
            ResponseObj.statusCode = 400;
            ResponseObj.message = exception.message;
        } else if (exception instanceof Error) {
            ResponseObj.message = "Internal Server Error";
            ResponseObj.statusCode = 500;
        } else {
            ResponseObj.message = "Unknown Error";
            ResponseObj.statusCode = 500;
        }

        response.status(ResponseObj.statusCode).json(ResponseObj);
        super.catch(exception, host)

    }
}