export default class Todo {
  constructor(
    public text: string,
    public id: string = Math.random().toString().split('.')[1],
    public isComplete: boolean = false,
  ) {}
}