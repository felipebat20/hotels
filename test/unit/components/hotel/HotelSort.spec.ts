import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing'

import HotelSort from '@/components/hotel/HotelSort.vue';

installQuasarPlugin();

describe('test HotelSort', () => {
  const createWrapper = () => {
    return mount(HotelSort, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });
  };

  it('should mount component properly', () => {
    const wrapper = createWrapper();
    const html = wrapper
      .html()
      .replace(/id="f_[^"]+"/g, 'id="static-id"')
      .replace(/for="f_[^"]+"/g, 'for="static-for"')
      .replace(/aria-controls="f_[^"]+"/g, 'aria-controls="static-aria-controls"')

    expect(html).toMatchSnapshot();
  });
});
