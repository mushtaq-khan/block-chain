// export class PriceQueryDto {
//     type: string;
//   }

import { ApiProperty } from '@nestjs/swagger';

export class PriceQueryDto {
  @ApiProperty({
    example: 'EVERY_HOUR_OF_DAY',
    description: 'Type of data update (e.g., EVERY_HOUR_OF_DAY)',
    required: false,
    default: 'EVERY_5_MIN',
  })
  type?: string;
}

