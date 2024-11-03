import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class PostsService {
    constructor(private readonly databaseService: DatabaseService) {}

    createPost(userId: number, data: Prisma.PostCreateWithoutUserInput) {
        return this.databaseService.post.create({ data : {
            ...data,
            userId
        } });
    }

    createGroupPost(userIds: number[], data: Prisma.GroupPostCreateWithoutUsersInput){
        // return this.databaseService.groupPost.create({
        //     data: {
        //         title: data.title,
        //         description: data.description,
        //         users: {
        //             create: [{userId: 1}, {userId: 2}]
        //         }
        //     }
        // })

        return this.databaseService.groupPost.create({
            data: {
                ...data,
                users: {
                    create: userIds.map(userId => ({ userId }))
                }
            }
        })
    }

    getGroupPosts(){
        return this.databaseService.groupPost.findMany({ 
            include: { 
                users: {
                    select: { 
                        user: true
                    }
                } 
            }
        });
    }
}
