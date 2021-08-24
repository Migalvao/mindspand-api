import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import ButtonFilter from "./components/ButtonFilter";
import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import axios from "axios";

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
    setCategoryFilter(category.id);
    if (category) skillsPopup(category.skills);
    else {
      setSkills([]);
    }
    setSkillFilter("");
  };

  const fetchClasses = async () => {
    const params = new URLSearchParams();

    if (difficultyFilter) {
      params.append("difficulty", difficultyFilter);
    }
    if (categoryFilter) {
      params.append("category_id", categoryFilter);
    }
    if (skillFilter) {
      params.append("skill_id", skillFilter);
    }

    let url = "/api/classes";

    if (params.toString()) {
      url += "?" + params.toString();
    } else {
      console.log("no parameters");
    }

    let classes = [];
    axios
      .get(url)
      .then((response) => {
        classes = response.data;
        setClasses(classes);
      })
      .catch((error) => {
        classes = [];
      });
  };

  const addCategoryButtons = async () => {
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
    addCategoryButtons();
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [difficultyFilter, categoryFilter, skillFilter]);

  return (
    <Layout current_user={props.current_user}>
      <div className="filter-wrapper">
        <ButtonFilter
          props={{
            onClick: updateCategory,
            params: "",
            id: categoryFilter,
          }}
        >
          All categories
        </ButtonFilter>
        {categories.map((c, index) => {
          console.log(c.name);
          return (
            <ButtonFilter
              key={index}
              props={{
                onClick: updateCategory,
                params: c,
                id: categoryFilter,
              }}
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
            params: "",
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
