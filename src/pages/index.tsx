/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import ProfilePic from "../../public/profile-pic.jpg";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { CurvedArrowSvg } from "../icons/CurvedArrow";
import { Image } from "../components/Image";

const Home: React.FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>Home | Diego Albitres</title>
      </Head>
      <main className="flex items-center h-full space-x-4">
        <div className="flex flex-col space-y-8">
          <span className="text-xl font-medium tracking-wide text-gray-200">Hey there, my name is</span>
          <h1 className="text-7xl font-bold tracking-wide text-gray-100">Diego Albitres.</h1>
          <p className="text-lg text-gray-400">
            I'm a software engineer specializing in building (and occasionally designing) web applications and
            experiences. I'm currently studying at{" "}
            <a href="https://upc.edu.pe/" className="pretty-link text-gray-200">
              Universidad Peruana de Ciencias Aplicadas
            </a>
            .
          </p>
          <div className="flex"></div>
        </div>
        <div className="flex justify-end items-center">
          <div className="flex flex-col space-y-2 relative">
            <div className="absolute -top-6 -left-16 -rotate-6">
              <div className="flex">
                <span className="mr-2">That's me!</span>
                <CurvedArrowSvg className="h-8 w-8" />
              </div>
            </div>
            <div className="h-64 w-64 rounded-xl overflow-hidden">
              <Image src={ProfilePic} alt="Diego's profile picture in Chicago" />
            </div>
            <div className="flex justify-end items-center space-x-1 text-sm text-gray-400">
              <LocationMarkerIcon className="w-6 h-6" />
              <a href="https://goo.gl/maps/83AKs6rvpjdLm6sj8" className="pretty-link">
                DuSable Bridge, Chicago
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
