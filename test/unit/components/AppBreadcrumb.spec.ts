import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing'

import AppBreadcrumb from '@/components/AppBreadcrumb.vue';

installQuasarPlugin();

describe('test AppBreadcrumb', () => {
  const createWrapper = () => {
    return mount(AppBreadcrumb, {
      props: {
        breadcrumbItems: [
          { label: 'Inicio' },
          { label: 'Hotéis' },
        ],
      },
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });
  };

  it('should mount component properly', () => {
    const wrapper = createWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
