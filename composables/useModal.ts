import {useModal as useVueFinalModal} from 'vue-final-modal';
import UiModal from '~/components/ui/ui-modal.vue';

// From vue
interface Constructor<P = any> {
  __isFragment?: never;
  __isTeleport?: never;
  __isSuspense?: never;
  new (...args: any[]): {
    $props: P;
  };
}

export const useModal = <C extends Constructor, MC extends Constructor = typeof UiModal>(
  {component, modalComponent}: {component: C; modalComponent?: MC},
  attrs: InstanceType<C>['$props'],
  modalAttrs?: InstanceType<MC>['$props'],
) => {
  const vfm = useVueFinalModal({
    component: modalComponent || UiModal,
    attrs: {
      onClose() {
        vfm.close();
      },
      ...modalAttrs,
    },
    slots: {
      default: {
        component,
        attrs,
      },
    },
  });

  return vfm;
};
