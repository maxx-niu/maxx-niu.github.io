import React from "react";
import "./TimelineItem.css";

const TimelineItem = ({data}) => {

  return (
    <div className="timeline-item">
        <div className="timeline-item-content">
            <div className="timeline-date">
                <h3>{data.date}</h3>
            </div>
            <div className="timeline-title">
                <h3>{data.title} | <i>{data.company}</i></h3>
            </div>
            <div className="timeline-location">
                <h4>{data.location}</h4>
            </div>
            <div className="timeline-description">
                {
                    data.descriptions.map((description, i) => {
                        return (
                            <p key={data.descID[i]}>
                                <b>•</b> {description}
                            </p>
                        );
                    })
                }
            </div>
            <span className="circle"></span>
        </div>
    </div>
  )
}

export default TimelineItem;