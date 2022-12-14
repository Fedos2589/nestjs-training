import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
})
export class UsersModule {}
