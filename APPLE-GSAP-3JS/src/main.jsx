import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//...
// import * as Sentry from "@sentry/react";

// Sentry.init({
//   dsn: "https://760fd7e6fe8dd62f05bf5125efe94efc@o4507264019333120.ingest.de.sentry.io/4507264022544464",
//   integrations: [
//       // See docs for support of different versions of variation of react router
//       // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
//     Sentry.reactRouterV6BrowserTracingIntegration({
//         useEffect: React.useEffect,
        
//     }),
//     Sentry.replayIntegration()
//   ],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   tracesSampleRate: 1.0,

//   // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
//   tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

//   // Capture Replay for 10% of all sessions,
//   // plus for 100% of sessions with an error
//   replaysSessionSampleRate: 0.1,
//   replaysOnErrorSampleRate: 1.0,
// });


// const container = document.getElementById(“app”);
// const root = createRoot(container);
// root.render(<App />);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
