import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing'

import HotelCardsContainer from '@/components/hotel/HotelCardsContainer.vue';

installQuasarPlugin();

describe('test HotelCardsContainer', () => {
  const createWrapper = () => {
    return mount(HotelCardsContainer, {
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
