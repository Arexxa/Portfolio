import React from "react";
import Navbar from "../../components/Navbar";

function Project() {
  return (
    <div className="w-full h-full flex flex-col justify-start bg-black">
      <Navbar />
      <di className="px-8 py-10 flex flex-col justify-center items-center h-full bg-black">
        <div className="Roboto text-3xl text-primary py-8 w3-container w3-center w3-animate-top">
          RELEVANT PROJECTS
        </div>
        <div className="flex flex-col gap-4 justify-start items-center">
          <div className="flex flex-col gap-2 Roboto">
            <div className="p-3 border-2 border-primary rounded-lg w3-container w3-center w3-animate-right">
              <div className="flex flex-row gap-2">
                <div className="text-primary">ROLE:</div>
                <div className="text-white">Machine Learning Developer</div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="text-primary">Project Name:</div>
                <div className="text-white">Aqua Detect IOT</div>
              </div>
              <div className="text-left text-white">
                <ul>
                  <li>
                    Created a model that able to identify the type of prawns,
                    its gender and the measurement.
                  </li>
                  <li>
                    Created a GUI for users to input the images of prawns and
                    detect its type and gender
                  </li>
                </ul>
              </div>
              <div className="flex flex-row gap-2">
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  Python
                </p>
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  Machine learning
                </p>
                <p className="border-0 rounded-md bg-primary px-2 py-1">CNN</p>
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  Roboflow
                </p>
              </div>
            </div>

            <div className="p-3 border-2 border-primary rounded-lg mt-4 w3-container w3-center w3-animate-left">
              <div className="flex flex-row gap-2">
                <div className="text-primary">ROLE:</div>
                <div className="text-white">Frontend Developer</div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="text-primary">Project Name:</div>
                <div className="text-white">
                  Solvnex System, Petroliam Nasional Berhad (PETRONAS)
                </div>
              </div>
              <div className="text-left text-white">
                <ul>
                  <li>
                    Successfully contributed in this project in integrating the
                    system using VueJs framework.
                  </li>
                  <li>
                    Co-worked with other developers in a team to complete the
                    system.
                  </li>
                </ul>
              </div>
              <div className="flex flex-row gap-2">
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  VueJs
                </p>
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  Integration
                </p>
              </div>
            </div>

            <div className="p-3 border-2 border-primary rounded-lg mt-4 w3-container w3-center w3-animate-right">
              <div className="flex flex-row gap-2">
                <div className="text-primary">ROLE:</div>
                <div className="text-white">Frontend Developer</div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="text-primary">Project Name:</div>
                <div className="text-white">
                  Aramco Official Website, Aramco Sdn. Bhd
                </div>
              </div>
              <div className="text-left text-white">
                <ul>
                  <li>
                    Successfully delivered this project as transformed the
                    designs given by the client into interactable code using
                    html, css, tailwind and grid system.
                  </li>
                  <li>
                    Co-worked with other developers in a team to complete the
                    website.
                  </li>
                </ul>
              </div>
              <div className="flex flex-row gap-2">
                <p className="border-0 rounded-md bg-primary px-2 py-1">HTML</p>
                <p className="border-0 rounded-md bg-primary px-2 py-1">CSS</p>
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  Tailwind
                </p>
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  Grid System
                </p>
              </div>
            </div>

            <div className="p-3 border-2 border-primary rounded-lg mt-4 w3-container w3-center w3-animate-left">
              <div className="flex flex-row gap-2">
                <div className="text-primary">ROLE:</div>
                <div className="text-white">Frontend Developer</div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="text-primary">Project Name:</div>
                <div className="text-white">
                  Kreno System, Krenovator Technology Sdn Bhd
                </div>
              </div>
              <div className="text-left text-white">
                <ul>
                  <li>
                    Contributed in Designed and integrated the system using
                    VueJs framework.
                  </li>
                  <li>
                    Co-worked with other developers in a team to complete the
                    website.
                  </li>
                  <li>Added new features and functionalities to the system.</li>
                </ul>
              </div>
              <div className="flex flex-row gap-2">
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  VueJs
                </p>
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  Integration
                </p>
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  Quasar
                </p>
              </div>
            </div>
          </div>
        </div>
      </di>
    </div>
  );
}

export default Project;
