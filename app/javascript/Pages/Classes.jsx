import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Layout from "./Layout";
import ButtonFilter from "./components/ButtonFilter";
import CardClasses from "./components/CardClasses";

const Classes = (props) => {
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [classes, setClasses] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const dif = ["beginner", "intermediate", "advanced"];

  const updateCategory = (category) => {
    if (category.id) {
      skillsPopup(category.skills);
      setCategoryFilter(category.id);
    } else {
      setSkills([]);
      setCategoryFilter("");
    }
    setSkillFilter("");
  };

  const fetchClasses = () => {
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
        console.log(error);
        classes = [];
      });
  };

  const getCategoryButtons = () => {
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

  const updateDif = (difficulty) => {
    if (difficulty.id) setDifficultyFilter(difficulty.id);
    else {
      setDifficultyFilter("");
    }
  };

  const skillsPopup = (skills) => {
    const components = skills.map((s, index) => (
      <p
        key={index}
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
        {dif.map((d, index) => {
          return (
            <ButtonFilter
              key={index}
              onClick={updateDif}
              params={{ id: d }}
              id={difficultyFilter}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </ButtonFilter>
          );
        })}
      </div>
      <div>
        {classes.map((c, index) => {
          return <CardClasses classesData={c} key={index} />;
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
          <ul>{skills}</ul>
        </div>
      ) : null}
    </Layout>
  );
};

Classes.propTypes = {
  current_user: PropTypes.object.isRequired,
};

export default Classes;
