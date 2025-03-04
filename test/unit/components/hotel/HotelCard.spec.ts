import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import HotelCard from '@/components/hotel/HotelCard.vue';

import type { HotelInterface } from 'src/interfaces/HotelInterface';

import hotel from '@/data/hotel.json';

installQuasarPlugin();

describe('HotelCard', () => {
  const createWrapper = ({ props = {} }: { props: { hotel?: HotelInterface } } = { props: {} }) => {
    return mount(HotelCard, {
      props: {
        hotel: hotel[0]?.hotels[0],
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
    const hotelName = wrapper.find('.text-h5');

    expect(hotelName.text()).toBe(hotel[0]?.hotels[0]?.name);
  });

  it('should display hotel address correctly', () => {
    const wrapper = createWrapper();
    const address = wrapper.find('.text-grey-6');

    expect(address.text()).toBe(hotel[0]?.hotels[0]?.address.fullAddress);
  });

  it('should display correct hotel price', () => {
    const wrapper = createWrapper();
    const price = wrapper.findAll('.text-h5').at(1);

    expect(price?.text()).toBe(wrapper.vm.getHotelPrice);
  });

  it('should emit event when select button is clicked', async () => {
    const wrapper = createWrapper();
    await wrapper.findAll('button').at(2)?.trigger('click');

    expect(wrapper.emitted('set-selected-hotel')).toBeTruthy();
  });
});
