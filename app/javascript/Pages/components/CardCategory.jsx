import React from "react";
import PropTypes from "prop-types";

const CardCategory = ({ categoryData }) => {
  return (
    <div
      className="card-category"
      style={{ "--colorCategory": `#${categoryData.color}` }}
    >
      {categoryData.name}
    </div>
  );
};

CardCategory.propTypes = {
  categoryData: PropTypes.object.isRequired,
};

export default CardCategory;
