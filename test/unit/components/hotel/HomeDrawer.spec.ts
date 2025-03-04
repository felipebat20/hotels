import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing'

import HomeDrawer from '@/components/hotel/HomeDrawer.vue';

import hotels_mocks from '@/data/hotel.json';

import type { HotelInterface } from 'src/interfaces/HotelInterface';

installQuasarPlugin();

describe('HomeDrawer', () => {
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

  it('should render component properly', () => {
    const wrapper = createWrapper();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should display hotel name correctly', () => {
    const wrapper = createWrapper();
    const hotelName = wrapper.find('.text-h4');
    expect(hotelName.text()).toBe(hotels_mocks[0]?.hotels[0]?.name);
  });

  it('should display hotel address correctly', () => {
    const wrapper = createWrapper();
    const address = wrapper.find('.text-grey-6');
    expect(address.text()).toBe(hotels_mocks[0]?.hotels[0]?.address.fullAddress);
  });

  it('should display correct number of amenities initially', () => {
    const wrapper = createWrapper();
    const amenities = wrapper.findAll('.grid span');
    expect(amenities.length).toBeLessThanOrEqual(4);
  });
});

