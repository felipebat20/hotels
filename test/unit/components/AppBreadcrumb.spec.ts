import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppBreadcrumb from '@/components/AppBreadcrumb.vue';

installQuasarPlugin();

describe('AppBreadcrumb', () => {
  const createWrapper = (breadcrumbItems = [{ label: 'Home' }, { label: 'Hotels' }]) => {
    return mount(AppBreadcrumb, {
      props: {
        breadcrumbItems,
      },
    });
  };

  it('should render component properly', () => {
    const wrapper = createWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should display correct number of breadcrumb items', () => {
    const wrapper = createWrapper();
    const items = wrapper.findAll('.q-breadcrumbs__el');

    expect(items.length).toBe(2);
  });

  it('should display correct text for each breadcrumb item', () => {
    const wrapper = createWrapper();
    const firstItem = wrapper.find('.q-breadcrumbs__el');

    expect(firstItem.text()).toBe('Home');
  });
});
