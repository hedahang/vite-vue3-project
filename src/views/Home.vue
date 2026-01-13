<script setup lang="ts">
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import Todolist from "../components/Todolist.vue";

const userStore = useUserStore();
const router = useRouter();

const goToAbout = () => {
  router.push("/about");
};
function identify<T>(arg: T): T {
  return arg;
}
let str1 = identify<string>("我是首页");
let str2 = identify<number>(123);
let bool1 = identify(true);
// 1. 基础泛型函数
function firstElement<T>(params: T[]): T | undefined {
  return params[0];
}
const num = firstElement([1, 2, 3]);
const str = firstElement(["a", "b", "c"]);
const empty = firstElement([]);
console.log(num, str, empty);

// 2. 泛型接口
interface ApiResponse<T> {
  data: T;
  message: string;
  code: number;
}
type User = { id: number; name: string; age: number };
const response: ApiResponse<User> = {
  data: { id: 1, name: "张三", age: 18 },
  message: "成功",
  code: 200,
};
console.log(response);

// 3. 泛型约束
function printLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}
console.log(printLength("hello"));
console.log(printLength([1, 2, 3]));
console.log(printLength({ length: 10 }));
// console.log(printLength(123));

// 4. 泛型类
class Queue<T> {
  private data: T[] = [];
  push(item: T) {
    this.data.push(item);
  }
  pop(): T | undefined {
    return this.data.shift();
  }
}
const numberQueue = new Queue<number>();
numberQueue.push(1);
numberQueue.push(2);
// numberQueue.push("字符串");
console.log(numberQueue.pop());
console.log(numberQueue.pop());
console.log(numberQueue.pop());

// 5. 泛型 + keyof
function getProp<T, K extends keyof T>(boj: T, key: K): T[K] {
  return boj[key];
}
const obj = {
  name: "张三",
  age: 18,
};
console.log(getProp(obj, "name"));
console.log(getProp(obj, "age"));
// console.log(getProp(obj, "gender"));

// 6. 测试
interface Todo {
  title: string;
  desc: string;
  done: boolean;
}
type Partial1<T> = {
  [P in keyof T]?: T[P];
};
type partTodo = Partial1<Todo>;
const part: partTodo = {
  title: "学习Vue 3",
  desc: "学习Vue 3的语法",
  // done: false,
};
console.log(part);

// 7. 测试2
type Exclude1<T, K> = T extends K ? never : T;
type A = Exclude1<"a" | "b" | "c", "a" | "c">;
const demo2: A = "b";
console.log(demo2);

type Pick1<T, K extends keyof T> = { [P in K]: T[P] };
type UserBase = Pick1<User, "id" | "name">;
const demo3: UserBase = {
  id: 1,
  name: "张三",
};
console.log(demo3);

type Concat1<T extends any[], U extends any[]> = [...T, ...U];
type B = Concat1<[string, number], boolean[]>;
const demo4: B = ["1", 2, true, false, true, false];
console.log(demo4);
</script>

<template>
  <div class="home">
    <h1>首页</h1>
    <div class="user-info">
      <p>当前用户：{{ userStore.displayName }}</p>
      <p>登录状态：{{ userStore.isLoggedIn ? "已登录" : "未登录" }}</p>
      <p>{{ str1 }}</p>
      <p>{{ str2 }}:{{ bool1 }}</p>
    </div>
    <div class="actions">
      <button @click="goToAbout">前往关于页面</button>
    </div>
    <Todolist />
  </div>
</template>

<style scoped>
.home {
  padding: 2rem;
  text-align: center;
}

.user-info {
  margin: 2rem 0;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #35a372;
}
</style>
