<template>
  <div ref="content">
    <slot/>
  </div>
</template>

<script>
  const create = tag => document.createElement(tag);
  const containerClass = 'im-page-printer-container';
  const bodyClass = 'im-page-printer-body';
  const prop = 'print', event = `update:${prop}`;

  function doPrintHtml(
    html, {
      class: cls = 'im-page-printer-page',
      style = {}, ...css
    } = {}, hiddenError = false,
  ) {
    const container = create('div'), page = create('div'), body = document.body;
    container.classList.add(containerClass);

    page.classList.add(cls);
    const styles = {...style, ...css};
    for (let key in styles) {
      page.style[key] = styles[key];
    }

    const bodyClasses = body.classList;
    const notContainedHiddenOverflow = !bodyClasses.contains(bodyClass);
    if (notContainedHiddenOverflow) {
      bodyClasses.add(bodyClass);
    }

    return new Promise(done => {

      page.innerHTML = html;
      container.appendChild(page);
      body.appendChild(container);

      setTimeout(() => {
        const [...images] = document.querySelectorAll(`.${containerClass} img`);
        Promise.all(images.map(img => new Promise((resolve => {
          img.onload = resolve;
          img.onerror = () => {
            // 针对错误的一些处理
            if (hiddenError) {
              img.style.display = 'none !important;';
            }
            resolve();
          };
        })))).then(() => {
          window.print();
          body.removeChild(container);
          if (notContainedHiddenOverflow) {
            body.classList.remove(bodyClass);
          }
          done();
        });
      });
    });
  }

  function doPrintNode(node, pageStyle, hiddenError = true) {
    const type = typeof node;
    return doPrintHtml((node instanceof HTMLElement ? node.innerHTML
      : (type === 'function' ? node() : (type === 'string'
        ? node : node.$el.innerHTML))), pageStyle, hiddenError);
  }

  export const $printer = doPrintNode;

  export default {
    name: 'PagePrinter',
    model: {prop, event},
    props: {print: Boolean},
    watch: {
      print: {
        handler(now) {
          if (now) {
            doPrintNode(this.$refs.content).then(() => {
              this.$emit(event, false);
            });
          }
        },
        immediate: true,
      },
    },
  };
</script>
<style lang="scss">
  .im-page-printer-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #FFF;
    overflow: auto;
    z-index: 1000;

    &::-webkit-scrollbar {
      width: 1px;
    }

    /* 滚动槽 */
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      width: 10px;
    }

    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background: #FFF;
      -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.1);
    }

    &::-webkit-scrollbar-thumb:window-inactive {
      background: #FFF;
    }
  }

  .im-page-printer-page {
    margin: 0 auto;
    width: 720px;
  }

  .im-page-printer-body {
    overflow: hidden !important;
  }
</style>