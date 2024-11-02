import { Injectable } from '@nestjs/common';
import { CreatePublicApiDto } from './dto/create-public-api.dto';
import { UpdatePublicApiDto } from './dto/update-public-api.dto';
import axios, { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';
@Injectable()
export class PublicApisService {

  constructor(private readonly httpService: HttpService) {}

  async findSpecificPost(id: number): Promise<any> {
    try{
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return response.data;
    }catch(error){
      console.error(error);
    }
  }

  async findAllPosts(userId){
        console.log('hello 2');
    return this.httpService
          .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
          .pipe(map((response: AxiosResponse) => response.data));
  }

  async createPost(body) {
    const uri = 'https://jsonplaceholder.typicode.com/posts';

    try {
      const response = await fetch(uri, {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
}
