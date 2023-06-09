var je = Object.create;
var U = Object.defineProperty,
  Le = Object.defineProperties,
  Fe = Object.getOwnPropertyDescriptor,
  Ae = Object.getOwnPropertyDescriptors,
  Ne = Object.getOwnPropertyNames,
  F = Object.getOwnPropertySymbols,
  Oe = Object.getPrototypeOf,
  q = Object.prototype.hasOwnProperty,
  re = Object.prototype.propertyIsEnumerable;
var te = (e, t, r) =>
    t in e
      ? U(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (e[t] = r),
  v = (e, t) => {
    for (var r in t || (t = {})) q.call(t, r) && te(e, r, t[r]);
    if (F) for (var r of F(t)) re.call(t, r) && te(e, r, t[r]);
    return e;
  },
  S = (e, t) => Le(e, Ae(t)),
  n = (e, t) => U(e, 'name', { value: t, configurable: !0 });
var T = (e, t) => {
  var r = {};
  for (var o in e) q.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
  if (e != null && F)
    for (var o of F(e)) t.indexOf(o) < 0 && re.call(e, o) && (r[o] = e[o]);
  return r;
};
var Ke = (e, t) => {
    for (var r in t) U(e, r, { get: t[r], enumerable: !0 });
  },
  ne = (e, t, r, o) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let s of Ne(t))
        !q.call(e, s) &&
          s !== r &&
          U(e, s, {
            get: () => t[s],
            enumerable: !(o = Fe(t, s)) || o.enumerable,
          });
    return e;
  };
var k = (e, t, r) => (
    (r = e != null ? je(Oe(e)) : {}),
    ne(
      t || !e || !e.__esModule
        ? U(r, 'default', { value: e, enumerable: !0 })
        : r,
      e,
    )
  ),
  Ve = (e) => ne(U({}, '__esModule', { value: !0 }), e);
