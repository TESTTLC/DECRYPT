var $ = Object.defineProperty,
  me = Object.defineProperties;
var pe = Object.getOwnPropertyDescriptors;
var D = Object.getOwnPropertySymbols;
var G = Object.prototype.hasOwnProperty,
  X = Object.prototype.propertyIsEnumerable;
var H = (e, t, r) =>
    t in e
      ? $(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (e[t] = r),
  w = (e, t) => {
    for (var r in t || (t = {})) G.call(t, r) && H(e, r, t[r]);
    if (D) for (var r of D(t)) X.call(t, r) && H(e, r, t[r]);
    return e;
  },
  P = (e, t) => me(e, pe(t)),
  n = (e, t) => $(e, 'name', { value: t, configurable: !0 });
var k = (e, t) => {
  var r = {};
  for (var o in e) G.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
  if (e != null && D)
    for (var o of D(e)) t.indexOf(o) < 0 && X.call(e, o) && (r[o] = e[o]);
  return r;
};
var de = {
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
  F = Object.values(de);
import { Signer as fe } from 'ethers';
import { useEffect as Y, useRef as J } from 'react';
import { useAccount as he, useNetwork as ye, useSigner as ge } from 'wagmi';
function Q() {
  var b, x, y, g, i;
  let [e, t] = ge(),
    [r] = he(),
    [o] = ye(),
    s = J(null),
    d = (b = r.data) == null ? void 0 : b.address,
    m = (x = o.data.chain) == null ? void 0 : x.id,
    f = B((y = r.data) == null ? void 0 : y.address),
    h = B(
      (i = (g = o.data) == null ? void 0 : g.chain) == null ? void 0 : i.id,
    );
  return (
    Y(() => {
      if (d !== f || m !== h)
        if (s.current)
          s.current = t().finally(() => {
            s.current = null;
          });
        else return;
    }, [d, m, f, h]),
    fe.isSigner(e.data) ? e.data : void 0
  );
}
n(Q, 'useSigner');
function B(e) {
  let t = J();
  return (
    Y(() => {
      t.current = e;
    }, [e]),
    t.current
  );
}
n(B, 'usePrevious');
import { ThirdwebSDK as be } from '@thirdweb-dev/sdk';
import U, { createContext as xe, useEffect as ve, useMemo as I } from 'react';
import Z from 'tiny-invariant';
import { WagmiProvider as we, useProvider as Ce } from 'wagmi';
import { InjectedConnector as Ee } from 'wagmi/connectors/injected';
import { WalletConnectConnector as ke } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector as Te } from 'wagmi/connectors/walletLink';
function A() {
  return (
    (A =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var o in r)
            Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
        }
        return e;
      }),
    A.apply(this, arguments)
  );
}
n(A, '_extends');
var Pe = {
    1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    4: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    5: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    137: 'https://polygon-rpc.com',
    250: 'https://rpc.ftm.tools',
    1221: 'https://mainnet-rpc.tlchain.live/',
    43114: 'https://api.avax.network/ext/bc/C/rpc',
    80001: 'https://rpc-mumbai.maticvigil.com',
  },
  Se = { name: 'thirdweb powered dApp' },
  Ie = ['metamask', 'walletConnect', 'walletLink'],
  bt = n(
    ({
      sdkOptions: e,
      chainRpc: t = Pe,
      supportedChains: r = F.map((h) => h.id),
      walletConnectors: o = Ie,
      dAppMeta: s = Se,
      desiredChainId: d,
      storageInterface: m,
      children: f,
    }) => {
      let h = I(
          () =>
            r
              .map((i) =>
                typeof i == 'number' ? F.find((p) => p.id === i) : i,
              )
              .filter((i) => i !== void 0),
          [r],
        ),
        b = I(
          () =>
            h.reduce(
              (i, p) => ((i[p.id] = (p.id in t && t[p.id]) || p.rpcUrls[0]), i),
              {},
            ),
          [t, h],
        ),
        x = I(() => {
          let i = {
              name: s.name,
              url: s.url || '',
              icons: [s.logoUrl || ''],
              description: s.description || '',
            },
            p = {
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
                    return new Ee({
                      options:
                        typeof c == 'string'
                          ? {
                              shimDisconnect: !0,
                              shimChainChangedDisconnect: !0,
                            }
                          : c.options,
                      chains: h,
                    });
                  if (
                    (typeof c == 'string' && c === 'walletConnect') ||
                    (typeof c == 'object' && c.name === 'walletConnect')
                  )
                    return new ke({
                      options:
                        typeof c == 'string'
                          ? { chainId: E, rpc: b, clientMeta: i, qrcode: !0 }
                          : w(
                              { chainId: E, rpc: b, clientMeta: i, qrcode: !0 },
                              c.options,
                            ),
                      chains: h,
                    });
                  if (
                    (typeof c == 'string' &&
                      (c === 'coinbase' || c === 'walletLink')) ||
                    (typeof c == 'object' &&
                      (c.name === 'coinbase' || c.name === 'walletLink'))
                  ) {
                    let T = b[E || d || 1];
                    return new Te({
                      chains: h,
                      options:
                        typeof c == 'string'
                          ? P(w({}, p), { jsonRpcUrl: T })
                          : w(P(w({}, p), { jsonRpcUrl: T }), c.options),
                    });
                  }
                  return null;
                })
                .filter((c) => c !== null),
          };
        }, [o, h, s]),
        y = b[d || -1],
        g = I(() => {
          var p;
          let i = e;
          return P(w({}, i), {
            readonlySettings: P(
              w({}, (i == null ? void 0 : i.readonlySettings) || {}),
              {
                rpcUrl:
                  (p = i == null ? void 0 : i.readonlySettings) != null &&
                  p.rpcUrl
                    ? i.readonlySettings.rpcUrl
                    : y,
              },
            ),
          });
        }, [e, y]);
      return U.createElement(
        we,
        A({}, x),
        U.createElement(
          Me,
          { desiredChainId: d, sdkOptions: g, storageInterface: m },
          f,
        ),
      );
    },
    'ThirdwebProvider',
  ),
  N = xe({ desiredChainId: -1 }),
  Me = n(
    ({
      sdkOptions: e,
      desiredChainId: t,
      storageInterface: r,
      children: o,
    }) => {
      let s = Ce(),
        d = Q(),
        m = I(() => {
          if (!t || typeof window > 'u') return;
          let h = new be(s, e, r);
          return (h._chainId = t), h;
        }, [s, e, r, t]);
      ve(() => {
        d && m && m._chainId === t && m.updateSignerOrProvider(d);
      }, [d, m, t]);
      let f = I(
        () => ({ sdk: m, desiredChainId: t || -1, _inProvider: !0 }),
        [m],
      );
      return U.createElement(N.Provider, { value: f }, o);
    },
    'ThirdwebSDKProvider',
  );
