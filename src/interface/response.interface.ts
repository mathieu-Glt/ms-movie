import { MovieDocument } from 'src/Schema/movie.schema';


export interface ResponseInterface {
  results: object,
  error: boolean,
  message: string,
  status: number,
  object: object,
  id: string
}


export type responseSucessInterface = Pick<
  ResponseInterface,
  'results' | 'error' | 'message' | 'status'
>;

export type responseErrorInterface = Omit<
  ResponseInterface,
  'results' | 'object' | 'id'
>;
