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
        <span style="color: red" onClick={this.clickFn}>abcd的d</span>
        <Demo></Demo>
      </div>
    );
  },
};