var xt = {};
Ke(xt, {
  ChainId: () => V.ChainId,
  IpfsStorage: () => V.IpfsStorage,
  MediaRenderer: () => O,
  ThirdwebNftMedia: () => bt,
  ThirdwebProvider: () => Ge,
  Unstable_NftMedia: () => gt,
  defaultChains: () => I.defaultChains,
  defaultL2Chains: () => I.defaultL2Chains,
  useAccount: () => I.useAccount,
  useAddress: () => it,
  useChainId: () => B,
  useCoinbaseWallet: () => lt,
  useConnect: () => M,
  useContract: () => x,
  useDesiredChainId: () => j,
  useDisconnect: () => ot,
  useEdition: () => Ye,
  useEditionDrop: () => Be,
  useMarketplace: () => Qe,
  useMetamask: () => st,
  useNFTCollection: () => Ze,
  useNFTDrop: () => Je,
  useNetwork: () => I.useNetwork,
  useNetworkMismatch: () => ut,
  useNftTokenMetadata: () => _e,
  usePack: () => et,
  useReadonlySDK: () => at,
  useResolvedMediaType: () => Z,
  useSDK: () => _,
  useSigner: () => H,
  useSplit: () => nt,
  useToken: () => tt,
  useVote: () => rt,
  useWalletConnect: () => ct,
  useWalletLink: () => be,
});
module.exports = Ve(xt);
var qe = {
    mainnet: {
      id: 1,
      name: 'Mainnet',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrls: [
        'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      ],
      blockExplorers: [{ name: 'Etherscan', url: 'https://etherscan.io' }],
    },
    rinkeby: {
      id: 4,
      name: 'Rinkeby',
      nativeCurrency: { name: 'Rinkeby Ether', symbol: 'rETH', decimals: 18 },
      rpcUrls: [
        'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      ],
      blockExplorers: [
        { name: 'Etherscan', url: 'https://rinkeby.etherscan.io' },
      ],
      testnet: !0,
    },
    goerli: {
      id: 5,
      name: 'Goerli',
      nativeCurrency: { name: 'Goerli Ether', symbol: 'gETH', decimals: 18 },
      rpcUrls: ['https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
      blockExplorers: [
        { name: 'Etherscan', url: 'https://goerli.etherscan.io' },
      ],
      testnet: !0,
    },
    polygonMainnet: {
      id: 137,
      name: 'Polygon Mainnet',
      nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
      rpcUrls: [
        'https://polygon-rpc.com',
        'https://rpc-mainnet.matic.network',
        'https://matic-mainnet.chainstacklabs.com',
        'https://rpc-mainnet.maticvigil.com',
        'https://rpc-mainnet.matic.quiknode.pro',
        'https://matic-mainnet-full-rpc.bwarelabs.com',
      ],
      blockExplorers: [{ name: 'Polygonscan', url: 'https://polygonscan.com' }],
    },
    tlChain: {
      id: 1221,
      name: 'TLChain Mainnet',
      nativeCurrency: { name: 'TLChain', symbol: 'TLC', decimals: 18 },
      rpcUrls: ['https://mainnet-rpc.tlchain.live/'],
      blockExplorers: [
        { name: 'TLXScan', url: 'https://explorer.tlchain.live/' },
      ],
    },
    polygonTestnetMumbai: {
      id: 80001,
      name: 'Polygon Testnet Mumbai',
      nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
      rpcUrls: [
        'https://matic-mumbai.chainstacklabs.com',
        'https://rpc-mumbai.maticvigil.com',
        'https://matic-testnet-archive-rpc.bwarelabs.com',
      ],
      blockExplorers: [
        { name: 'Polygonscan', url: 'https://mumbai.polygonscan.com' },
      ],
      testnet: !0,
    },
    avalanche: {
      id: 43114,
      name: 'Avalanche',
      nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
      rpcUrls: [
        'https://api.avax.network/ext/bc/C/rpc',
        'https://rpc.ankr.com/avalanche',
      ],
      blockExplorers: [{ name: 'SnowTrace', url: 'https://snowtrace.io/' }],
      testnet: !1,
    },
    fantom: {
      id: 250,
      name: 'Fantom Opera',
      nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
      rpcUrls: ['https://rpc.ftm.tools'],
      blockExplorerUrls: [{ name: 'FTMScan', url: 'https://ftmscan.com/' }],
      testnet: !1,
    },
  },
  z = Object.values(qe);
var ie = require('ethers'),
  D = require('react'),
  W = require('wagmi');
function H() {
  var g, b, h, y, a;
  let [e, t] = (0, W.useSigner)(),
    [r] = (0, W.useAccount)(),
    [o] = (0, W.useNetwork)(),
    s = (0, D.useRef)(null),
    p = (g = r.data) == null ? void 0 : g.address,
    u = (b = o.data.chain) == null ? void 0 : b.id,
    d = oe((h = r.data) == null ? void 0 : h.address),
    f = oe(
      (a = (y = o.data) == null ? void 0 : y.chain) == null ? void 0 : a.id,
    );
  return (
    (0, D.useEffect)(() => {
      if (p !== d || u !== f)
        if (s.current)
          s.current = t().finally(() => {
            s.current = null;
          });
        else return;
    }, [p, u, d, f]),
    ie.Signer.isSigner(e.data) ? e.data : void 0
  );
}
n(H, 'useSigner');
function oe(e) {
  let t = (0, D.useRef)();
  return (
    (0, D.useEffect)(() => {
      t.current = e;
    }, [e]),
    t.current
  );
}
n(oe, 'usePrevious');
var ae = require('@thirdweb-dev/sdk'),
  w = k(require('react')),
  G = k(require('tiny-invariant')),
  A = require('wagmi'),
  se = require('wagmi/connectors/injected'),
  ce = require('wagmi/connectors/walletConnect'),
  le = require('wagmi/connectors/walletLink');
function $() {
  return (
    ($ =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var o in r)
            Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
        }
        return e;
      }),
    $.apply(this, arguments)
  );
}
n($, '_extends');
var ze = {
    1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    4: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    5: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    137: 'https://polygon-rpc.com',
    250: 'https://rpc.ftm.tools',
    1221: 'https://mainnet-rpc.tlchain.live/',
    43114: 'https://api.avax.network/ext/bc/C/rpc',
    80001: 'https://rpc-mumbai.maticvigil.com',
  },
  He = { name: 'thirdweb powered dApp' },
  $e = ['metamask', 'walletConnect', 'walletLink'],
  Ge = n(
    ({
      sdkOptions: e,
      chainRpc: t = ze,
      supportedChains: r = z.map((f) => f.id),
      walletConnectors: o = $e,
      dAppMeta: s = He,
      desiredChainId: p,
      storageInterface: u,
      children: d,
    }) => {
      let f = (0, w.useMemo)(
          () =>
            r
              .map((a) =>
                typeof a == 'number' ? z.find((m) => m.id === a) : a,
              )
              .filter((a) => a !== void 0),
          [r],
        ),
        g = (0, w.useMemo)(
          () =>
            f.reduce(
              (a, m) => ((a[m.id] = (m.id in t && t[m.id]) || m.rpcUrls[0]), a),
              {},
            ),
          [t, f],
        ),
        b = (0, w.useMemo)(() => {
          let a = {
              name: s.name,
              url: s.url || '',
              icons: [s.logoUrl || ''],
              description: s.description || '',
            },
            m = {
              appName: s.name,
              appLogoUrl: s.logoUrl,
              darkMode: s.isDarkMode,
            };
          return {
            autoConnect: !0,
            connectorStorageKey: 'tw:provider:connectors',
            connectors: ({ chainId: E }) =>
              o
                .map((c) => {
                  if (
                    (typeof c == 'string' &&
                      (c === 'injected' || c === 'metamask')) ||
                    (typeof c == 'object' &&
                      (c.name === 'injected' || c.name === 'metamask'))
                  )
                    return new se.InjectedConnector({
                      options:
                        typeof c == 'string'
                          ? {
                              shimDisconnect: !0,
                              shimChainChangedDisconnect: !0,
                            }
                          : c.options,
                      chains: f,
                    });
                  if (
                    (typeof c == 'string' && c === 'walletConnect') ||
                    (typeof c == 'object' && c.name === 'walletConnect')
                  )
                    return new ce.WalletConnectConnector({
                      options:
                        typeof c == 'string'
                          ? { chainId: E, rpc: g, clientMeta: a, qrcode: !0 }
                          : v(
                              { chainId: E, rpc: g, clientMeta: a, qrcode: !0 },
                              c.options,
                            ),
                      chains: f,
                    });
                  if (
                    (typeof c == 'string' &&
                      (c === 'coinbase' || c === 'walletLink')) ||
                    (typeof c == 'object' &&
                      (c.name === 'coinbase' || c.name === 'walletLink'))
                  ) {
                    let P = g[E || p || 1];
                    return new le.WalletLinkConnector({
                      chains: f,
                      options:
                        typeof c == 'string'
                          ? S(v({}, m), { jsonRpcUrl: P })
                          : v(S(v({}, m), { jsonRpcUrl: P }), c.options),
                    });
                  }
                  return null;
                })
                .filter((c) => c !== null),
          };
        }, [o, f, s]),
        h = g[p || -1],
        y = (0, w.useMemo)(() => {
          var m;
          let a = e;
          return S(v({}, a), {
            readonlySettings: S(
              v({}, (a == null ? void 0 : a.readonlySettings) || {}),
              {
                rpcUrl:
                  (m = a == null ? void 0 : a.readonlySettings) != null &&
                  m.rpcUrl
                    ? a.readonlySettings.rpcUrl
                    : h,
              },
            ),
          });
        }, [e, h]);
      return w.default.createElement(
        A.WagmiProvider,
        $({}, b),
        w.default.createElement(
          Xe,
          { desiredChainId: p, sdkOptions: y, storageInterface: u },
          d,
        ),
      );
    },
    'ThirdwebProvider',
  ),
  X = (0, w.createContext)({ desiredChainId: -1 }),
  Xe = n(
    ({
      sdkOptions: e,
      desiredChainId: t,
      storageInterface: r,
      children: o,
    }) => {
      let s = (0, A.useProvider)(),
        p = H(),
        u = (0, w.useMemo)(() => {
          if (!t || typeof window > 'u') return;
          let f = new ae.ThirdwebSDK(s, e, r);
          return (f._chainId = t), f;
        }, [s, e, r, t]);
      (0, w.useEffect)(() => {
        p && u && u._chainId === t && u.updateSignerOrProvider(p);
      }, [p, u, t]);
      let d = (0, w.useMemo)(
        () => ({ sdk: u, desiredChainId: t || -1, _inProvider: !0 }),
        [u],
      );
      return w.default.createElement(X.Provider, { value: d }, o);
    },
    'ThirdwebSDKProvider',
  );
