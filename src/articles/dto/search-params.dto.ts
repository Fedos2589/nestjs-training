import { IsString, Length } from 'class-validator';
export class SearchParamsDto {
  @IsString()
  @Length(24, 24, {
    message: 'id length should be 24',
  })
  id: string;
}
