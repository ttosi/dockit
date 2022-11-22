<template>
  <input type="checkbox" :id="`modal-task-${projectId}`" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box cursor-default">
      <div class="flex justify-between">
        <h3 class="text-sm font-semibold uppercase mb-2">
          <!-- Task List - {{ project.name }} -->
        </h3>
      </div>
      <hr />
      <div>
        <table
          ref="refTable"
          style="width: 100%"
          class="table table-compact w-full mt-2">
          <tbody>
            <tr
              v-for="task in projects.tasks"
              :style="task.completed ? 'text-decoration: line-through' : ''"
              :key="task">
              <td>
                <input
                  v-model="task.completed"
                  type="checkbox"
                  class="checkbox checkbox-sm mt-1"
                  @change="save()" />
              </td>
              <td class="w-full">
                <div>
                  {{ task.name }}
                </div>
              </td>
              <td>{{ useDateFormat(task.created, 'M/D/YYYY').value }}</td>
              <td>
                {{
                  task.completed
                    ? useDateFormat(task.completed, 'M/D/YYYY').value
                    : ''
                }}
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
        <div class="flex gap-2 align-middle" @keyup.enter="update()">
          <input
            ref="refName"
            v-model="task.name"
            type="text"
            class="w-full input input-bordered input-xs"
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
            :for="`modal-task-${projectId}`"
            class="btn btn-sm"
            @click="update()">
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
import { Task } from '@/models/Project'

const props = defineProps(['projectId'])
const task = ref(new Task())
const { projects, set, save } = useDocumentStore()

console.log(projects[props.projectId])
console.log('iiiiiiiiiii', props.projectId)
const refTable = ref()
const refName = ref()

// set(props.project)

const update = () => {
  if (!task.value.name) return
  refName.value.focus()

  projects.tasks.push(task.value)
  task.value = new Task()
  save()
}

const remove = (task: Task) => {
  if (confirm('Are you sure?')) {
    projects.tasks.splice(projects.tasks.indexOf(task), 1)
    refName.value.focus()
    save()
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
