<template>
  <form class="mt-7" @submit.prevent="createOrEditTask()">
    <div>
      <vee-field
        ref="titleInput"
        class="input"
        :class="{'is-invalid': formErrors.title}"
        name="title"
        type="text"
        placeholder="Заголовок"
        :validate-on-input="formMeta.touched"
        v-bind="FORM_VALIDATORS.title"
      ></vee-field>
      <div class="mt-1 text-xs text-danger">{{ formErrors.title }}</div>
    </div>
    <div class="mt-2.5">
      <vee-field
        as="textarea"
        class="input"
        :class="{'is-invalid': formErrors.text}"
        name="text"
        placeholder="Текст"
        :validate-on-input="formMeta.touched"
        v-bind="FORM_VALIDATORS.text"
      ></vee-field>
      <div class="mt-1 text-xs text-danger">{{ formErrors.text }}</div>
    </div>
    <div class="mt-2.5">
      <vue-date-picker
        v-model="expDate"
        class="date-picker"
        position="right"
        locale="ru-RU"
        :min-date="new Date(0)"
        arrow-navigation
        auto-apply
        :enable-time-picker="false"
        @update:model-value="
          setFieldValue('expDate', formatDateRu($event));
          validateField('expDate');
        "
      >
        <template #trigger>
          <vee-field
            class="input pr-10"
            :class="{'is-invalid': formErrors.expDate}"
            name="expDate"
            type="text"
            placeholder="Дата окончания"
            :validate-on-input="formMeta.touched"
            @click.stop
            @update:model-value="expDate = parseRuDate($event)"
          ></vee-field>
          <button
            class="absolute bottom-0 right-0 top-0 px-3 text-neutral-500 duration-150 hover:text-neutral-400"
          >
            <calendar-icon class="w-4"></calendar-icon>
          </button>
        </template>
        <template #action-extra="{selectCurrentDate}">
          <button class="dp__btn" type="button" @click="selectCurrentDate()">Сегодня</button>
        </template>
      </vue-date-picker>
      <div class="mt-1 text-xs text-danger">{{ formErrors.expDate }}</div>
    </div>
    <button
      class="mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg border-none p-4 text-sm font-bold text-neutral-50"
      :class="{
        'bg-primary-dark duration-150 hover:bg-primary active:translate-y-0.5': !isFormInvalid,
        'cursor-not-allowed bg-neutral-500': isFormInvalid,
      }"
      :disabled="isFormInvalid"
      @click="createOrEditTask()"
    >
      <span class="pb-0.5 leading-4">{{ taskToEdit ? 'Обновить' : 'Создать' }}</span>
      <plus-icon v-if="!taskToEdit" class="w-4"></plus-icon>
    </button>
  </form>
</template>

<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/zod';
import VueDatePicker from '@vuepic/vue-datepicker';
import {format as formatDate, parse as parseDate} from 'date-fns';
import {Field as VeeField, useForm} from 'vee-validate';
import {z} from 'zod';
import {computed, onMounted, ref} from '#imports';
import {useTaskStore} from '~/stores/task.store';
import {PropType, Task, TaskData} from '~/types';
import CalendarIcon from '~icons/_/calendar.svg';
import PlusIcon from '~icons/_/plus.svg';

const props = defineProps({
  taskToEdit: {type: Object as PropType<Task>, required: false, default: null},
});
const emit = defineEmits<{
  (e: 'success', task: Task): void;
}>();

const FORM_VALIDATORS = {
  title: {maxlength: 100},
  text: {minlength: 3, maxlength: 500},
} as const;

const DATE_FORMAT_RU = 'dd.MM.yyyy';
const parseRuDate = (date: string): Date => parseDate(date, DATE_FORMAT_RU, new Date());
const formatDateRu = (date: Date): string => formatDate(date, DATE_FORMAT_RU);

const FORM_SCHEMA = z.object({
  title: z
    .string()
    .trim()
    .nonempty('Это поле обязательно')
    .max(FORM_VALIDATORS.title.maxlength, 'Заголовок слишком длинный'),
  text: z
    .string()
    .trim()
    .nonempty('Это поле обязательно')
    .min(FORM_VALIDATORS.text.minlength, 'Текст слишком короткий')
    .max(FORM_VALIDATORS.text.maxlength, 'Текст слишком длинный'),
  expDate: z
    .string()
    .trim()
    .superRefine((value, ctx) => {
      if (!value) {
        ctx.addIssue({code: z.ZodIssueCode.custom, message: 'Выберите дату окончания'});
      }
      const date = parseRuDate(value);
      if (Number.isNaN(date.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Неподдерживаемый формат даты (используйте ДД.ММ.ГГГГ)',
        });
      }
      if (date.getTime() < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Пожалуйста, выберите более позднюю дату',
        });
      }
    }),
});

const taskStore = useTaskStore();

const titleInput = ref<HTMLInputElement | null>(null);
onMounted(() => {
  titleInput.value?.focus?.();
});

const expDate = ref<Date | null>(
  props.taskToEdit?.exp ? new Date(props.taskToEdit.exp * 1000) : null,
);

const {
  handleSubmit,
  errors: formErrors,
  meta: formMeta,
  setFieldValue,
  validateField,
} = useForm({
  validationSchema: toTypedSchema(FORM_SCHEMA),
  initialValues: {
    title: props.taskToEdit?.title || '',
    text: props.taskToEdit?.text || '',
    expDate: expDate.value ? formatDateRu(expDate.value) : '',
  },
});

const isLoading = ref(false);
const isFormInvalid = computed(() => !formMeta.value.valid || isLoading.value);

const createOrEditTask = handleSubmit(async (values) => {
  if (isFormInvalid.value) {
    return;
  }

  const taskUpdate: TaskData = {
    title: values.title,
    text: values.text,
    exp: Math.round(parseRuDate(values.expDate).getTime() / 1000),
    completed: props.taskToEdit?.completed ?? false,
  };

  isLoading.value = true;
  try {
    const newTask = await (props.taskToEdit
      ? taskStore.editTask(props.taskToEdit.id, taskUpdate)
      : taskStore.createTask(taskUpdate));
    if (newTask) {
      emit('success', newTask);
    }
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.input {
  @apply w-full rounded-lg border border-neutral-950 bg-neutral-800 px-4 py-2 text-sm text-white;

  & .is-invalid {
    @apply border-danger;
  }
}
</style>
