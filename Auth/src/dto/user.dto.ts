import { IsNotEmpty, IsOptional } from 'class-validator';

export class filterGetAllUserDto {
    @IsNotEmpty()
    page: string

    @IsNotEmpty()
    limit: string
}

export class searchUserDto {
    @IsOptional()
    search: string
}

export class filterUserDto {
    @IsOptional()
    companyId: string
}

export class sendEmailDto {
    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    email: string
}