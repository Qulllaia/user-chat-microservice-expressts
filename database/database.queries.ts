import {db} from './databse.config'

export class DatabaseQueries{
    async createRoom(first_user:number, second_user:number){
        const result = await db.query(`INSERT INTO public.room(first_user, second_user) VALUES (${first_user}, ${second_user})`);
        return result;
    }
}