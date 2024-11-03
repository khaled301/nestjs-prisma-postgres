import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { CreateGroupPostDto } from './dto/CreateGroupPost.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes()
  createPost(@Body() { userId, ...createPostDto }: CreatePostDto) {
    return this.postsService.createPost(userId, createPostDto);
  }

  @Post('group')
  @UsePipes(ValidationPipe)
  createGroupPost(@Body() {userIds, ...createGroupPostDto}: CreateGroupPostDto) {
    return this.postsService.createGroupPost(userIds, createGroupPostDto);
  }

  @Get('group')
  getGroupPosts() {
    return this.postsService.getGroupPosts();
  }
}
