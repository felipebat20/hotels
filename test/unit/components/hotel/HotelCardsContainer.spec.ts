import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing'

import { useHotelsStore } from 'src/stores/useHotelsStore';

import HotelCardsContainer from 'src/components/hotel/HotelCardsContainer.vue';
import HotelCard from 'src/components/hotel/HotelCard.vue';

import type { HotelInterface } from 'src/interfaces/HotelInterface';

import hotel from '@/data/hotel.json';

installQuasarPlugin();

describe('HotelCardsContainer', () => {
  const createWrapper = (initialState = {}) => {
    const wrapper = mount(HotelCardsContainer, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            hotels: {
              hotels: [],
              control_flow: {
                request_pending: false,
                has_next_page: true
              },
              ...initialState
            }
          }
        })],
        stubs: {
          HotelCard: true
        }
      },
    });

    const store = useHotelsStore();
    return { wrapper, store };
  };

  it('should render component properly', () => {
    const { wrapper } = createWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should display loading spinner when request is pending', () => {
    const { wrapper, store } = createWrapper();
    store.control_flow.request_pending = true;

    expect(wrapper.find('.q-spinner').exists()).toBe(true);
  });

  it('should display no hotels message when hotels array is empty', () => {
    const { wrapper } = createWrapper();

    expect(wrapper.text()).toContain('Nenhum hotel encontrado');
  });

  it('should render hotel cards when hotels are available', () => {
    const wrapper = mount(HotelCardsContainer, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            hotels: {
              hotels: hotel[0]?.hotels,
              control_flow: {
                request_pending: false,
                has_next_page: true
              },
            }
          }
        })],
        stubs: {
          HotelCard: true
        }
      },
    });

    expect(wrapper.findComponent(HotelCard).exists()).toBe(true);
  });

  it('should emit event when hotel is clicked', () => {
    const wrapper = mount(HotelCardsContainer, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            hotels: {
              hotels: hotel[0]?.hotels,
              control_flow: {
                request_pending: false,
                has_next_page: true
              },
            }
          }
        })],
        stubs: {
          HotelCard: true
        }
      },
    });

    wrapper.findComponent(HotelCard).vm.$emit('set-selected-hotel', hotel[0]?.hotels[0]);

    expect(wrapper.emitted('set-selected-hotel')).toBeTruthy();
  });
});