function _() {
  let e = w.default.useContext(X);
  return (
    (0, G.default)(
      e._inProvider,
      'useSDK must be called from within a ThirdwebProvider, did you forget to wrap your app in a <ThirdwebProvider />?',
    ),
    e.sdk
  );
}
n(_, 'useSDK');
function j() {
  let e = w.default.useContext(X);
  return (
    (0, G.default)(
      e._inProvider,
      'useDesiredChainId must be called from within a ThirdwebProvider, did you forget to wrap your app in a <ThirdwebProvider />?',
    ),
    e.desiredChainId
  );
}
n(j, 'useDesiredChainId');
function x(e, t) {
  let r = _();
  if (!(!r || !t)) return r.getContract(t, e);
}
n(x, 'useContract');
function Be(e) {
  return x('edition-drop', e);
}
n(Be, 'useEditionDrop');
function Ye(e) {
  return x('edition', e);
}
n(Ye, 'useEdition');
function Je(e) {
  return x('nft-drop', e);
}
n(Je, 'useNFTDrop');
function Qe(e) {
  return x('marketplace', e);
}
n(Qe, 'useMarketplace');
function Ze(e) {
  return x('nft-collection', e);
}
n(Ze, 'useNFTCollection');
function et(e) {
  return x('pack', e);
}
n(et, 'usePack');
function tt(e) {
  return x('token', e);
}
n(tt, 'useToken');
function rt(e) {
  return x('vote', e);
}
n(rt, 'useVote');
function nt(e) {
  return x('split', e);
}
n(nt, 'useSplit');
var ue = require('wagmi');
function ot() {
  let [, e] = (0, ue.useAccount)();
  return e;
}
n(ot, 'useDisconnect');
var me = require('wagmi');
function M() {
  return (0, me.useConnect)();
}
n(M, 'useConnect');
var pe = require('wagmi');
function it() {
  var t;
  let [e] = (0, pe.useAccount)();
  return (t = e.data) == null ? void 0 : t.address;
}
n(it, 'useAddress');
var de = require('@thirdweb-dev/sdk'),
  fe = require('react');
