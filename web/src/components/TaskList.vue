<template>
  <input type="checkbox" :id="`modal-task-${props.id}`" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box cursor-default w-2/3 max-w-5xl">
      <div class="flex justify-between">
        <h3 class="text-sm font-semibold uppercase mb-2">
          Task List - {{ project.name }}
        </h3>
      </div>
      <hr />
      <div>
        <table
          v-if="project.tasks.length > 0"
          ref="refTable"
          style="width: 100%"
          class="table table-compact w-full mt-2">
          <tbody>
            <tr
              v-for="task in project.tasks"
              :style="task.completed ? 'text-decoration: line-through' : ''"
              :key="task">
              <td>
                <input
                  v-model="task.completed"
                  type="checkbox"
                  class="checkbox checkbox-sm mt-1"
                  @change="set(project), save()" />
              </td>
              <td>
                {{ task.name }}
              </td>
              <td class="grid text-right align-middle">
                {{ useDateFormat(task.created, 'M/D/YYYY').value }}
              </td>
              <td class="text-right">
                {{
                  task.completed
                    ? useDateFormat(task.completed, 'M/D/YYYY').value
                    : ''
                }}
              </td>
              <td class="cursor-pointer" @click="edit(task)">
                <mdicon name="pencil" size="16" />
              </td>
              <td class="cursor-pointer" @click="remove(task)">
                <mdicon name="trash-can" size="16" />
              </td>
            </tr>
            <tr>
              <td colspan="5"></td>
            </tr>
          </tbody>
        </table>
        <div v-else class="my-2 italic">No tasks</div>
        <div class="flex gap-2 align-middle" @keyup.enter="add()">
          <input
            ref="refName"
            v-model="task.name"
            type="text"
            class="w-full input input-bordered input-sm p-4"
            placeholder="Task" />
        </div>
      </div>
      <div class="flex justify-between mt-2.5 -mb-2">
        <div>
          <button class="btn btn-sm" @click="print">
            <mdicon name="printer" size="20" />
          </button>
        </div>
        <div class="flex gap-2">
          <label
            :for="`modal-task-${props.id}`"
            class="btn btn-sm"
            @click="add()">
            Done
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDateFormat } from '@vueuse/core'
import { useDocumentStore } from '@/stores'
import { Project, Task } from '@/models/Project'

const props = defineProps(['id'])
const task = ref(new Task())
const { projects, set, save, update } = useDocumentStore()

const project = projects.find((p: Project) => p.id === props.id)
const refTable = ref()
const refName = ref()

const add = async () => {
  if (!task.value.name) return

  project.tasks.push(task.value)
  await update()
  task.value = new Task()

  refName.value.focus()
}

const edit = (t: Task) => {
  task.value = project.tasks.splice(project.tasks.indexOf(t), 1)[0]
}

const remove = async (task: Task) => {
  if (confirm('Are you sure?')) {
    project.tasks.splice(project.tasks.indexOf(task), 1)
    await update()
    refName.value.focus()
  }
}

const print = () => {
  const printWindow = window.open('')
  console.log(refTable.value.outerHTML)
  printWindow?.document.write(refTable.value.outerHTML)
  printWindow?.print()
  printWindow?.close()
}
</script>

<style scoped></style>
