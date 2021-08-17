import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "./Layout";
import "../stylesheets/body.css";
import ButtonFilter from "./ButtonFilter";
import { FaTimes } from "react-icons/fa";

const Classes = (props) => {
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [classes, setClasses] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] =
    useState("");

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
      console.log(params.toString());
      url += "?" + params.toString();
    } else {
      console.log("no parameters");
    }

    console.log(url);
    let classes = [];
    try {
      const response = await fetch(url);
      classes = await response.json();
    } catch (error) {
      console.log(error);
      classes = [];
    }

    const components = classes.map((c) => {
      return <p>{c.title}</p>;
    });

    setClasses(components);
  };

  const addCategoryButtons = async () => {
    let categories = [];
    try {
      const response = await fetch(`/api/skills`);
      categories = await response.json();
    } catch (error) {
      console.log(error);
      categories = [];
    }

    const categoryComponents = [];

    categories.map((c, i) => {
      categoryComponents.push(
        <ButtonFilter
          props={{
            onClick: updateCategory,
            params: c,
          }}
        >
          {c.name}
        </ButtonFilter>
      );
    });

    setCategories(categoryComponents);
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
          }}
        >
          All categories
        </ButtonFilter>
        {categories}
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
      <div>{classes}</div>
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

export default Classes;
