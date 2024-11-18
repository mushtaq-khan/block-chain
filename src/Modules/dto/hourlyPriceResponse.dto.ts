export class HourlyPriceResponseDto {
    status: number;
    message: string;
    data?: {
        ethereumHistory?: any[];
        polygonHistory?: any[];
    };
}