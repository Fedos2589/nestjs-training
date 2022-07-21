import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article')
    private articleModel: Model<CreateArticleDto & Document>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    return new this.articleModel(createArticleDto).save();
  }

  async findAll() {
    return this.articleModel.find();
  }

  async findOne(id: string) {
    const article = await this.articleModel.findOne({ _id: id });
    if (!article) {
      throw new HttpException('article not exists', HttpStatus.NOT_FOUND);
    } else {
      return article;
    }
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const article = await this.articleModel.findOne({ _id: id });
    if (!article) {
      throw new HttpException('article not exists', HttpStatus.NOT_FOUND);
    } else {
      return this.articleModel.findByIdAndUpdate(
        { _id: id },
        { $set: updateArticleDto },
      );
    }
  }

  async remove(id: string) {
    const article = await this.articleModel.findOne({ _id: id });
    if (!article) {
      throw new HttpException('article not exists', HttpStatus.NOT_FOUND);
    } else {
      return this.articleModel.deleteOne({ _id: id });
    }
  }
}
