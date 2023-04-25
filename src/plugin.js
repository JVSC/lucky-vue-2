/**
 * @param {string} id
 * @param {object} config
 * @param {boolean} config.isProd
 */
function init(id, config) {
  if (!config.isProd) return;
  if (!id) return;
  let script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = `https://tools.luckyorange.com/core/lo.js?site-id=${id}`;
  document.head.appendChild(script);
  window.LOQ = window.LOQ || [];
  window.LOQ.push([
    'ready',
    async (LO) => {
      // Track an event
      await LO.$internal.ready('events');
      // Or, identify a visitor
      await LO.$internal.ready('visitor');
    },
  ]);
}

function identify(identifier, options) {
  if (!window.LO) return;
  const LO = window.LO;
  LO.visitor.identify(identifier, options);
}

function track(event, options) {
  if (!window.LO) return;
  const LO = window.LO;
  LO.events.track(event, options);
}

const LuckyPlugin = {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options) {
    init();
    Vue.prototype.$lo = {
      identify,
      track,
    };
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(LuckyPlugin)
}

export default LuckyPlugin;
