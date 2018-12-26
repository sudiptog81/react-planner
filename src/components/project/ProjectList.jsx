import React from "react";
import { Link } from "react-router-dom";
import ProjectSummary from "./ProjectSummary";

const ProjectList = ({ projects }) => {
  if (projects && projects.length > 0) {
    return (
      <div className="project-list section">
        {projects &&
          projects.map(project => {
            return (
              <Link key={project.id} to={`/view/${project.id}`}>
                <ProjectSummary project={project} />
              </Link>
            );
          })}
      </div>
    );
  } else {
    return (
      <div className="section center">
        <p>No posts to show.</p>
      </div>
    );
  }
};

export default ProjectList;
