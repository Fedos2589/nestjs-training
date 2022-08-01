import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Roles, UserDTO } from 'src/users/dto/user.dto';
import * as bcrypt from 'bcrypt';

export interface IUser extends Document {
  id: number;
  username: string;
  password: string;
  role: Roles;
}

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  sanitizeUser(user: IUser) {
    const { password, ...rest } = user;
    return rest;
  }

  async create(registerDTO: UserDTO) {
    const { username } = registerDTO;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.CONFLICT);
    }
    const createdUser = new this.userModel(registerDTO);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findByLogin(userDTO: UserDTO) {
    const { username, password } = userDTO;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.UNAUTHORIZED);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByPayload(payload: string) {
    return await this.userModel.findOne({ username: payload });
  }

  async findAll() {
    return await this.userModel.find();
  }
}
