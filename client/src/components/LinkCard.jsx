import React from "react";

export const LinkCard = ({ link }) => {
  return (
    <>
      <div className="row" style={{ paddingTop: "2rem" }}>
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Link</span>
              <p>
                Link to:
                <a
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white", marginLeft: "1rem" }}
                >
                  {link.to}
                </a>
              </p>
              <p>
                Link from:
                <a
                  href={link.from}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white", marginLeft: "1rem" }}
                >
                  {link.from}
                </a>
              </p>
              <p>
                Quantity of clicks: <strong>{link.clicks}</strong>
              </p>
              <p>
                Date of creating:
                <strong> {new Date(link.date).toLocaleDateString()}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
