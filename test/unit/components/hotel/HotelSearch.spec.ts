import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing'
import { useHotelsStore } from 'src/stores/useHotelsStore';
import { usePlacesStore } from 'src/stores/usePlacesStore';

import HotelSearch from '@/components/hotel/HotelSearch.vue';

import type { VueWrapper } from '@vue/test-utils';

installQuasarPlugin();

describe('HotelSearch', () => {
  let wrapper: VueWrapper<InstanceType<typeof HotelSearch>>;
  let hotelsStore: ReturnType<typeof useHotelsStore>;
  let placesStore: ReturnType<typeof usePlacesStore>;

  const createWrapper = () => {
    const wrapper = mount(HotelSearch, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            places: {
              places: [
                { name: 'São Paulo', state: { name: 'SP' }, placeId: '1' },
                { name: 'Rio de Janeiro', state: { name: 'RJ' }, placeId: '2' }
              ]
            }
          }
        })],
      },
    });

    hotelsStore = useHotelsStore();
    placesStore = usePlacesStore();

    return wrapper;
  };

  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('should render component properly', () => {
    const html = wrapper
      .html()
      .replace(/id="f_[^"]+"/g, 'id="static-id"')
      .replace(/for="f_[^"]+"/g, 'for="static-for"')
      .replace(/aria-controls="f_[^"]+"/g, 'aria-controls="static-aria-controls"');

    expect(html).toMatchSnapshot();
  });

  it('should display "Buscar" initially on the button', () => {
    const button = wrapper.find('button');
    expect(button.text()).toBe('Buscar');
  });

  it('should display "Alterar busca" when a hotel is selected', async () => {
    await wrapper.find('input[placeholder="Nome do Hotel"]').setValue('Hotel Teste');
    const button = wrapper.find('button');
    expect(button.text()).toBe('Alterar busca');
  });

  it('should call fetchHotels when search button is clicked', async () => {
    await wrapper.find('input[placeholder="Nome do Hotel"]').setValue('Hotel Teste');
    await wrapper.find('button').trigger('click');

    expect(hotelsStore.fetchHotels).toHaveBeenCalledTimes(1);
  });

  it('should filter places correctly when typing in search', async () => {
    const select = wrapper.findComponent({ name: 'q-select' });
    await select.vm.$emit('filter', 'São', (callback: () => void) => callback());
    const filteredPlaces = wrapper.vm.filteredPlaces;

    expect(filteredPlaces.length).toBe(1);
  });

  it('should clear hotels list when starting a new search', async () => {
    await wrapper.find('input[placeholder="Nome do Hotel"]').setValue('Hotel Teste');
    await wrapper.find('button').trigger('click');
    expect(hotelsStore.hotels).toEqual([]);
  });
});
