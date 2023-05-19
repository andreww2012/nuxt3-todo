import type {z} from 'zod';
import {Task} from '~/services/schemas';

// eslint-disable-next-line import/no-extraneous-dependencies
export type {PropType} from 'vue';

export type Task = z.infer<typeof Task>;
