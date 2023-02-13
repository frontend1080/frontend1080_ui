/* import { triggerEvent } from '../util'
import DYMessage from '@/components/dy-message'

describe('Message', () => {
  afterEach(() => {
    const el = document.querySelector('.el-message')
    if (!el) return
    if (el.parentNode) {
      el.parentNode.removeChild(el)
    }
    if (el.__vue__) {
      el.__vue__.$destroy()
    }
  })

  it('automatically close', done => {
    DYMessage({
      message: '灰风',
      duration: 500
    })
    const message = document.querySelector('.el-message__content')
    // eslint-disable-next-line no-unused-expressions
    expect(document.querySelector('.el-message')).to.exist
    expect(message.textContent).to.equal('灰风')
    setTimeout(() => {
      // eslint-disable-next-line no-unused-expressions
      expect(document.querySelector('.el-message')).to.not.exist
      done()
    }, 1000)
  })

  it('manually close', done => {
    DYMessage({
      message: '夏天',
      showClose: true
    })
    setTimeout(() => {
      document.querySelector('.el-message__closeBtn').click()
      setTimeout(() => {
        // eslint-disable-next-line no-unused-expressions
        expect(document.querySelector('.el-message')).to.not.exist
        done()
      }, 500)
    }, 500)
  })

  it('custom icon', done => {
    DYMessage({
      message: '夏天',
      iconClass: 'el-icon-close'
    })
    setTimeout(() => {
      const icon = document.querySelector('.el-message i')
      // eslint-disable-next-line no-unused-expressions
      expect(icon.classList.contains('el-icon-close')).to.true
      done()
    }, 500)
  })

  it('html string', () => {
    DYMessage({
      message: '<strong>夏天</strong>',
      dangerouslyUseHTMLString: true
    })
    const message = document.querySelector('.el-message strong')
    expect(message.textContent).to.equal('夏天')
  })

  it('close all', done => {
    DYMessage({
      message: '夏天',
      duration: 0
    })
    DYMessage({
      message: '淑女',
      duration: 0
    })
    setTimeout(() => {
      DYMessage.closeAll()
      setTimeout(() => {
        // eslint-disable-next-line no-unused-expressions
        expect(document.querySelector('.el-message')).to.not.exist
        done()
      }, 500)
    }, 500)
  })

  it('create', () => {
    DYMessage('娜梅莉亚')
    // eslint-disable-next-line no-unused-expressions
    expect(document.querySelector('.el-message')).to.exist
  })

  it('invoke with type', () => {
    DYMessage.success('毛毛狗')
    expect(document.querySelector('.el-message').__vue__.type).to.equal('success')
  })

  it('center', () => {
    DYMessage({
      message: '夏天',
      center: true,
      duration: 0
    })
    // eslint-disable-next-line no-unused-expressions
    expect(document.querySelector('.el-message').classList.contains('is-center')).to.true
  })

  it('reset timer', done => {
    DYMessage({
      message: '白灵',
      duration: 1000
    })
    setTimeout(() => {
      triggerEvent(document.querySelector('.el-message'), 'mouseenter')
      setTimeout(() => {
        // eslint-disable-next-line no-unused-expressions
        expect(document.querySelector('.el-message')).to.exist
        done()
      }, 700)
    }, 500)
  })
})
 */
