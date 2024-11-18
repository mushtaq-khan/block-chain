import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEmail } from 'class-validator';

export class AlertDto {
    @ApiProperty({
        example: 'Ethereum',
        description: 'The blockchain network (e.g., Ethereum, Bitcoin)',
    })
    @IsString()
    chain: string;

    @ApiProperty({
        example: 2000,
        description: 'The dollar price threshold for the alert',
    })
    @IsNumber()
    dollar: number;

    @ApiProperty({
        example: 'user@example.com',
        description: 'Email address to receive the alert',
        required: false,
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsOptional()
    id?: number;

    @IsOptional()
    createdAt?: Date;

    @IsOptional()
    notified?: string;

    @ApiProperty({
        example: 'ETH',
        description: 'The blockchain network (e.g., ETH, MATIC)',
    })
    @IsString()
    @IsOptional()
    tokenSymbol?: string | null;
}

