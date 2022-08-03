import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SearchParamsDto } from 'src/articles/dto/search-params.dto';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param() searchParamsDto: SearchParamsDto) {
    return this.articlesService.findOne(searchParamsDto.id);
  }

  @Patch(':id')
  update(
    @Param() searchParamsDto: SearchParamsDto,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(searchParamsDto.id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param() searchParamsDto: SearchParamsDto) {
    return this.articlesService.remove(searchParamsDto.id);
  }
}
