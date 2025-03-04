import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import HotelCard from '@/components/hotel/HotelCard.vue';

import type { HotelInterface } from 'src/interfaces/HotelInterface';

import hotel from '@/data/hotel.json';

installQuasarPlugin();

describe('layout example', () => {
  const createWrapper = ({ props = {} }: { props: { hotel?: HotelInterface } } = { props: {} }) => {
    return mount(HotelCard, {
      props: {
        hotel: hotel[0]?.hotels[0],
        ...props,
      },
    });
  };

  it('should mount component properly', () => {
    const wrapper = createWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
