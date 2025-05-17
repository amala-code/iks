
import React from "react";
import { managingCommittee, executiveCommittee } from './CoreTeamData';
import "./Member.css";

const MemberCard = ({ image, name, role }) => (
  <div className="member-card">
    <div className="member-image-container">
      <img src={image} alt={name} />
    </div>
    <h4 className="name">{name}</h4>
    <p className="role">{role}</p>
  </div>
);

const PresidentMessage = () => (
  <div className="president-message-container">
    <div className="president-message-content">
      <div className="president-image">
        <img src={managingCommittee[1].image} alt={managingCommittee[1].name} />
      </div>
      <div className="president-text">
        <h3>Message from the President</h3>
        <p>
        A community is more than a place—it’s where we grow, support one another, and build something meaningful together.

It has been a true honor to serve as President of The Indore Keraleeya Samajam for over two decades. Throughout this journey, I’ve witnessed the unity, resilience, and cultural richness that define us.

From our humble beginnings in the 1950s—thanks to pioneers like Late Shri K.V. Mathews—to the formal establishment of IKS in 1961, our community has grown stronger each year. Uniquely, we remain the only unified Keralite association in Indore, committed to inclusivity and social welfare.

Our pride, the Keraleeya Samajam Public School, reflects our dedication to affordable, quality education and service to society.

With the support of around 85 families, we’ve achieved much—and there’s more to come. Thank you for your unwavering encouragement and commitment to our shared values.

Let us continue forward, united in purpose and spirit.
        </p>
        <div className="president-signature">
          <span>{managingCommittee[1].name}</span>
          <span className="president-title">President</span>
        </div>
      </div>
    </div>
  </div>
);

const Member = () => (
  <div className="committee-container">
    <div className="page-header">
      <h2 className="section-head">Core Team</h2>
      <div className="header-underline"></div>
      <p className="core-team-subtext">
        Meet the dedicated individuals leading our community with vision, experience, and a strong commitment to excellence.
      </p>
    </div>

    <PresidentMessage />

    <div className="committee-section">
      <h2 className="section-title">MANAGING COMMITTEE</h2>
      <div className="section-underline"></div>
      <div className="tree-container">
        <div className="tree-node top-node">
          <MemberCard {...managingCommittee[0]} />
        </div>
        <div className="connector-line vertical"></div>
        <div className="tree-row second-row">
          {managingCommittee.slice(1, 3).map((member) => (
            <MemberCard key={member.id} {...member} />
          ))}
        </div>
        <div className="connector-line vertical"></div>
        <div className="tree-row bottom-row">
          {managingCommittee.slice(3).map((member) => (
            <MemberCard key={member.id} {...member} />
          ))}
        </div>
      </div>
    </div>

    <div className="committee-section">
      <h2 className="section-title">EXECUTIVE COMMITTEE</h2>
      <div className="section-underline"></div>
      <div className="grid-container">
        {executiveCommittee.map((member) => (
          <MemberCard key={member.id} {...member} />
        ))}
      </div>
    </div>
  </div>
);

export default Member;