import Typewriter from 'typewriter-effect';
import { setGlobalState, useGlobalState } from '../store';

const Hero = () => {
  const [showModal] = useGlobalState('showModal');

  return (
    <div className="min-h-screen py-24 px-5 bg-white">
      <main>
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center bg-white">
            {/* Left Side */}
            <div className="text-center lg:text-left">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                Looking for a new way to showcase and sell your assets?
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Prime Asset
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto lg:ml-0">
                Your premier destination for reliable real-world asset management.
              </p>
              <div className="mt-10 flex justify-center lg:justify-start">
                <div className="inline-flex rounded-md shadow">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="p-20">
              <div className="relative bg-slate-100 p-4 h-full w-full rounded-lg overflow-hidden shadow-lg shadow-stone-400">
                <img
                  src="https://m.foolcdn.com/media/dubs/images/original_imageshttpsg.foolcdn.comeditorialimag.width-880_8rrEeU4.jpg" // Replace with your image URL
                  alt="Hero"
                  className="h-full w-full object-contain rounded-md"
                />
                <div className="absolute inset-0 text-yellow-300 text-xl font-semibold bg-opacity-50 flex items-center justify-center">
                  <Typewriter
                    options={{
                      strings: [
                        'Mint your assets to NFTs',
                        'Securely transfer ownership',
                        'Join the NFT revolution with ease',
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 25,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                Features
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                What We Offer
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Our services are designed to meet your needs with precision and care.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      Asset Management
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Comprehensive management services to keep your assets performing at their best.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      Investment Strategies
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Tailored investment strategies to maximize your returns and secure your future.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      Advisory Services
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Expert advice to help you make informed decisions and achieve your financial
                    goals.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white mt-16">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                Testimonials
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                What Our Clients Say
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Hear from our satisfied clients about their experiences with Prime Asset.
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    "Prime Asset has transformed my investment portfolio. Their expertise and
                    dedication are unmatched."
                  </p>
                  <p className="mt-4 text-base text-gray-500">- John Doe</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    "I am extremely satisfied with their services. Prime Asset truly cares about
                    their clients' success."
                  </p>
                  <p className="mt-4 text-base text-gray-500">- Jane Smith</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    "Their investment strategies have significantly boosted my returns. Highly
                    recommend Prime Asset!"
                  </p>
                  <p className="mt-4 text-base text-gray-500">- Alex Johnson</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;
