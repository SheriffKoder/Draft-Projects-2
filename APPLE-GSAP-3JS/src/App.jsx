import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
import Model from "./components/Model"


// sentry
import * as Sentry from "@sentry/react";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/footer";



const App = () => {
  
//   return <button
//   type="button"
//   onClick={() => {
//     throw new Error('Sentry Test Error');
//   }}
// >
//   Break the world
// </button>;


  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}

// export default App

//Wrap the app in sentry
export default Sentry.withProfiler(App);