function at(e, t, r) {
  return (0, fe.useMemo)(
    () =>
      new de.ThirdwebSDK(
        e,
        S(v({}, t), {
          readonlySettings: S(v({}, t == null ? void 0 : t.readonlySettings), {
            rpcUrl: e,
          }),
        }),
        r,
      ),
    [e, t],
  );
}
n(at, 'useReadonlySDK');
var he = k(require('tiny-invariant'));
function st() {
  let [e, t] = M();
  if (e.loading)
    return () => Promise.reject('Metamask connector not ready to be used, yet');
  let r = e.data.connectors.find((o) => o.id === 'injected');
  return (
    (0, he.default)(
      r,
      'Metamask connector not found, please make sure it is provided to your <ThirdwebProvider />',
    ),
    () => t(r)
  );
}
n(st, 'useMetamask');
var ye = k(require('tiny-invariant'));
function ct() {
  let [e, t] = M();
  if (e.loading)
    return () =>
      Promise.reject('WalletConnect connector not ready to be used, yet');
  let r = e.data.connectors.find((o) => o.id === 'walletConnect');
  return (
    (0, ye.default)(
      r,
      'WalletConnect connector not found, please make sure it is provided to your <ThirdwebProvider />',
    ),
    () => t(r)
  );
}
n(ct, 'useWalletConnect');
var ge = k(require('tiny-invariant'));
function be() {
  let [e, t] = M();
  if (e.loading)
    return () =>
      Promise.reject(
        'WalletLink / Coinbase connector not ready to be used, yet',
      );
  let r = e.data.connectors.find((o) => o.id === 'walletLink');
  return (
    (0, ge.default)(
      r,
      'WalletLink / Coinbase connector not found, please make sure it is provided to your <ThirdwebProvider />',
    ),
    () => t(r)
  );
}
n(be, 'useWalletLink');
function lt() {
  return be();
}
n(lt, 'useCoinbaseWallet');
var xe = require('wagmi');
function B() {
  var e;
  return (e = (0, xe.useNetwork)()['0'].data.chain) == null ? void 0 : e.id;
}
n(B, 'useChainId');
function ut() {
  let e = j(),
    t = B();
  return e === -1
    ? (console.warn(
        'useNetworkMismatch: desiredChainId is -1, this is not a valid chainId, please provide a valid chainId to the <ThirdwebProvider />',
      ),
      !1)
    : t
    ? e !== t
    : (console.debug(
        'useNetworkMismatch: activeChainId is undefined, this means there is no wallet connected yet',
      ),
      !1);
}
n(ut, 'useNetworkMismatch');
var I = require('wagmi'),
  V = require('@thirdweb-dev/sdk');
