import React from 'react';
import TimelineItem from './TimelineItem';
import "./Timeline.css";

const Timeline = () => {
    const experiences = [
    {
      title: "Fullstack Developer",
      date: "Jan - Apr 2022",
      company: "My First Montessori School",
      location: "Brampton, ON",
      descriptions: ["Spearheaded the implementation of a proprietary, WordPress based E-learning platform to significantly enhance the remote learning experience, increasing teaching satisfaction by more than 86%", "Implemented a CRM automation system with Keap that monitors and controls the notification and sending of promotional materials to leads, reducing time spent on this by more than 70% compared to manual entry", "Organized meetings regularly with teachers and other staff members to gather crucial feedback and give updates on the development of the E-learning platform"],
      descID: [3,4,5]
    },
    {
      title: "Fullstack Developer",
      date: "Sept - Dec 2020",
      company: "Syntu Software",
      location: "Waterloo, ON",
      descriptions: ["Played key role in the design and building of a web app that allows users to upload and store image and video evidence in legal contexts while ensuring 100% compliance with confidentiality laws using AWS Services (DynamoDB, S3, Lambda)", "Developed RESTful APIs with AWS API Gateway that only allows authenticated users to interact with relevant confidential legal data", "Liaised proactively with both front and back-end developers by arranging routinely scheduled meetings"],
      descID: [6,7,8]
    },
    {
      title: "Software Developer",
      date: "Jan - May 2020",
      company: "The Co-operators",
      location: "Guelph, ON",
      descriptions: ["Improved markedly the efficiency of policy creation by more than 35% by creating a web-based automation platform using UiPath", "Created and performed regression test cases reliably for an insurance web app and generated accurate bug reports to senior developers"],
      descID: [9,10]
    }
  ];

  return (
    <>
        <div className="timeline-container">
        {
            experiences.map((experience, i) => {
                return (
                    <TimelineItem key={i} data={experience}></TimelineItem>
                );
            })
        }
        </div>
    </>
  )
}

export default Timeline;