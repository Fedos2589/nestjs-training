import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/user.schema';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
})
export class UsersModule {}
