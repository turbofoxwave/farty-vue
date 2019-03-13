import { shallowMount } from '@vue/test-utils';
import Farty from '@/components/Farty.vue';

describe('Farty.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Farty, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
