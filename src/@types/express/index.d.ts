declare namespace Express{
    //teremos um campo de user_id na interface de request do express
    export interface Request{
        user_id: string;
    }
}