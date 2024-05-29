import Section1 from "./Sections/Section1";
import Section3 from "./Sections/Section3";

import Footer from "./Sections/Footer";

const Home = () => {
  return (
    <main>
      {/* INTRO*/}
      <Section1 />

    {/* BEST HOUSES */}
    <Section3 />

      <Footer />
    </main>
  );
};

export default Home;
