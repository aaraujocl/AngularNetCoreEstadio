
export class ResponseApi{
  code: number;
  result: [];
  message: string;
  constructor(code: number, objectResultIn: [], messageIn: string){
    this.code = code;
    this.result = objectResultIn;
    this.message = messageIn;
  }
}
