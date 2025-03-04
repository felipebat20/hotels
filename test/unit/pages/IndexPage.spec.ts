import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing'

import IndexPage from '@/pages/IndexPage.vue';

installQuasarPlugin();

describe('test IndexPage', () => {
  const createWrapper = () => {
    return mount(IndexPage, {
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