var mt = 'https://gateway.ipfscdn.io/ipfs/',
  ve = { gatewayUrl: mt };
var we = k(require('mime/lite'));
function Ce(e, t = ve) {
  if (!!e)
    return e.startsWith('ipfs://') ? e.replace('ipfs://', t.gatewayUrl) : e;
}
n(Ce, 'resolveIpfsUri');
async function Ee(e) {
  var o;
  if (!e) return;
  let t = we.default.getType(e);
  if (t) return t;
  let r = await fetch(e, { method: 'HEAD' });
  if (r.ok && r.headers.has('content-type'))
    return (o = r.headers.get('content-type')) != null ? o : void 0;
}
n(Ee, 'resolveMimeType');
var Y;
function pt(e) {
  return typeof window > 'u' || !e || !e.startsWith('video/')
    ? ''
    : (Y || (Y = document.createElement('video')), Y.canPlayType(e));
}
n(pt, 'supportsVideoType');
function ke(e) {
  return !!pt(e);
}
n(ke, 'shouldRenderVideoTag');
var J;
function dt(e) {
  return typeof window > 'u' || !e || !e.startsWith('audio/')
    ? ''
    : (J || (J = document.createElement('audio')), J.canPlayType(e));
}
n(dt, 'supportsAudioType');
function Te(e) {
  return !!dt(e);
}
n(Te, 'shouldRenderAudioTag');
function Q(e) {
  return (t) => {
    e.forEach((r) => {
      typeof r == 'function' ? r(t) : r != null && (r.current = t);
    });
  };
}
n(Q, 'mergeRefs');
var i = k(require('react')),
  Pe = k(require('react-cool-dimensions')),
  Se = require('react-icons/ai'),
  Ie = require('react-icons/fa'),
  N = require('react-icons/io5'),
  Me = k(require('swr/immutable'));
