import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppHeader from '@/components/AppHeader.vue';

installQuasarPlugin();

describe('AppHeader', () => {
  const createWrapper = () => {
    return mount(AppHeader);
  };

  it('should render component properly', () => {
    const wrapper = createWrapper();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should display logo image', () => {
    const wrapper = createWrapper();
    const logo = wrapper.find('img');
    expect(logo.exists()).toBe(true);
  });

  it('should have correct logo width style', () => {
    const wrapper = createWrapper();
    const logo = wrapper.find('img');
    expect(logo.attributes('style')).toContain('width: 200px');
  });
});
