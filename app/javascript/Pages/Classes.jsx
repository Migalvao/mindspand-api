import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useState, useEffect } from "react;";
import { FaTimes } from "react-icons/fa";
import Layout from "./Layout";
import ButtonFilter from "./components/ButtonFilter";

const Classes = (props) => {
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [classes, setClasses] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [difFilter, setDifFilter] = useState("beginner");
  const dif = ["beginner", "intermediate", "advanced"];

  const updateCategory = (category) => {
    if (category) {
      skillsPopup(category.skills);
      setCategoryFilter(category.id);
    } else {
      setSkills([]);
      setCategoryFilter("");
    }
    setSkillFilter("");
  };

  const fetchClasses = async () => {
    const params = {};

    if (categoryFilter) {
      params.category_id = categoryFilter;
    }

    if (difficultyFilter) {
      params.difficulty = difficultyFilter;
    }

    if (skillFilter) {
      params.skill_id = skillFilter;
    }

    let url = "/api/classes";

    let classes = [];
    axios
      .get(url, { params: params })
      .then((response) => {
        classes = response.data;
        setClasses(classes);
      })
      .catch((error) => {
        classes = [];
      });
  };

  const getCategoryButtons = async () => {
    let url = "/api/skills";
    let categories = [];
    axios
      .get(url)
      .then((response) => {
        categories = response.data;
        setCategories(categories);
      })
      .catch((error) => {
        console.log(error);
        categories = [];
      });
  };

  const addDifficultyButtons = () => {
    const buttons = [
      <ButtonFilter
        props={{
          onClick: setDifficultyFilter,
          params: "beginner",
        }}
      >
        Beginner
      </ButtonFilter>,
      <ButtonFilter
        props={{
          onClick: setDifficultyFilter,
          params: "intermediate",
        }}
      >
        Intermediate
      </ButtonFilter>,
      <ButtonFilter
        props={{
          onClick: setDifficultyFilter,
          params: "advanced",
        }}
      >
        Advanced
      </ButtonFilter>,
    ];

    return buttons;
  };

  const skillsPopup = (skills) => {
    const components = skills.map((s) => (
      <p
        onClick={() => {
          setSkillFilter(s.id);
          setSkills([]);
        }}
      >
        {s.name}
      </p>
    ));
    components.unshift(
      <p
        onClick={() => {
          setSkillFilter("");
          setSkills([]);
        }}
      >
        All skills
      </p>
    );
    setSkills(components);
  };

  useEffect(() => {
    getCategoryButtons();
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [difficultyFilter, categoryFilter, skillFilter]);

  return (
    <Layout current_user={props.current_user}>
      <div className="filter-wrapper">
        <ButtonFilter onClick={updateCategory} id={categoryFilter}>
          All categories
        </ButtonFilter>
        {categories.map((c, index) => {
          console.log(c.name);
          return (
            <ButtonFilter
              key={index}
              onClick={updateCategory}
              params={c}
              id={categoryFilter}
            >
              {c.name}
            </ButtonFilter>
          );
        })}
      </div>
      <div className="filter-wrapper">
        <ButtonFilter
          props={{
            onClick: setDifficultyFilter,
          }}
        >
          All
        </ButtonFilter>
        {addDifficultyButtons()}
      </div>
      <div>
        {classes.map((c, index) => {
          return c.title;
        })}
      </div>
      {skills.length ? (
        <div>
          <div
            // className="menu-icon"
            onClick={() => {
              setSkills([]);
            }}
          >
            <FaTimes />
          </div>
          <ul
          // className={
          //   skills.length ? "nav-menu active" : "nav-menu"
          // }
          >
            {skills}
          </ul>
        </div>
      ) : null}
    </Layout>
  );
};

Classes.propTypes = {
  current_user: PropTypes.object.isRequired,
};

export default Classes;