function C() {
  return (
    (C =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var o in r)
            Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
        }
        return e;
      }),
    C.apply(this, arguments)
  );
}
n(C, '_extends');
var ee = n(({ onClick: e, isPlaying: t }) => {
    let [r, o] = (0, i.useState)(!1),
      s = n(() => o(!0), 'onMouseEnter'),
      p = n(() => o(!1), 'onMouseLeave'),
      u = n(() => o(!1), 'onMouseDown'),
      d = n(() => o(!0), 'onMouseUp');
    return i.default.createElement(
      'button',
      {
        style: v(
          {
            position: 'absolute',
            bottom: 0,
            right: 0,
            transform: 'translate(-25%, -25%)',
            maxWidth: '32px',
            width: '8%',
            minWidth: '24px',
            aspectRatio: '1',
            zIndex: 3,
            backgroundColor: '#fff',
            color: 'rgb(138, 147, 155)',
            display: 'grid',
            placeItems: 'center',
            borderRadius: '50%',
            border: '1px solid rgb(229, 232, 235)',
            cursor: 'pointer',
          },
          r
            ? {
                color: 'rgb(53, 56, 64)',
                boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 8px 0px',
              }
            : {},
        ),
        onClick: e,
        onMouseEnter: s,
        onMouseLeave: p,
        onMouseDown: u,
        onMouseUp: d,
      },
      t
        ? i.default.createElement(N.IoPauseSharp, {
            style: { width: '66%', height: '66%' },
          })
        : i.default.createElement(N.IoPlaySharp, {
            style: { width: '66%', height: '66%' },
          }),
    );
  }, 'PlayButton'),
  ft = i.default.forwardRef((h, b) => {
    var y = h,
      {
        src: e,
        alt: t,
        poster: r,
        requireInteraction: o,
        children: s,
        style: p,
        width: u,
        height: d,
        controls: f,
      } = y,
      g = T(y, [
        'src',
        'alt',
        'poster',
        'requireInteraction',
        'children',
        'style',
        'width',
        'height',
        'controls',
      ]);
    let a = (0, i.useRef)(null),
      [m, E] = (0, i.useState)(!o),
      [c, P] = (0, i.useState)(!0);
    return (
      (0, i.useEffect)(() => {
        a.current &&
          (m
            ? a.current.play()
            : (a.current.pause(), (a.current.currentTime = 0)));
      }, [m]),
      i.default.createElement(
        'div',
        C({ style: v({ position: 'relative' }, p) }, g),
        i.default.createElement('video', {
          ref: Q([a, b]),
          src: e,
          poster: r,
          loop: !0,
          playsInline: !0,
          muted: c,
          preload: r ? 'metadata' : 'auto',
          onCanPlay: () => {
            var R;
            m && ((R = a.current) == null || R.play());
          },
          width: u,
          height: d,
          controls: f,
          style: {
            height: '100%',
            width: '100%',
            objectFit: 'contain',
            zIndex: 1,
            transition: 'opacity .5s',
            opacity: r ? (m ? 1 : 0) : 1,
          },
        }),
        r &&
          i.default.createElement('img', {
            src: r,
            style: {
              objectFit: 'contain',
              pointerEvents: 'none',
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 2,
              transition: 'opacity .5s',
              opacity: m ? 0 : 1,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          }),
        i.default.createElement(ee, {
          onClick: () => {
            E((R) => !R), P(!1);
          },
          isPlaying: m,
        }),
      )
    );
  }),
  ht = i.default.forwardRef((h, b) => {
    var y = h,
      {
        src: e,
        alt: t,
        poster: r,
        requireInteraction: o,
        children: s,
        style: p,
        height: u,
        width: d,
        controls: f,
      } = y,
      g = T(y, [
        'src',
        'alt',
        'poster',
        'requireInteraction',
        'children',
        'style',
        'height',
        'width',
        'controls',
      ]);
    let a = (0, i.useRef)(null),
      [m, E] = (0, i.useState)(!1),
      [c, P] = (0, i.useState)(!0);
    return (
      (0, i.useEffect)(() => {
        a.current &&
          (m
            ? a.current.play()
            : (a.current.pause(), (a.current.currentTime = 0)));
      }, [m]),
      i.default.createElement(
        'div',
        C({ style: v({ position: 'relative' }, p) }, g),
        r
          ? i.default.createElement('img', {
              height: u,
              width: d,
              src: r,
              style: {
                height: '100%',
                width: '100%',
                pointerEvents: 'none',
                objectFit: 'contain',
              },
            })
          : i.default.createElement(
              'div',
              {
                style: {
                  width: '100%',
                  height: '100%',
                  display: 'grid',
                  placeItems: 'center',
                  pointerEvents: 'none',
                  backgroundColor: '#fff',
                  color: 'rgb(138, 147, 155)',
                },
              },
              i.default.createElement(Ie.FaRegFileAudio, {
                style: { height: '64px', width: '64px' },
              }),
            ),
        i.default.createElement(ee, {
          onClick: () => {
            E((R) => !R), P(!1);
          },
          isPlaying: m,
        }),
        i.default.createElement('audio', {
          ref: Q([a, b]),
          src: e,
          loop: !0,
          playsInline: !0,
          muted: c,
          style: {
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: -1,
            visibility: 'hidden',
          },
        }),
      )
    );
  }),
  yt = i.default.forwardRef((h, b) => {
    var y = h,
      {
        src: e,
        alt: t,
        poster: r,
        requireInteraction: o,
        children: s,
        style: p,
        height: u,
        width: d,
        controls: f,
      } = y,
      g = T(y, [
        'src',
        'alt',
        'poster',
        'requireInteraction',
        'children',
        'style',
        'height',
        'width',
        'controls',
      ]);
    let { observe: a, width: m } = (0, Pe.default)(),
      [E, c] = (0, i.useState)(!o);
    return m < 300
      ? i.default.createElement(
          'div',
          { ref: a },
          i.default.createElement(Re, C({ style: p, src: e, alt: t }, g)),
        )
      : i.default.createElement(
          'div',
          C({ style: v({ position: 'relative' }, p) }, g, { ref: a }),
          i.default.createElement('iframe', {
            src: E ? e : void 0,
            ref: b,
            style: {
              objectFit: 'contain',
              zIndex: 1,
              height: '100%',
              width: '100%',
              transition: 'opacity .5s',
              opacity: r ? (E ? 1 : 0) : 1,
            },
          }),
          r &&
            i.default.createElement('img', {
              src: r,
              style: {
                objectFit: 'contain',
                pointerEvents: 'none',
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 2,
                transition: 'opacity .5s',
                opacity: E ? 0 : 1,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
            }),
          i.default.createElement(ee, {
            onClick: () => {
              c((P) => !P);
            },
            isPlaying: E,
          }),
        );
  }),
  Re = i.default.forwardRef((h, b) => {
    var y = h,
      {
        src: e,
        alt: t,
        poster: r,
        requireInteraction: o,
        children: s,
        style: p,
        height: u,
        width: d,
        controls: f,
      } = y,
      g = T(y, [
        'src',
        'alt',
        'poster',
        'requireInteraction',
        'children',
        'style',
        'height',
        'width',
        'controls',
      ]);
    return i.default.createElement(
      'div',
      C({ style: v({ position: 'relative' }, p) }, g),
      i.default.createElement(
        'div',
        {
          style: {
            width: '100%',
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            backgroundColor: '#fff',
            color: 'rgb(138, 147, 155)',
          },
        },
        i.default.createElement(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              alignItems: 'center',
              flexWrap: 'nowrap',
            },
          },
          i.default.createElement(Se.AiOutlineFileUnknown, {
            style: {
              maxWidth: '128px',
              minWidth: '48px',
              width: '50%',
              aspectRatio: '1',
            },
          }),
          i.default.createElement(
            'a',
            {
              rel: 'noopener noreferrer',
              style: {
                textDecoration: 'underline',
                color: 'rgb(138, 147, 155)',
              },
              href: e,
              target: '_blank',
              ref: b,
            },
            t || 'File',
          ),
        ),
      ),
    );
  }),
  O = i.default.forwardRef((f, d) => {
    var g = f,
      {
        children: e,
        src: t,
        poster: r,
        alt: o,
        requireInteraction: s = !1,
        style: p,
      } = g,
      u = T(g, [
        'children',
        'src',
        'poster',
        'alt',
        'requireInteraction',
        'style',
      ]);
    let b = v({ objectFit: 'contain' }, p),
      h = Z(t),
      y = Z(r);
    if (h.mimeType) {
      if (h.mimeType === 'text/html')
        return i.default.createElement(
          yt,
          C({ style: b, src: h.url, poster: y.url, requireInteraction: s }, u),
        );
      if (ke(h.mimeType))
        return i.default.createElement(
          ft,
          C({ style: b, src: h.url, poster: y.url, requireInteraction: s }, u),
        );
      if (Te(h.mimeType))
        return i.default.createElement(
          ht,
          C({ style: b, src: h.url, poster: y.url, requireInteraction: s }, u),
        );
      if (h.mimeType.startsWith('image/'))
        return i.default.createElement(
          'img',
          C({ style: b, src: h.url, alt: o, ref: d }, u),
        );
    } else
      return i.default.createElement('img', C({ style: b }, u, { ref: d }));
    return i.default.createElement(
      Re,
      C({ style: b, src: h.url, alt: o, ref: d }, u),
    );
  });
