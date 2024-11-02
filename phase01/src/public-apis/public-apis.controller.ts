import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { PublicApisService } from './public-apis.service';

@Controller('public-apis')
export class PublicApisController {
  constructor(private readonly publicApisService: PublicApisService) {}

  @Get()
  findAllPosts(@Query('userId', ParseIntPipe) userId: number) {
    console.log('hello 1');
    return this.publicApisService.findAllPosts(userId);
  }

  @Get(':id')
  findSpecificPost(@Param('id', ParseIntPipe) id: number) {
    return this.publicApisService.findSpecificPost(id);
  }

  @Post()
  createPost(@Body() body: any) {
    return this.publicApisService.createPost(body);
  }
}
