import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing'

import AppHeader from '@/components/AppHeader.vue';

installQuasarPlugin();

describe('test AppHeader', () => {
  const createWrapper = () => {
    return mount(AppHeader, {
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
