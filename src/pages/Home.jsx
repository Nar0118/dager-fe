import React from "react";
import { Carousel } from "antd";

import "./home.css";

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Home = () => {
  return (
    <div className="home_body">
      <div class="bg">
        <header>
          <Carousel arrows infinite={false} autoplay>
            <div className="carouselItem">
              <img src="/product/braka-pads-formula.png" alt="" />
            </div>
            <div className="carouselItem">
              <img src="/product/brake-fluid.png" alt="" />
            </div>
            <div className="carouselItem">
              <img src="/product/disc-rotor.png" alt="" />
            </div>
            <div className="carouselItem">
              <img src="/product/shoes-and-linings.png" alt="" />
            </div>
          </Carousel>
        </header>
        <section id="content">
          <div class="main">
            <div class="container_12">
              <div class="wrapper p5">
                <article class="grid_4">
                  <div class="wrapper">
                    <figure class="img-indent">
                      <img src="images/page1-img1.png" alt="" />
                    </figure>
                    <div class="extra-wrap">
                      <h4>Engine Repair</h4>
                      <p class="p2">
                        Lorem ipsum dolosit amet, consetetur sadipng elitr sed
                        diam nonumy eirmod.
                      </p>
                    </div>
                  </div>
                </article>
                <article class="grid_4">
                  <div class="wrapper">
                    <figure class="img-indent">
                      <img src="images/page1-img2.png" alt="" />
                    </figure>
                    <div class="extra-wrap">
                      <h4>Wheel Alignment</h4>
                      <p class="p2">
                        Tempor invidunt ut labore et dolore magna aliquyam erat,
                        sed diam voluptua.
                      </p>
                    </div>
                  </div>
                </article>
                <article class="grid_4">
                  <div class="wrapper">
                    <figure class="img-indent">
                      <img src="images/page1-img3.png" alt="" />
                    </figure>
                    <div class="extra-wrap">
                      <h4>Fluid Exchanges</h4>
                      <p class="p2">
                        No sea takimata sanctus est gorem ipsum dolor sit amet
                        forem ipsum.
                      </p>
                    </div>
                  </div>
                </article>
              </div>
              <div class="container-bot">
                <div class="container-top">
                  <div class="container">
                    <div class="wrapper">
                      <article class="grid_8">
                        <div class="indent-left">
                          <h2>Welcome!</h2>
                          <p class="prev-indent-bot">
                            <strong>Car Repair</strong> is one of free website
                            templates created by TemplateMonster.com team. This
                            website template is optimized for 1280X1024 screen
                            resolution. It is also XHTML &amp; CSS valid.{" "}
                          </p>
                          <p class="border-bot">
                            This Car Repair Template goes with two packages –
                            with PSD source files and without them. PSD source
                            files are available for free for the registered
                            members of TemplatesMonster.com. The basic package
                            (without PSD source) is available for anyone without
                            registration.
                          </p>
                        </div>
                        <div class="wrapper">
                          <div class="grid_4 alpha">
                            <div class="indent-left">
                              <div class="maxheight indent-bot">
                                <h3>About Us</h3>
                                <p class="prev-indent-bot">
                                  <a class="link-1" href="#">
                                    Lorem ipsum dolor amet
                                  </a>{" "}
                                  conse ctetur adipisicing elit, sed do eiusmod
                                  tempor incididunt ut labore et dolore magna
                                  aliqua. Ut enim ad minim veniam, quis nostrud
                                  exercitation ullamco laboris nisi ut aliquip.
                                </p>
                                <a class="link-1" href="#">
                                  Dolor amet conse ctetur
                                </a>{" "}
                                adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat ut enim ad.{" "}
                              </div>
                            </div>
                          </div>
                          <div class="grid_4 omega">
                            <div class="indent-left2">
                              <div class="maxheight indent-bot">
                                <h3 class="p0">Our Services</h3>
                                <ul class="list-1">
                                  <li>
                                    <a href="#">
                                      Complete Computer Diagnostics
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">Complete Safety Analysis</a>
                                  </li>
                                  <li>
                                    <a href="#">Drivability Problems</a>
                                  </li>
                                  <li>
                                    <a href="#">Oil Changes</a>
                                  </li>
                                  <li>
                                    <a href="#">Emission Repair Facility</a>
                                  </li>
                                  <li>
                                    <a href="#">Air Conditioning Service</a>
                                  </li>
                                  <li>
                                    <a href="#">Electrical Systems</a>
                                  </li>
                                  <li>
                                    <a href="#">Fleet Maintenance</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                      <article class="grid_4">
                        <div class="indent-left2 indent-top">
                          <div class="box p4">
                            <div class="padding">
                              <div class="wrapper">
                                <figure class="img-indent">
                                  <img src="images/page1-img4.png" alt="" />
                                </figure>
                                <div class="extra-wrap">
                                  <h3 class="p0">Our Hours:</h3>
                                </div>
                              </div>
                              <p class="p1">
                                <strong>24 Hour Emergency Towing</strong>
                              </p>
                              <p class="color-1 p0">
                                Monday - Friday: 7:30 am - 6:00
                              </p>
                              <p class="color-1 p1">Saturday: 7:30 am - Noon</p>
                              Night Drop Available{" "}
                            </div>
                          </div>
                          <figure class="indent-bot">
                            <iframe
                              width="260"
                              height="202"
                              src="http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Brooklyn,+New+York,+NY,+United+States&amp;aq=0&amp;sll=37.0625,-95.677068&amp;sspn=61.282355,146.513672&amp;ie=UTF8&amp;hq=&amp;hnear=Brooklyn,+Kings,+New+York&amp;ll=40.649974,-73.950005&amp;spn=0.01628,0.025663&amp;z=14&amp;iwloc=A&amp;output=embed"
                            ></iframe>
                          </figure>
                          <div class="indent-left">
                            {/* <dl class="main-address">
                          <dt>Demolink.org 8901 Marmora Road,<br>
                            Glasgow, D04 89GR.</dt>
                          <dd><span>Telephone:</span> +1 959 552 5963;</dd>
                          <dd><span>FAX:</span> +1 959 552 5963</dd>
                          <dd><span>E-mail:</span><a href="#">mail@demolink.org</a></dd>
                        </dl> */}
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <div class="main">
            {" "}
            <span>
              Copyright &copy; <a href="#">Domain Name</a> All Rights Reserved
            </span>{" "}
            Design by{" "}
            <a target="_blank" href="http://www.templatemonster.com/">
              TemplateMonster.com
            </a>{" "}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
