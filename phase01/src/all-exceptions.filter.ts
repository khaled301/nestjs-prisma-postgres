import  { Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core'; 
import { Request, Response } from 'express';
import { CsLoggerService } from './cs-logger/cs-logger.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

type CustomResponseObject = {
    statusCode: number,
    timestamp: string,
    path: string,
    response: string | object
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new CsLoggerService(AllExceptionsFilter?.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host?.switchToHttp();
        const response = ctx?.getResponse<Response>();
        const request = ctx?.getRequest<Request>();

        const customResponseObj: CustomResponseObject = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request?.url,
            response: ''
        };

        if(exception instanceof HttpException){
            customResponseObj.statusCode = exception?.getStatus();
            customResponseObj.response = exception?.getResponse();
        }else if(exception instanceof PrismaClientValidationError){
            customResponseObj.statusCode = 422;
            customResponseObj.response = exception?.message?.replaceAll(/\n/g, '');
        }else{
            customResponseObj.statusCode = HttpStatus?.INTERNAL_SERVER_ERROR;
            customResponseObj.response = 'Internal Server Error';
        }

        response.status(customResponseObj.statusCode).json(customResponseObj);

        this.logger.error(customResponseObj.response, AllExceptionsFilter?.name);

        super.catch(exception, host);
    }
}