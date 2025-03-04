import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing'

import { usePlacesStore } from 'src/stores/usePlacesStore';

import IndexPage from '@/pages/IndexPage.vue';
import HotelSearch from 'src/components/hotel/HotelSearch.vue';

import hotel from '@/data/hotel.json';
import HotelCardsContainer from 'src/components/hotel/HotelCardsContainer.vue';

installQuasarPlugin();

describe('IndexPage', () => {
  const createWrapper = () => {
    const wrapper = mount(IndexPage, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            places: {
              places: [
                { name: 'São Paulo', state: { name: 'SP' }, placeId: 1 }
              ]
            }
          }
        })],
        stubs: {
          HotelSearch: true,
          HotelSort: true,
          HotelCardsContainer: true,
          AppBreadcrumb: true,
          HomeDrawer: true
        }
      },
    });

    const placesStore = usePlacesStore();
    return { wrapper, placesStore };
  };

  it('should render component properly', () => {
    const { wrapper } = createWrapper();
    const html = wrapper
      .html()
      .replace(/id="f_[^"]+"/g, 'id="static-id"')
      .replace(/for="f_[^"]+"/g, 'for="static-for"')
      .replace(/aria-controls="f_[^"]+"/g, 'aria-controls="static-aria-controls"');

    expect(html).toMatchSnapshot();
  });

  it('should fetch places on mount', () => {
    const { placesStore } = createWrapper();

    expect(placesStore.fetchPlaces).toHaveBeenCalledTimes(1);
  });

  it('should include HotelSearch component', () => {
    const { wrapper } = createWrapper();

    expect(wrapper.findComponent(HotelSearch).exists()).toBe(true);
  });

  it('should include HotelSort component', () => {
    const { wrapper } = createWrapper();

    expect(wrapper.findComponent(HotelSearch).exists()).toBe(true);
  });

  it('should include HotelCardsContainer component', () => {
    const { wrapper } = createWrapper();

    expect(wrapper.findComponent(HotelCardsContainer).exists()).toBe(true);
  });

  it('should open drawer when hotel is selected', () => {
    const { wrapper } = createWrapper();

    wrapper.findComponent(HotelCardsContainer).vm.$emit('set-selected-hotel', hotel[0]?.hotels[0]);

    expect(wrapper.vm.drawer_right).toBe(true);
  });
});
