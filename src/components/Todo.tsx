import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Todo",
  setup(props, { slots }) {
    const title = ref<string>("");
    const todos = ref<Array<{ title: string; done: boolean }>>([
      { title: "学习Vue 3", done: false },
    ]);
    function addTodo() {
      if (title.value) {
        todos.value.push({ title: title.value, done: false });
        title.value = "";
      }
    }
    return () => (
      <div class="todo">
        <input type="text" v-model={title.value} />
        <ul>
          {todos.value.length ? (
            todos.value.map((todo) => (
              <li key={todo.title}>
                <input type="checkbox" v-model={todo.done} />
                <span>{todo.title}</span>
              </li>
            ))
          ) : (
            <li>暂无待办事项</li>
          )}
        </ul>
      </div>
    );
  },
});
