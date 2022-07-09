import { IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    role: string;

    confirmPassword: string;
}

export class LoginDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}

export class filterByUsernameDto {
    @IsNotEmpty()
    username: string;
}

export class filterByIdDto {
    @IsNotEmpty()
    id: string;
}

export class updateDto {
    @IsNotEmpty()
    id: string;

    @IsOptional()
    username: string;

    @IsOptional()
    password: string;

    @IsOptional()
    role: string;

    @IsOptional()
    confirmPassword: string;

    @IsOptional()
    fullname: string;

    @IsOptional()
    position: string;
    
    @IsOptional()
    email: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    emailVerified: boolean;

    @IsOptional()
    accountVerified: boolean;

    @IsOptional()
    notes: string;

    companyId: string;

    codename: string;

    message:string;

    userId: string;

    userSecret: string;
    
    @IsOptional()
    createdBy: string;

    @IsOptional()
    modifiedBy: string;

    @IsOptional()
    createdAt: Date;

    @IsOptional()
    modifiedAt: Date;
}