function Z(e) {
  let t = (0, i.useMemo)(() => Ce(e), [e]),
    r = (0, Me.default)(t, () => Ee(t), { isPaused: () => !t });
  return { url: t, mimeType: r.data };
}
n(Z, 'useResolvedMediaType');
var Ue = k(require('swr/immutable'));
function De(e, t, r = void 0) {
  let o = _();
  return (0, Ue.default)(
    `contract.${t}.${e}`,
    () =>
      o && 'unstable_getCustomContract' in o && e
        ? o.unstable_getCustomContract(e, r)
        : void 0,
    { isPaused: () => !o || !e },
  );
}
n(De, 'useUnstableCustomContract');
var L = k(require('react')),
  We = k(require('swr/immutable'));
function K() {
  return (
    (K =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var o in r)
            Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
        }
        return e;
      }),
    K.apply(this, arguments)
  );
}
n(K, '_extends');
var gt = L.default.forwardRef((p, s) => {
  var u = p,
    { children: e, contractAddress: t, tokenId: r } = u,
    o = T(u, ['children', 'contractAddress', 'tokenId']);
  var f, g, b, h, y, a;
  let d = _e(t, r);
  return L.default.createElement(
    O,
    K(
      {
        src:
          ((f = d.data) == null ? void 0 : f.metadata.animation_url) ||
          ((b = (g = d.data) == null ? void 0 : g.metadata) == null
            ? void 0
            : b.image),
        poster: (h = d.data) == null ? void 0 : h.metadata.image,
        alt:
          (a = (y = d.data) == null ? void 0 : y.metadata) == null
            ? void 0
            : a.name,
        ref: s,
      },
      o,
    ),
  );
});
function _e(e, t) {
  let r = j(),
    o = De(e, r);
  return (0, We.default)(
    o.data ? `token-metadata.${r}.${e}.${t}` : 'token-medata.loading',
    () => (o.data && 'get' in o.data ? o.data.get(t) : void 0),
    { isPaused: () => !o.data || !('get' in o.data) },
  );
}
n(_e, 'useNftTokenMetadata');
var bt = L.default.forwardRef((o, r) => {
  var s = o,
    { metadata: e } = s,
    t = T(s, ['metadata']);
  return L.default.createElement(
    O,
    K(
      { src: e.animation_url || e.image, poster: e.image, alt: e.name, ref: r },
      t,
    ),
  );
});
0 &&
  (module.exports = {
    ChainId,
    IpfsStorage,
    MediaRenderer,
    ThirdwebNftMedia,
    ThirdwebProvider,
    Unstable_NftMedia,
    defaultChains,
    defaultL2Chains,
    useAccount,
    useAddress,
    useChainId,
    useCoinbaseWallet,
    useConnect,
    useContract,
    useDesiredChainId,
    useDisconnect,
    useEdition,
    useEditionDrop,
    useMarketplace,
    useMetamask,
    useNFTCollection,
    useNFTDrop,
    useNetwork,
    useNetworkMismatch,
    useNftTokenMetadata,
    usePack,
    useReadonlySDK,
    useResolvedMediaType,
    useSDK,
    useSigner,
    useSplit,
    useToken,
    useVote,
    useWalletConnect,
    useWalletLink,
  });
//# sourceMappingURL=index.js.map
