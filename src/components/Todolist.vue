<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref } from "vue";
import { useStorage } from "@vueuse/core";
import Dustbin from "./Dustbin.vue";

interface Todo {
  title: string;
  done: boolean;
}

let title: Ref<string> = ref<string>("");
let todos: Ref<Todo[]> = useStorage<Todo[]>("todos", []);

let allDone = computed({
  get() {
    return todos.value.every((todo: { done: boolean }) => todo.done);
  },
  set(value) {
    todos.value.forEach((todo: { done: boolean }) => {
      todo.done = value;
    });
  },
});
let active = computed(() => {
  return todos.value.filter((todo: { done: boolean }) => todo.done).length;
});
let all = computed(() => {
  return todos.value.length;
});
function addTodo() {
  if (title.value) {
    todos.value.push({ title: title.value, done: false });
    title.value = "";
  } else {
    showModal.value = true;
    setTimeout(() => {
      showModal.value = false;
    }, 2000);
  }
}
let showModal = ref<boolean>(false);

// Dustbin 组件引用
const dustbinRef = ref<InstanceType<typeof Dustbin> | null>(null);

// 待删除的索引
let pendingDeleteIndex = ref<number | null>(null);

// 删除函数
function deleteTodo(index: number, event: MouseEvent) {
  // 记录要删除的索引
  pendingDeleteIndex.value = index;

  // 获取点击的元素（删除按钮）
  const clickedElement = event.target as HTMLElement;

  // 触发动画
  if (dustbinRef.value) {
    dustbinRef.value.triggerAnimation(clickedElement);
  }
}

// 处理删除完成事件
function handleDeleteComplete() {
  if (pendingDeleteIndex.value !== null) {
    todos.value.splice(pendingDeleteIndex.value, 1);
    pendingDeleteIndex.value = null;
  }
}
</script>
<template>
  <div class="todolist">
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <transition-group
      v-if="todos.length"
      name="todo"
      tag="ul"
      class="todo-list"
    >
      <li v-for="(todo, index) in todos" :key="`${todo.title}-${index}`">
        <input type="checkbox" v-model="todo.done" class="done-checkbox" />
        <span :class="{ done: todo.done }"> {{ todo.title }}</span>
        <button @click="deleteTodo(index, $event)" class="delete-btn">
          删除
        </button>
      </li>
    </transition-group>
    <div v-else>
      <p>暂无待办事项</p>
    </div>
    <div v-if="todos.length" class="actions-bar">
      <div class="checkbox-group">
        全选<input type="checkbox" v-model="allDone" />
        <span> {{ active }} / {{ all }} </span>
      </div>
    </div>
    <transition name="modal">
      <div class="info-wrapper" v-if="showModal">
        <div class="info">哥，你啥也没输入啊！！！</div>
      </div>
    </transition>
    <!-- 垃圾桶组件 -->
    <Dustbin ref="dustbinRef" @delete-complete="handleDeleteComplete" />
  </div>
</template>
<style scoped lang="scss">
.todolist {
  padding: 2rem;
  text-align: center;
  border: 1px solid #ccc;
  margin-top: 2rem;
  border-radius: 10px;
}

.todo-list,
ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem 0;
  background-color: #f9f9f9;
  border-radius: 4px;
  transition: all 0.3s ease;

  .done-checkbox {
    margin-right: 0.5rem;
  }

  span {
    flex: 1;
    text-align: left;

    &.done {
      text-decoration: line-through;
      color: #999;
    }
  }

  .delete-btn {
    padding: 0.25rem 0.75rem;
    background-color: #f5222d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.3s;
    flex-shrink: 0;

    &:hover {
      background-color: #cf1322;
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

.actions-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;

  .checkbox-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}
.info-wrapper {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  .info {
    padding: 20px;
    color: white;
    background: #d88986;
  }
}
.modal-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.5);
}
.modal-enter-active {
  transition: all 0.3s ease-in-out;
}
.modal-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.5);
}
.modal-leave-active {
  transition: all 0.3s ease-in-out;
}
.todo-enter-from,
.todo-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.todo-enter-active,
.todo-leave-active {
  transition: all 1s ease-in-out;
}
.todo-move {
  transition: all 1s ease-in-out;
}
</style>
