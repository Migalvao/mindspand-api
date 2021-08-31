import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Head } from "@inertiajs/inertia-react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SocialCard from "./components/SocialCard";
import CardCategory from "./components/CardCategory";
import CardPopular from "./components/CardPopular";
import ButtonFilter from "./components/ButtonFilter";

function Homepage(props) {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [cats, setCat] = useState([]);
  const [pclasses, setPClasses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [difFilter, setDifFilter] = useState("beginner");
  const dif = ["beginner", "intermediate", "advanced"];

  const fetchClassesDifficulty = () => {
    let newClassData = [];
    axios
      .get(`/api/classes?difficulty=${difFilter}`)
      .then((response) => {
        newClassData = response.data;
        setItems(newClassData);
      })
      .catch((error) => {
        console.log(error);
        newClassData = [];
      });
  };

  const fetchCategories = () => {
    let categoryData = [];
    axios
      .get("/api/skills")
      .then((response) => {
        categoryData = response.data;
        setCat(categoryData);
      })
      .catch((error) => {
        console.log(error);
        categoryData = [];
      });
  };

  const fetchPopularClasses = () => {
    let popularClassData = [];
    axios
      .get("/api/classes")
      .then((response) => {
        popularClassData = response.data;
        setPClasses(popularClassData);
      })
      .catch((error) => {
        console.log(error);
        popularClassData = [];
      });
  };

  const addCategoryButtons = () => {
    let categories = [];
    axios
      .get(`/api/skills`)
      .then((response) => {
        categories = response.data;

        setCategories(categories);
      })
      .catch((error) => {
        console.log(error);
        categories = [];
      });
  };

  const fetchClasses = () => {
    const params = {};

    if (categoryFilter) {
      params.category_id = categoryFilter;
    }

    let url = "/api/classes";
    let classes = [];
    axios
      .get(url, { params: params })
      .then((response) => {
        classes = response.data;

        setPClasses(classes);
      })
      .catch((error) => {
        console.log(error);
        classes = [];
      });
  };

  const updateCategory = (category) => {
    if (category.id) setCategoryFilter(category.id);
    else {
      setCategoryFilter("");
    }
  };
  useEffect(() => {
    fetchClasses();
  }, [categoryFilter]);

  const updateDif = (difficulty) => {
    if (difficulty.id) setDifFilter(difficulty.id);
    else {
      setDifFilter("");
    }
  };

  useEffect(() => {
    fetchClassesDifficulty();
  }, [difFilter]);

  useEffect(() => {
    fetchCategories();
    fetchPopularClasses();
    addCategoryButtons();
  }, []);

  return (
    <main>
      <Head title="Welcome" />
      <Navbar current_user={props.current_user} />
      <div className="hero-img">
        <h1 className="hero-title">{t("hero-title")}</h1>
      </div>
      <div className="new-classes">
        <h1 className="home-title">{t("first-title")}</h1>

        <div className="filter-wrapper">
          {dif.map((d, index) => {
            return (
              <ButtonFilter
                key={index}
                onClick={updateDif}
                params={{ id: d }}
                id={difFilter}
              >
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </ButtonFilter>
            );
          })}
        </div>

        <div className="new-classes-wrapper">
          {items.map((item, index) => {
            return <SocialCard newClassData={item} key={index} />;
          })}
        </div>
      </div>

      <div className="categories">
        <h1 className="home-title">{t("second-title")}</h1>

        <div className="categories-wrapper">
          {cats.map((cat, index) => {
            return <CardCategory categoryData={cat} key={index} />;
          })}
        </div>
      </div>

      <div className="popular">
        <h1 className="home-title">{t("third-title")}</h1>

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

        <div className="popular-wrapper">
          {pclasses.map((pclass, index) => {
            return <CardPopular popularClassData={pclass} key={index} />;
          })}
        </div>
      </div>

      <Footer />
    </main>
  );
}

Homepage.propTypes = {
  current_user: PropTypes.object,
};

export default Homepage;
