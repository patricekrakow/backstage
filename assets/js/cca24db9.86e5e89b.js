/*! For license information please see cca24db9.86e5e89b.js.LICENSE.txt */
"use strict";(self.webpackChunkbackstage_microsite=self.webpackChunkbackstage_microsite||[]).push([[758989],{380007:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>a,toc:()=>u});var r=n(824246),o=n(511151);const s={id:"setup-opentelemetry",title:"Setup OpenTelemetry",description:"Tutorial to setup OpenTelemetry metrics and traces exporters in Backstage"},i=void 0,a={id:"tutorials/setup-opentelemetry",title:"Setup OpenTelemetry",description:"Tutorial to setup OpenTelemetry metrics and traces exporters in Backstage",source:"@site/../docs/tutorials/setup-opentelemetry.md",sourceDirName:"tutorials",slug:"/tutorials/setup-opentelemetry",permalink:"/docs/tutorials/setup-opentelemetry",draft:!1,unlisted:!1,editUrl:"https://github.com/backstage/backstage/edit/master/docs/../docs/tutorials/setup-opentelemetry.md",tags:[],version:"current",frontMatter:{id:"setup-opentelemetry",title:"Setup OpenTelemetry",description:"Tutorial to setup OpenTelemetry metrics and traces exporters in Backstage"},sidebar:"docs",previous:{title:"Enabling a public entry point",permalink:"/docs/tutorials/enable-public-entry"},next:{title:"Overview",permalink:"/docs/architecture-decisions/"}},c={},u=[{value:"Install dependencies",id:"install-dependencies",level:2},{value:"Configure",id:"configure",level:2},{value:"Run Backstage",id:"run-backstage",level:2},{value:"References",id:"references",level:2}];function l(e){const t={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:["Backstage uses ",(0,r.jsx)(t.a,{href:"https://opentelemetry.io/",children:"OpenTelemetery"})," to instrument its components by reporting traces and metrics."]}),"\n",(0,r.jsx)(t.p,{children:"This tutorial shows how to setup exporters in your Backstage backend package. For demonstration purposes we will use the simple console exporters."}),"\n",(0,r.jsx)(t.h2,{id:"install-dependencies",children:"Install dependencies"}),"\n",(0,r.jsxs)(t.p,{children:["We will use the OpenTelemetry Node SDK and the ",(0,r.jsx)(t.code,{children:"auto-instrumentations-node"})," packages."]}),"\n",(0,r.jsxs)(t.p,{children:["Backstage packages, such as the catalog, uses the OpenTelemetry API to send custom traces and metrics.\nThe ",(0,r.jsx)(t.code,{children:"auto-instrumentations-node"})," will automatically create spans for code called in libraries like Express."]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"yarn --cwd packages/backend add @opentelemetry/sdk-node \\\n    @opentelemetry/auto-instrumentations-node \\\n    @opentelemetry/sdk-metrics \\\n    @opentelemetry/sdk-trace-node\n"})}),"\n",(0,r.jsx)(t.h2,{id:"configure",children:"Configure"}),"\n",(0,r.jsxs)(t.p,{children:["In your ",(0,r.jsx)(t.code,{children:"packages/backend"})," folder, create an ",(0,r.jsx)(t.code,{children:"instrumentation.js"})," file."]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"const { NodeSDK } = require('@opentelemetry/sdk-node');\nconst { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');\nconst {\n  getNodeAutoInstrumentations,\n} = require('@opentelemetry/auto-instrumentations-node');\nconst {\n  PeriodicExportingMetricReader,\n  ConsoleMetricExporter,\n} = require('@opentelemetry/sdk-metrics');\n\nconst sdk = new NodeSDK({\n  traceExporter: new ConsoleSpanExporter(),\n  metricReader: new PeriodicExportingMetricReader({\n    exporter: new ConsoleMetricExporter(),\n  }),\n  instrumentations: [getNodeAutoInstrumentations()],\n});\n\nsdk.start();\n"})}),"\n",(0,r.jsxs)(t.p,{children:["You probably won't need all of the instrumentation inside ",(0,r.jsx)(t.code,{children:"getNodeAutoInstrumentations()"})," so make sure to\ncheck the ",(0,r.jsx)(t.a,{href:"https://www.npmjs.com/package/@opentelemetry/auto-instrumentations-node",children:"documentation"})," and tweak it properly."]}),"\n",(0,r.jsxs)(t.p,{children:["It's important to setup the NodeSDK and the automatic instrumentation ",(0,r.jsx)(t.strong,{children:"before"})," importing any library."]}),"\n",(0,r.jsxs)(t.p,{children:["This is why we will use the nodejs ",(0,r.jsx)(t.a,{href:"https://nodejs.org/api/cli.html#-r---require-module",children:(0,r.jsx)(t.code,{children:"--require"})}),"\nflag when we start up the application."]}),"\n",(0,r.jsxs)(t.p,{children:["In your ",(0,r.jsx)(t.code,{children:"Dockerfile"})," add the ",(0,r.jsx)(t.code,{children:"--require"})," flag which points to the ",(0,r.jsx)(t.code,{children:"instrumentation.js"})," file"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-Dockerfile",children:'\n# We need the instrumentation file inside the Docker image so we can use it with --require\n// highlight-add-next-line\nCOPY --chown=node:node packages/backend/instrumentation.js ./\n\n// highlight-remove-next-line\nCMD ["node", "packages/backend", "--config", "app-config.yaml"]\n// highlight-add-next-line\nCMD ["node", "--require", "./instrumentation.js", "packages/backend", "--config", "app-config.yaml"]\n'})}),"\n",(0,r.jsx)(t.h2,{id:"run-backstage",children:"Run Backstage"}),"\n",(0,r.jsx)(t.p,{children:"The above configuration will only work in production once your start a Docker container from the image."}),"\n",(0,r.jsxs)(t.p,{children:["To be able to test locally you can import the ",(0,r.jsx)(t.code,{children:"./instrumentation.js"})," file at the top (before all imports) of your backend ",(0,r.jsx)(t.code,{children:"index.ts"})," file"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"import '../instrumentation.js'\n// Other imports\n...\n"})}),"\n",(0,r.jsxs)(t.p,{children:["You can now start your Backstage instance as usual, using ",(0,r.jsx)(t.code,{children:"yarn dev"}),"."]}),"\n",(0,r.jsx)(t.p,{children:"When the backend is started, you should see in your console traces and metrics emitted by OpenTelemetry."}),"\n",(0,r.jsxs)(t.p,{children:["Of course in production you probably won't use the console exporters but instead send traces and metrics to an OpenTelemetry Collector or other exporter using ",(0,r.jsx)(t.a,{href:"https://opentelemetry.io/docs/instrumentation/js/exporters/",children:"OTLP exporters"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["If you need to disable/configure some OpenTelemetry feature there are lots of ",(0,r.jsx)(t.a,{href:"https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/",children:"environment variables"})," which you can tweak."]}),"\n",(0,r.jsx)(t.h2,{id:"references",children:"References"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://opentelemetry.io/docs/instrumentation/js/getting-started/nodejs/",children:"Getting started with OpenTelemetry Node.js"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://open-telemetry.github.io/opentelemetry-js/classes/_opentelemetry_sdk_node.NodeSDK.html",children:"OpenTelemetry NodeSDK API"})}),"\n"]})]})}function p(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},371426:(e,t,n)=>{var r=n(827378),o=Symbol.for("react.element"),s=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,a=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function u(e,t,n){var r,s={},u=null,l=null;for(r in void 0!==n&&(u=""+n),void 0!==t.key&&(u=""+t.key),void 0!==t.ref&&(l=t.ref),t)i.call(t,r)&&!c.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===s[r]&&(s[r]=t[r]);return{$$typeof:o,type:e,key:u,ref:l,props:s,_owner:a.current}}t.Fragment=s,t.jsx=u,t.jsxs=u},541535:(e,t)=>{var n=Symbol.for("react.element"),r=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),c=Symbol.for("react.context"),u=Symbol.for("react.forward_ref"),l=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),f=Symbol.iterator;var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m=Object.assign,y={};function g(e,t,n){this.props=e,this.context=t,this.refs=y,this.updater=n||h}function x(){}function b(e,t,n){this.props=e,this.context=t,this.refs=y,this.updater=n||h}g.prototype.isReactComponent={},g.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},g.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},x.prototype=g.prototype;var j=b.prototype=new x;j.constructor=b,m(j,g.prototype),j.isPureReactComponent=!0;var k=Array.isArray,v=Object.prototype.hasOwnProperty,_={current:null},w={key:!0,ref:!0,__self:!0,__source:!0};function S(e,t,r){var o,s={},i=null,a=null;if(null!=t)for(o in void 0!==t.ref&&(a=t.ref),void 0!==t.key&&(i=""+t.key),t)v.call(t,o)&&!w.hasOwnProperty(o)&&(s[o]=t[o]);var c=arguments.length-2;if(1===c)s.children=r;else if(1<c){for(var u=Array(c),l=0;l<c;l++)u[l]=arguments[l+2];s.children=u}if(e&&e.defaultProps)for(o in c=e.defaultProps)void 0===s[o]&&(s[o]=c[o]);return{$$typeof:n,type:e,key:i,ref:a,props:s,_owner:_.current}}function E(e){return"object"==typeof e&&null!==e&&e.$$typeof===n}var O=/\/+/g;function C(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function R(e,t,o,s,i){var a=typeof e;"undefined"!==a&&"boolean"!==a||(e=null);var c=!1;if(null===e)c=!0;else switch(a){case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case n:case r:c=!0}}if(c)return i=i(c=e),e=""===s?"."+C(c,0):s,k(i)?(o="",null!=e&&(o=e.replace(O,"$&/")+"/"),R(i,t,o,"",(function(e){return e}))):null!=i&&(E(i)&&(i=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(i,o+(!i.key||c&&c.key===i.key?"":(""+i.key).replace(O,"$&/")+"/")+e)),t.push(i)),1;if(c=0,s=""===s?".":s+":",k(e))for(var u=0;u<e.length;u++){var l=s+C(a=e[u],u);c+=R(a,t,o,l,i)}else if(l=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=f&&e[f]||e["@@iterator"])?e:null}(e),"function"==typeof l)for(e=l.call(e),u=0;!(a=e.next()).done;)c+=R(a=a.value,t,o,l=s+C(a,u++),i);else if("object"===a)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return c}function T(e,t,n){if(null==e)return e;var r=[],o=0;return R(e,r,"","",(function(e){return t.call(n,e,o++)})),r}function $(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var I={current:null},P={transition:null},N={ReactCurrentDispatcher:I,ReactCurrentBatchConfig:P,ReactCurrentOwner:_};t.Children={map:T,forEach:function(e,t,n){T(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return T(e,(function(){t++})),t},toArray:function(e){return T(e,(function(e){return e}))||[]},only:function(e){if(!E(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=g,t.Fragment=o,t.Profiler=i,t.PureComponent=b,t.StrictMode=s,t.Suspense=l,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=N,t.cloneElement=function(e,t,r){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=m({},e.props),s=e.key,i=e.ref,a=e._owner;if(null!=t){if(void 0!==t.ref&&(i=t.ref,a=_.current),void 0!==t.key&&(s=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(u in t)v.call(t,u)&&!w.hasOwnProperty(u)&&(o[u]=void 0===t[u]&&void 0!==c?c[u]:t[u])}var u=arguments.length-2;if(1===u)o.children=r;else if(1<u){c=Array(u);for(var l=0;l<u;l++)c[l]=arguments[l+2];o.children=c}return{$$typeof:n,type:e.type,key:s,ref:i,props:o,_owner:a}},t.createContext=function(e){return(e={$$typeof:c,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:a,_context:e},e.Consumer=e},t.createElement=S,t.createFactory=function(e){var t=S.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:u,render:e}},t.isValidElement=E,t.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:$}},t.memo=function(e,t){return{$$typeof:p,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=P.transition;P.transition={};try{e()}finally{P.transition=t}},t.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},t.useCallback=function(e,t){return I.current.useCallback(e,t)},t.useContext=function(e){return I.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return I.current.useDeferredValue(e)},t.useEffect=function(e,t){return I.current.useEffect(e,t)},t.useId=function(){return I.current.useId()},t.useImperativeHandle=function(e,t,n){return I.current.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return I.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return I.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return I.current.useMemo(e,t)},t.useReducer=function(e,t,n){return I.current.useReducer(e,t,n)},t.useRef=function(e){return I.current.useRef(e)},t.useState=function(e){return I.current.useState(e)},t.useSyncExternalStore=function(e,t,n){return I.current.useSyncExternalStore(e,t,n)},t.useTransition=function(){return I.current.useTransition()},t.version="18.2.0"},827378:(e,t,n)=>{e.exports=n(541535)},824246:(e,t,n)=>{e.exports=n(371426)},511151:(e,t,n)=>{n.d(t,{Z:()=>a,a:()=>i});var r=n(667294);const o={},s=r.createContext(o);function i(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);