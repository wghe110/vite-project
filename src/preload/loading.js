import loadingSrc from '@p/loading.gif'

// loading
const createLoading = () => {
  const ele = document.createElement('div')
  ele.setAttribute('style', `
    display: none;
    align-items: center;
    position: fixed;
    left: 50%;
    top: 10px;
    background: #fff;
    border-radius: 4px;
    padding: 6px 14px;
  `)

  const img = document.createElement('img');
  img.src = loadingSrc
  img.setAttribute('style', `
    width: 20px;
    margin-right: 8px
  `)
  const span = document.createElement('span')
  span.innerHTML = '加载中...'

  ele.appendChild(img)
  ele.appendChild(span)
  document.body.appendChild(ele);

  return {
    show() {
      ele.style.display = 'flex'
    },
    hide() {
      ele.style.display = 'none'
    }
  }
}

export default createLoading
