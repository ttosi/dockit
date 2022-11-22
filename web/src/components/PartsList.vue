<template>
  <div>
    <input type="checkbox" :id="`modal-parts-${id}`" class="modal-toggle" />
    <div class="modal m-3">
      <div class="modal-box cursor-default">
        <div class="flex justify-between">
          <h3 class="text-sm font-semibold uppercase mb-2">
            Parts List - {{ project.name }}
          </h3>
          <span>
            {{ formatCurrency(total) }}
          </span>
        </div>
        <hr />
        <div>
          <table
            v-if="project.parts.length > 0"
            ref="refTable"
            style="width: 100%"
            class="table table-compact w-full mt-2">
            <tbody>
              <tr v-for="part in project.parts" :key="part">
                <td>
                  <input
                    v-model="part.purchased"
                    type="checkbox"
                    class="checkbox checkbox-sm mt-1" />
                </td>
                <td>{{ part.quantity }}x</td>
                <td>
                  <div
                    :style="
                      part.purchased ? 'text-decoration: line-through' : ''
                    ">
                    {{ part.name }}
                  </div>
                </td>
                <td>{{ part.source }}</td>
                <td>{{ formatCurrency(part.cost) }}</td>
                <td class="cursor-pointer" @click="remove(part)">
                  <mdicon name="trash-can" size="16" />
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="my-2 italic">No parts</div>
          <hr class="mb-3 border-base-300" />
          <div class="flex gap-2 align-middle" @keyup.enter="update()">
            <input
              v-model="part.purchased"
              type="checkbox"
              class="mt-0.5 checkbox checkbox-sm" />
            <input
              v-model="part.quantity"
              ref="refQuantity"
              type="number"
              class="input input-bordered input-xs w-10"
              placeholder="Qty" />
            <input
              v-model="part.name"
              type="text"
              class="input input-bordered input-xs"
              placeholder="Part" />
            <input
              v-model="part.source"
              type="text"
              class="input input-bordered input-xs"
              placeholder="Source" />
            <input
              v-model="part.cost"
              type="number"
              class="input input-bordered input-xs w-10"
              placeholder="Cost" />
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
              :for="`modal-parts-${id}`"
              class="btn btn-sm"
              @click="update()">
              Done
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDocumentStore } from '@/stores'
import { Part, Project } from '@/models/Project'

const props = defineProps(['id'])
const part = ref(new Part())
const { projects, set, save } = useDocumentStore()

const project = projects.find((p: Project) => p.id === props.id)
const refTable = ref()
const refQuantity = ref()

const update = () => {
  if (!part.value.name) return

  project.parts.push(part.value)
  set(project)
  save()

  part.value = new Part()
  refQuantity.value.focus()
}

const remove = (part: Part) => {
  if (confirm('Are you sure?')) {
    project.parts.splice(project.parts.indexOf(part), 1)
    set(project)
    save()

    refQuantity.value.focus()
  }
}

const formatCurrency = (val: number) => {
  return val.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

const total = computed(() => {
  if (project.parts.length > 0) {
    return project.parts.reduce((a: number, c: Part) => a + c?.cost, 0)
  }
  return 0
})

const print = () => {
  const printWindow = window.open('')
  printWindow?.document.write(refTable.value.outerHTML)
  printWindow?.print()
  printWindow?.close()
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
  margin: 0;
}
</style>
