import Demo from './demo.vue'

export default {
  name: 'demo-com',
  methods: {
    clickFn() {
      alert('clicked')
    }
  },
  render(h) {
    return (
      <div>
        <span style="color: red" on-click={
          this.clickFn
        }>abc</span>
        <Demo></Demo>
      </div>
    );
  },
};