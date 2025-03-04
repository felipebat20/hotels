import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing'

import HotelSort from '@/components/hotel/HotelSort.vue';
import { useHotelsStore } from 'src/stores/useHotelsStore';

installQuasarPlugin();

describe('HotelSort', () => {
  const createWrapper = () => {
    const wrapper = mount(HotelSort, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    });

    const store = useHotelsStore();
    return { wrapper, store };
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

  it('should display "Recomendados" as default sort option', () => {
    const { wrapper } = createWrapper();
    const selectedSort = wrapper.find('.text-blue');

    expect(selectedSort.text()).toBe('Recomendados');
  });

  it('should call fetchHotels when sort option changes', async () => {
    const { wrapper, store } = createWrapper();
    await wrapper.findComponent({ name: 'q-select' }).vm.$emit('update:modelValue', { value: 'best_rated' });

    expect(store.fetchHotels).toHaveBeenCalledTimes(1);
  });

  it('should clear hotels array when changing sort', async () => {
    const { wrapper, store } = createWrapper();
    await wrapper.findComponent({ name: 'q-select' }).vm.$emit('update:modelValue', { value: 'best_rated' });

    expect(store.hotels).toEqual([]);
  });
});
