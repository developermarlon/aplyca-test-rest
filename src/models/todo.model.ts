import axios from 'axios';
import { NonSensitiveInfoUserLogged, FormLogin, UserApi } from "../services/user/ts/types";
import { FormCreateUser } from "../services/user/ts/interfaces";
import { UserEntry, TodoEntry, FormCreateTodo } from "../services/user/ts/interfaces";

const todo = new Array<TodoEntry>();

export default class Todo {

  public constructor () {
  }

  public getTodosByUser(id: number): Array<TodoEntry> {
    return todo.filter(todo => todo.userId === id);
  }

  public getTodoById(id: number): TodoEntry | undefined {
    return todo.find(todo => todo.id === id);
  }

  public createTodo(form: FormCreateTodo): TodoEntry {
    const todoPayload: TodoEntry = {
      id: todo.length + 1,
      userId: form.userId,
      title: form.title,
      completed: false,
    }
    todo.push(todoPayload)
    return todoPayload
  }

  public updateTodo(userId: number, id: number, title: string): TodoEntry | null {
    try {
      const todoPayload: TodoEntry = {
        id: Number(id),
        userId: userId,
        title,
        completed: false,
      }
      const todoIndex = todo.findIndex(todo => todo.id === Number(id));
  
      if (todoIndex !== -1) {
        
        todo[todoIndex] = {...todo[todoIndex], ...todoPayload};
        return todoPayload;
      }
      return null
    }catch(e: any) {
      console.log(e)
      throw new Error(e.message);
    }

  }

  public deleteTodo(userId: number, id: number): boolean {
    try {
      const todoIndex = todo.findIndex(todo => todo.id === Number(id));
      return todo.splice(todoIndex, 1) ? true : false;
    }catch(e: any) {
      console.log(e)
      throw new Error(e.message);
    }
  }

}

(async () => {
  const response: {data: TodoEntry[]} = await axios.get('https://jsonplaceholder.typicode.com/todos')
  todo.push(...response.data)
  console.info(`${todo.length} TODOS LOADED`);
})()
