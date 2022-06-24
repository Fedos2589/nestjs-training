import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { UserDTO } from 'src/users/dto/user.dto';
import * as bcrypt from 'bcrypt';

export interface IUser extends Document {
  id: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  sanitizeUser(user: IUser) {
    const { password, ...rest } = user.toObject();
    return rest;
  }

  async create(RegisterDTO: UserDTO) {
    const { username } = RegisterDTO;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(RegisterDTO);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findByLogin(UserDTO: UserDTO) {
    const { username, password } = UserDTO;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  async findByPayload(payload: string) {
    return await this.userModel.findOne({ username: payload });
  }
}
