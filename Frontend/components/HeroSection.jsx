export default function HeroSection() {
    return (
      <section className=" text-black py-20 px-8 ">
        <h1 className="text-4xl font-bold mb-4 mx-4 text-center">
          Brain Tumor Prediction Project 
        </h1>
        <p className="text-lg mb-8">
          Our project utilizes <span className="text-green-400 font-semibold">advanced machine learning algorithms</span> to predict brain tumors. It can detect various types of brain tumors, including <span className="text-blue-400 font-semibold">glioma</span>, <span className="text-blue-400 font-semibold">pituitary tumors</span>, and more. If no tumor is detected, it provides a <span className="text-red-400 font-semibold">no tumor</span>.
        </p>

      </section>
      
    );
  }
  