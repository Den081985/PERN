import React from "react";
import { Link } from "react-router-dom";

export const LinkList = ({ links }) => {
  if (!links.length) {
    return <h4 className="center">There are no links yet</h4>;
  }
  return (
    <table className="striped">
      <thead>
        <tr>
          <th>N</th>
          <th>Original</th>
          <th>Shorten</th>
          <th>Open</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={link.id}>
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>
                <Link to={`/detail/${link.id}`}>Open</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
