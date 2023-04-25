/**
 * @param {object} config
 * @param {object} config.siteId
 * @param {boolean} config.isProd
 */
function init(config) {
  if (!config.isProd) return;
  if (!config.siteId) return;
  let script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = `https://tools.luckyorange.com/core/lo.js?site-id=${config.siteId}`;
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
    init(options);
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