function W() {
  let e = U.useContext(N);
  return (
    Z(
      e._inProvider,
      'useSDK must be called from within a ThirdwebProvider, did you forget to wrap your app in a <ThirdwebProvider />?',
    ),
    e.sdk
  );
}
n(W, 'useSDK');
function _() {
  let e = U.useContext(N);
  return (
    Z(
      e._inProvider,
      'useDesiredChainId must be called from within a ThirdwebProvider, did you forget to wrap your app in a <ThirdwebProvider />?',
    ),
    e.desiredChainId
  );
}
n(_, 'useDesiredChainId');
function v(e, t) {
  let r = W();
  if (!(!r || !t)) return r.getContract(t, e);
}
n(v, 'useContract');
function Et(e) {
  return v('edition-drop', e);
}
n(Et, 'useEditionDrop');
function Pt(e) {
  return v('edition', e);
}
n(Pt, 'useEdition');
function Mt(e) {
  return v('nft-drop', e);
}
n(Mt, 'useNFTDrop');
function Dt(e) {
  return v('marketplace', e);
}
n(Dt, 'useMarketplace');
function jt(e) {
  return v('nft-collection', e);
}
n(jt, 'useNFTCollection');
function At(e) {
  return v('pack', e);
}
n(At, 'usePack');
function Kt(e) {
  return v('token', e);
}
n(Kt, 'useToken');
function zt(e) {
  return v('vote', e);
}
n(zt, 'useVote');
function Gt(e) {
  return v('split', e);
}
n(Gt, 'useSplit');
import { useAccount as Re } from 'wagmi';
function sr() {
  let [, e] = Re();
  return e;
}
n(sr, 'useDisconnect');
import { useConnect as Ue } from 'wagmi';
function M() {
  return Ue();
}
n(M, 'useConnect');
import { useAccount as De } from 'wagmi';
function pr() {
  var t;
  let [e] = De();
  return (t = e.data) == null ? void 0 : t.address;
}
n(pr, 'useAddress');
import { ThirdwebSDK as We } from '@thirdweb-dev/sdk';
import { useMemo as _e } from 'react';
function yr(e, t, r) {
  return _e(
    () =>
      new We(
        e,
        P(w({}, t), {
          readonlySettings: P(w({}, t == null ? void 0 : t.readonlySettings), {
            rpcUrl: e,
          }),
        }),
        r,
      ),
    [e, t],
  );
}
n(yr, 'useReadonlySDK');
import je from 'tiny-invariant';
function vr() {
  let [e, t] = M();
  if (e.loading)
    return () => Promise.reject('Metamask connector not ready to be used, yet');
  let r = e.data.connectors.find((o) => o.id === 'injected');
  return (
    je(
      r,
      'Metamask connector not found, please make sure it is provided to your <ThirdwebProvider />',
    ),
    () => t(r)
  );
}
n(vr, 'useMetamask');
import Le from 'tiny-invariant';
function kr() {
  let [e, t] = M();
  if (e.loading)
    return () =>
      Promise.reject('WalletConnect connector not ready to be used, yet');
  let r = e.data.connectors.find((o) => o.id === 'walletConnect');
  return (
    Le(
      r,
      'WalletConnect connector not found, please make sure it is provided to your <ThirdwebProvider />',
    ),
    () => t(r)
  );
}
n(kr, 'useWalletConnect');
import Fe from 'tiny-invariant';
function Ae() {
  let [e, t] = M();
  if (e.loading)
    return () =>
      Promise.reject(
        'WalletLink / Coinbase connector not ready to be used, yet',
      );
  let r = e.data.connectors.find((o) => o.id === 'walletLink');
  return (
    Fe(
      r,
      'WalletLink / Coinbase connector not found, please make sure it is provided to your <ThirdwebProvider />',
    ),
    () => t(r)
  );
}
n(Ae, 'useWalletLink');
function Ir() {
  return Ae();
}
n(Ir, 'useCoinbaseWallet');
import { useNetwork as Ne } from 'wagmi';
function ee() {
  var e;
  return (e = Ne()['0'].data.chain) == null ? void 0 : e.id;
}
n(ee, 'useChainId');
function _r() {
  let e = _(),
    t = ee();
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
n(_r, 'useNetworkMismatch');
import {
  defaultChains as kn,
  defaultL2Chains as Tn,
  useAccount as Pn,
  useNetwork as Sn,
} from 'wagmi';
import { ChainId as Mn, IpfsStorage as Rn } from '@thirdweb-dev/sdk';
var Oe = 'https://gateway.ipfscdn.io/ipfs/',
  te = { gatewayUrl: Oe };
import Ke from 'mime/lite';
function re(e, t = te) {
  if (!!e)
    return e.startsWith('ipfs://') ? e.replace('ipfs://', t.gatewayUrl) : e;
}
n(re, 'resolveIpfsUri');
async function ne(e) {
  var o;
  if (!e) return;
  let t = Ke.getType(e);
  if (t) return t;
  let r = await fetch(e, { method: 'HEAD' });
  if (r.ok && r.headers.has('content-type'))
    return (o = r.headers.get('content-type')) != null ? o : void 0;
}
n(ne, 'resolveMimeType');
var O;
function Ve(e) {
  return typeof window > 'u' || !e || !e.startsWith('video/')
    ? ''
    : (O || (O = document.createElement('video')), O.canPlayType(e));
}
n(Ve, 'supportsVideoType');
function oe(e) {
  return !!Ve(e);
}
n(oe, 'shouldRenderVideoTag');
var K;
function qe(e) {
  return typeof window > 'u' || !e || !e.startsWith('audio/')
    ? ''
    : (K || (K = document.createElement('audio')), K.canPlayType(e));
}
n(qe, 'supportsAudioType');
function ie(e) {
  return !!qe(e);
}
n(ie, 'shouldRenderAudioTag');
function V(e) {
  return (t) => {
    e.forEach((r) => {
      typeof r == 'function' ? r(t) : r != null && (r.current = t);
    });
  };
}
n(V, 'mergeRefs');
import a, {
  useEffect as se,
  useMemo as ze,
  useRef as ce,
  useState as R,
} from 'react';
import He from 'react-cool-dimensions';
import { AiOutlineFileUnknown as $e } from 'react-icons/ai';
import { FaRegFileAudio as Ge } from 'react-icons/fa';
import { IoPauseSharp as Xe, IoPlaySharp as Be } from 'react-icons/io5';
import Ye from 'swr/immutable';
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
var q = n(({ onClick: e, isPlaying: t }) => {
    let [r, o] = R(!1),
      s = n(() => o(!0), 'onMouseEnter'),
      d = n(() => o(!1), 'onMouseLeave'),
      m = n(() => o(!1), 'onMouseDown'),
      f = n(() => o(!0), 'onMouseUp');
    return a.createElement(
      'button',
      {
        style: w(
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
        onMouseLeave: d,
        onMouseDown: m,
        onMouseUp: f,
      },
      t
        ? a.createElement(Xe, { style: { width: '66%', height: '66%' } })
        : a.createElement(Be, { style: { width: '66%', height: '66%' } }),
    );
  }, 'PlayButton'),
  Je = a.forwardRef((y, x) => {
    var g = y,
      {
        src: e,
        alt: t,
        poster: r,
        requireInteraction: o,
        children: s,
        style: d,
        width: m,
        height: f,
        controls: h,
      } = g,
      b = k(g, [
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
    let i = ce(null),
      [p, E] = R(!o),
      [c, T] = R(!0);
    return (
      se(() => {
        i.current &&
          (p
            ? i.current.play()
            : (i.current.pause(), (i.current.currentTime = 0)));
      }, [p]),
      a.createElement(
        'div',
        C({ style: w({ position: 'relative' }, d) }, b),
        a.createElement('video', {
          ref: V([i, x]),
          src: e,
          poster: r,
          loop: !0,
          playsInline: !0,
          muted: c,
          preload: r ? 'metadata' : 'auto',
          onCanPlay: () => {
            var S;
            p && ((S = i.current) == null || S.play());
          },
          width: m,
          height: f,
          controls: h,
          style: {
            height: '100%',
            width: '100%',
            objectFit: 'contain',
            zIndex: 1,
            transition: 'opacity .5s',
            opacity: r ? (p ? 1 : 0) : 1,
          },
        }),
        r &&
          a.createElement('img', {
            src: r,
            style: {
              objectFit: 'contain',
              pointerEvents: 'none',
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 2,
              transition: 'opacity .5s',
              opacity: p ? 0 : 1,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          }),
        a.createElement(q, {
          onClick: () => {
            E((S) => !S), T(!1);
          },
          isPlaying: p,
        }),
      )
    );
  }),
  Qe = a.forwardRef((y, x) => {
    var g = y,
      {
        src: e,
        alt: t,
        poster: r,
        requireInteraction: o,
        children: s,
        style: d,
        height: m,
        width: f,
        controls: h,
      } = g,
      b = k(g, [
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
    let i = ce(null),
      [p, E] = R(!1),
      [c, T] = R(!0);
    return (
      se(() => {
        i.current &&
          (p
            ? i.current.play()
            : (i.current.pause(), (i.current.currentTime = 0)));
      }, [p]),
      a.createElement(
        'div',
        C({ style: w({ position: 'relative' }, d) }, b),
        r
          ? a.createElement('img', {
              height: m,
              width: f,
              src: r,
              style: {
                height: '100%',
                width: '100%',
                pointerEvents: 'none',
                objectFit: 'contain',
              },
            })
          : a.createElement(
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
              a.createElement(Ge, { style: { height: '64px', width: '64px' } }),
            ),
        a.createElement(q, {
          onClick: () => {
            E((S) => !S), T(!1);
          },
          isPlaying: p,
        }),
        a.createElement('audio', {
          ref: V([i, x]),
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
  Ze = a.forwardRef((y, x) => {
    var g = y,
      {
        src: e,
        alt: t,
        poster: r,
        requireInteraction: o,
        children: s,
        style: d,
        height: m,
        width: f,
        controls: h,
      } = g,
      b = k(g, [
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
    let { observe: i, width: p } = He(),
      [E, c] = R(!o);
    return p < 300
      ? a.createElement(
          'div',
          { ref: i },
          a.createElement(le, C({ style: d, src: e, alt: t }, b)),
        )
      : a.createElement(
          'div',
          C({ style: w({ position: 'relative' }, d) }, b, { ref: i }),
          a.createElement('iframe', {
            src: E ? e : void 0,
            ref: x,
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
            a.createElement('img', {
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
          a.createElement(q, {
            onClick: () => {
              c((T) => !T);
            },
            isPlaying: E,
          }),
        );
  }),
  le = a.forwardRef((y, x) => {
    var g = y,
      {
        src: e,
        alt: t,
        poster: r,
        requireInteraction: o,
        children: s,
        style: d,
        height: m,
        width: f,
        controls: h,
      } = g,
      b = k(g, [
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
    return a.createElement(
      'div',
      C({ style: w({ position: 'relative' }, d) }, b),
      a.createElement(
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
        a.createElement(
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
          a.createElement($e, {
            style: {
              maxWidth: '128px',
              minWidth: '48px',
              width: '50%',
              aspectRatio: '1',
            },
          }),
          a.createElement(
            'a',
            {
              rel: 'noopener noreferrer',
              style: {
                textDecoration: 'underline',
                color: 'rgb(138, 147, 155)',
              },
              href: e,
              target: '_blank',
              ref: x,
            },
            t || 'File',
          ),
        ),
      ),
    );
  }),
  z = a.forwardRef((h, f) => {
    var b = h,
      {
        children: e,
        src: t,
        poster: r,
        alt: o,
        requireInteraction: s = !1,
        style: d,
      } = b,
      m = k(b, [
        'children',
        'src',
        'poster',
        'alt',
        'requireInteraction',
        'style',
      ]);
    let x = w({ objectFit: 'contain' }, d),
      y = ae(t),
      g = ae(r);
    if (y.mimeType) {
      if (y.mimeType === 'text/html')
        return a.createElement(
          Ze,
          C({ style: x, src: y.url, poster: g.url, requireInteraction: s }, m),
        );
      if (oe(y.mimeType))
        return a.createElement(
          Je,
          C({ style: x, src: y.url, poster: g.url, requireInteraction: s }, m),
        );
      if (ie(y.mimeType))
        return a.createElement(
          Qe,
          C({ style: x, src: y.url, poster: g.url, requireInteraction: s }, m),
        );
      if (y.mimeType.startsWith('image/'))
        return a.createElement(
          'img',
          C({ style: x, src: y.url, alt: o, ref: f }, m),
        );
    } else return a.createElement('img', C({ style: x }, m, { ref: f }));
    return a.createElement(le, C({ style: x, src: y.url, alt: o, ref: f }, m));
  });
function ae(e) {
  let t = ze(() => re(e), [e]),
    r = Ye(t, () => ne(t), { isPaused: () => !t });
  return { url: t, mimeType: r.data };
}
n(ae, 'useResolvedMediaType');
import et from 'swr/immutable';
function ue(e, t, r = void 0) {
  let o = W();
  return et(
    `contract.${t}.${e}`,
    () =>
      o && 'unstable_getCustomContract' in o && e
        ? o.unstable_getCustomContract(e, r)
        : void 0,
    { isPaused: () => !o || !e },
  );
}
n(ue, 'useUnstableCustomContract');
import L from 'react';
import tt from 'swr/immutable';
function j() {
  return (
    (j =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var o in r)
            Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
        }
        return e;
      }),
    j.apply(this, arguments)
  );
}
n(j, '_extends');
var sn = L.forwardRef((d, s) => {
  var m = d,
    { children: e, contractAddress: t, tokenId: r } = m,
    o = k(m, ['children', 'contractAddress', 'tokenId']);
  var h, b, x, y, g, i;
  let f = rt(t, r);
  return L.createElement(
    z,
    j(
      {
        src:
          ((h = f.data) == null ? void 0 : h.metadata.animation_url) ||
          ((x = (b = f.data) == null ? void 0 : b.metadata) == null
            ? void 0
            : x.image),
        poster: (y = f.data) == null ? void 0 : y.metadata.image,
        alt:
          (i = (g = f.data) == null ? void 0 : g.metadata) == null
            ? void 0
            : i.name,
        ref: s,
      },
      o,
    ),
  );
});
function rt(e, t) {
  let r = _(),
    o = ue(e, r);
  return tt(
    o.data ? `token-metadata.${r}.${e}.${t}` : 'token-medata.loading',
    () => (o.data && 'get' in o.data ? o.data.get(t) : void 0),
    { isPaused: () => !o.data || !('get' in o.data) },
  );
}
n(rt, 'useNftTokenMetadata');
var cn = L.forwardRef((o, r) => {
  var s = o,
    { metadata: e } = s,
    t = k(s, ['metadata']);
  return L.createElement(
    z,
    j(
      { src: e.animation_url || e.image, poster: e.image, alt: e.name, ref: r },
      t,
    ),
  );
});
export {
  Mn as ChainId,
  Rn as IpfsStorage,
  z as MediaRenderer,
  cn as ThirdwebNftMedia,
  bt as ThirdwebProvider,
  sn as Unstable_NftMedia,
  kn as defaultChains,
  Tn as defaultL2Chains,
  Pn as useAccount,
  pr as useAddress,
  ee as useChainId,
  Ir as useCoinbaseWallet,
  M as useConnect,
  v as useContract,
  _ as useDesiredChainId,
  sr as useDisconnect,
  Pt as useEdition,
  Et as useEditionDrop,
  Dt as useMarketplace,
  vr as useMetamask,
  jt as useNFTCollection,
  Mt as useNFTDrop,
  Sn as useNetwork,
  _r as useNetworkMismatch,
  rt as useNftTokenMetadata,
  At as usePack,
  yr as useReadonlySDK,
  ae as useResolvedMediaType,
  W as useSDK,
  Q as useSigner,
  Gt as useSplit,
  Kt as useToken,
  zt as useVote,
  kr as useWalletConnect,
  Ae as useWalletLink,
};
//# sourceMappingURL=index.mjs.map
