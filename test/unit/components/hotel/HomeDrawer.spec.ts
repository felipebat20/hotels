import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing'

import HomeDrawer from '@/components/hotel/HomeDrawer.vue';

import hotels_mocks from '@/data/hotel.json';

import type { HotelInterface } from 'src/interfaces/HotelInterface';

installQuasarPlugin();

describe('test HomeDrawer', () => {
  const createWrapper = ({ props = {} }: { props: { hotel?: HotelInterface } } = { props: {} }) => {
    return mount(HomeDrawer, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },

      props: {
        hotel: hotels_mocks[0]?.hotels[0],
        ...props,
      },
    });
  };

  it('should mount component properly', () => {
    const wrapper = createWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
