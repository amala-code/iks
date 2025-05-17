// import React from "react";
// import "./Art.css";
// import { NavLink } from "react-router-dom";
// import data from "../../Data/art.json";
// import data2 from "../../Data/art2.json";
// import { FaArrowRight } from "react-icons/fa";
// const Art = () => {
//   return (
//     <>
//       <div className="art_mainContainer">
//         <div className="art_headContainer">
//           <div className="art_headContnainer_text">
//             <h1 className="art_heading">Art & Culture</h1>
//             <p className="art_subhead">
//               Preserving and celebrating Kerela Culture in indore
//             </p>
//           </div>
//         </div>
//         <div className="art_subContainer1">
//           <div className="art_sunContainer1_textContainer">
//             <div className="art_subContainer_headText">
//               Celebrating Our Rich Cultural Heritage
//             </div>
//             <p className="art_subcontainer1_text">
//               Namaskaram! For us Malayalees, art and culture are like the
//               coconut and its tender flesh - you simply cannot separate one from
//               the other. Here at The Indore Keraleeya Samajam, we cherish our
//               kalakshetram (cultural space) where the rhythms of chenda, the
//               graceful movements of Mohiniyattam, and the melodious strains of
//               Sopana Sangeetham come alive. From the moment our Samajam took
//               root in Indore, we've been passionate about keeping our beloved
//               Kerala arts flourishing in this nadan (land). Whether it's the
//               soul-stirring performances during our thiruvathira nights or the
//               vibrant chendamelam during festivals, each program adds a splash
//               of Kerala's colors to Indore's cultural canvas.
//             </p>
//             <p className="art_subcontainer1_text">
//               Every time we gather, it's a celebration of our paramparyam
//               (heritage). Our cultural calendar is as rich as a traditional
//               Kerala sadya - from children learning their first steps of Kerala
//               Natanam to our respected elders sharing stories through
//               Kathaprasangam. During Onam, our venue transforms into a slice of
//               Kerala, complete with pookkalam competitions, thiruvathirakkali,
//               and klassic Kerala music. We've been blessed to host many talented
//               artists from our motherland - renowned musicians, dancers, and
//               theatre artists who bring the essence of Kerala to our doorstep.
//               Our stage has become a cherished space where both traditional art
//               forms and contemporary expressions of our culture thrive, making
//               every gathering feel like a festival back home. Pinne alla!
//               (Indeed!)
//             </p>
//           </div>
//           <div className="art_button_container">
//             <NavLink style={{ textDecoration: "none" }} to="/signup" className="art_button">
//               Join our community now
//             </NavLink>
//           </div>
//         </div>
//         <div className="art_subContainer2">
//           <div className="art_subContainer2_textContainer">
//             <div
//               style={{ marginTop: "30px" }}
//               className="art_subContainer_headText"
//             >
//               Discover Our Cultural Heritage
//             </div>
//           </div>
//           <div className="art_subContianer_gridHead">
//             <div className="art_subContiner2_gridContainer">
//               {data.map((item) => (
//                 <div key={item.id} className="art_cardContainer">
//                   <img
//                     src={`../../Images/${item.image}`}
//                     alt={item.heading}
//                     className="art_cardImage"
//                   />
//                   <div className="art_cardTextcontainer">
//                     <h3 className="art_cardHeading">{item.heading}</h3>
//                     <p className="art_cardText">{item.text}</p>
//                     <a href={item.link} className="art_cardButton">
//                       Learn More <FaArrowRight />
//                     </a>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="art_subContainer3">
//           <div className="art_subContainer2_textContainer">
//             <div
//               style={{ marginTop: "80px", marginBottom: "-10px" }}
//               className="art_subContainer_headText"
//             >
//               Cultural Highlight
//             </div>
//           </div>
//           <div className="art_subContianer_gridHead">
//             <div className="art_subContiner2_gridContainer">
//               {data2.map((item) => (
//                 <div key={item.id} className="art_cardContainer">
//                   <img
//                     src={`../../Images/${item.image}`}
//                     alt={item.heading}
//                     className="art_cardImage"
//                   />
//                   <div className="art_cardTextcontainer cardContainerFlex">
//                     <h3 className="art_cardHeading">{item.heading}</h3>
//                     <p className="art_cardText">{item.text}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Art;
