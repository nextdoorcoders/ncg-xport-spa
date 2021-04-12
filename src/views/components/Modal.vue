<script>
import Bus from './../../scripts/service/utils/bus'

export default {
  data() {
    return {
      modals: []
    }
  },
  computed: {
    $last() {
      return this.modals.length - 1
    },
    body() {
      if (typeof document !== 'undefined') {
        return document.querySelector('body')
      }
    }
  },
  created() {
    Bus.$on('new', instance => {
      this.modals.push(instance)

      this.body && this.body.classList.add('modal-open')
    })

    Bus.$on('close', index => {
      if (index === null) {
        index = this.$last
      }

      this.close(index)
    })
  },
  methods: {
    splice(index = null) {
      if (index === -1) {
        return
      }

      if (!this.modals.length) {
        return
      }

      if (index === null) {
        this.modals.pop()
      } else {
        this.modals.splice(index, 1)
      }

      if (!this.modals.length) {
        this.body && this.body.classList.remove('modal-open')
      }
    },
    doClose(index) {
      if (!this.modals.length) {
        return
      }

      if (!this.modals[index]) {
        return
      }

      this.splice(index)
    },
    close(index = null) {
      let localIndex = index

      if (index && typeof index === 'function') {
        localIndex = index(this.$last)
      }

      if (typeof localIndex !== 'number') {
        localIndex = this.$last
      }

      this.doClose(localIndex)
    }
  },
  render(h) {
    if (!this.modals.length) {
      return null
    }

    let modals = this.modals.map((modal, index) => {
      return h('div', {
        class: [
          'modal-dialog',
          // Запрет открытия модалок поверх модалок
          index !== this.$last ? 'modal-dialog-hide' : null,
          modal.cssClass
        ],
        key: index
      }, [
        h(modal.component, {
          props: modal.props,
          on: modal.on
        })
      ])
    })

    return h('div', {
      class: 'modal fade show'
    }, modals)
  }
}
</script>

<style lang="scss">
.modal-open .modal {
  display: block;
  background: rgba(0, 0, 0, 0.2);
}
.modal-dialog-hide {
  display: none;
}
</style>
