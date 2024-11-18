import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class StudentsService {
    constructor(@Inject('CACHE_MANAGER') private cacheManger: Cache) {}

    async getStudents() {
        // // CacheInterceptor will handle the below logic
        // const cachedStudents = await this.cacheManger.get('students');
        // if(cachedStudents) return {source: 'cache', data: cachedStudents}; 

        const dbStudents =  await this.retrieveStudentFromDB();
        //// doesn't need to set the value in the cache as it will be set in Redis by the CacheInterceptor
        // await this.cacheManger.set('students', dbStudents, 10000);
        return dbStudents;
    }

    async deleteStudents() {
        return this.cacheManger.del('students');
    }

    async resetCache() {
        return this.cacheManger.reset();
    }

    async retrieveStudentFromDB(){
        return new Promise((resolve) => {
            setTimeout(() => {
                const students = [
                    { id: 1, name: 'John' }, 
                    { id: 2, name: 'Jane' },
                    { id: 3, name: 'Bob' },
                ];
                resolve(students);
            }, 3000)
        });
    }
}
