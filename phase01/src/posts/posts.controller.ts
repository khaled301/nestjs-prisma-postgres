import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreatePost.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes()
  createPost(@Body() { userId, ...createPostDto }: CreatePostDto) {
    return this.postsService.createPost(userId, createPostDto);
  }
}
