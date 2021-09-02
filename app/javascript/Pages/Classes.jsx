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
  const [categoryFilter, setCategoryFilter] = useState({
    id: props.category_id ? props.category_id : "",
  });
  const [skillFilter, setSkillFilter] = useState({
    id: props.skill_id ? props.skill_id : null,
  });
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const dif = ["beginner", "intermediate", "advanced"];

  const updateCategory = (category) => {
    if (category.id) {
      setSkills(category.skills);
      setCategoryFilter(category);
    } else {
      setSkills([]);
      setCategoryFilter({ id: "" });
    }
    setSkillFilter({});
  };

  const fetchClasses = () => {
    const params = {};

    if (categoryFilter.id) {
      params.category_id = categoryFilter.id;
    }

    if (difficultyFilter) {
      params.difficulty = difficultyFilter;
    }

    if (skillFilter.id) {
      params.skill_id = skillFilter.id;
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

  useEffect(() => {
    getCategoryButtons();
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [difficultyFilter, categoryFilter, skillFilter]);

  return (
    <Layout current_user={props.current_user}>
      <div className="filter-wrapper">
        <ButtonFilter onClick={updateCategory} id={categoryFilter.id}>
          All categories
        </ButtonFilter>
        {categories.map((c, index) => {
          return (
            <ButtonFilter
              key={index}
              onClick={updateCategory}
              params={c}
              id={categoryFilter.id}
            >
              {c.name}
            </ButtonFilter>
          );
        })}
      </div>
      <div className="filter-wrapper">
        <ButtonFilter onClick={updateDif} id={difficultyFilter}>
          All
        </ButtonFilter>
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
      <div className="classes">
        <div className="classe-titles">
          <h1 className="home-title">
            {skillFilter.name ? skillFilter.name : "All skills"} &nbsp;
          </h1>
          <h2 className="sub-title">{difficultyFilter}</h2>
        </div>
        <div className="classes-wrapper">
          {classes.length ? (
            classes.map((c, index) => {
              return <CardClasses classesData={c} key={index} />;
            })
          ) : (
            <p className="no-classes">No classes found</p>
          )}
        </div>
      </div>
      {skills.length ? (
        <div
          className="pop-up"
          style={{ "--colorCategory": `#${categoryFilter.color}` }}
        >
          <div
            className="pop-up-exit"
            onClick={() => {
              setSkills([]);
            }}
          >
            <FaTimes />
          </div>
          <div className="pop-up-text">
            <p
              className="pop-up-text-p"
              onClick={() => {
                setSkillFilter({});
                setSkills([]);
              }}
            >
              All skills
            </p>
            {skills.map((s, index) => {
              return (
                <p
                  className="pop-up-text-p"
                  key={index}
                  onClick={() => {
                    setSkillFilter({ id: s.id, name: s.name });
                    setSkills([]);
                  }}
                >
                  {s.name}
                </p>
              );
            })}
          </div>
        </div>
      ) : null}
    </Layout>
  );
};

Classes.propTypes = {
  current_user: PropTypes.object.isRequired,
  category_id: PropTypes.string,
  skill_id: PropTypes.string,
};

export default Classes;
