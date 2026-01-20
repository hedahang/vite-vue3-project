<template>
  <div class="demo7-container">
    <h3>树形组件</h3>
    <el-tree
      v-model:expanded="expandedList"
      v-model:checked="checkedList"
      :data="data"
      show-checkbox
      :default-node-key="defaultNodeKey"
    >
    </el-tree>
  </div>
</template>
<script>
export default {
  data() {
    return {
      expandedList: [4, 5],
      checkedList: [5],
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
      ],
      defaultNodeKey: {
        childNodes: "children",
        label: "label",
      },
    };
  },
};
</script>
