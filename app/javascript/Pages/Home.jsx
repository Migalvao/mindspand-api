import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Head } from "@inertiajs/inertia-react";
import { useState, useEffect } from "react";
import SocialCard from "./components/SocialCard";
import "../stylesheets/home.scss";
import ButtonDifficultyFilter from "./components/ButtonDifficultyFilter";
import CardCategory from "./components/CardCategory";
import CardPopular from "./components/CardPopular";

function Homepage(props) {
  const token = document.querySelector("[name=csrf-token]").content;
  const headers = { "X-CSRF-Token": token };

  const [items, setItems] = useState([]);
  const [cats, setCat] = useState([]);
  const [pclasses, setPClasses] = useState([]);

  const fetchClassesDifficulty = async (difficulty) => {
    let newClassData;
    try {
      const response = await fetch(`/api/classes?difficulty=${difficulty}`);
      newClassData = await response.json();
    } catch (error) {
      console.log(error);
      newClassData = [];
    }

    setItems(newClassData);
  };

  const fetchCategories = async () => {
    let categoryData;
    try {
      const response = await fetch("/api/skills");
      categoryData = await response.json();
    } catch (error) {
      console.log(error);
      categoryData = [];
    }

    setCat(categoryData);
  };

  const fetchPopularClasses = async () => {
    let popularClassData;
    try {
      const response = await fetch("/api/classes");
      popularClassData = await response.json();
    } catch (error) {
      console.log(error);
      popularClassData = [];
    }

    setPClasses(popularClassData);
  };

  useEffect(() => {
    fetchClassesDifficulty("beginner");
    fetchCategories();
    fetchPopularClasses();
  }, []);
  return (
    <main>
      <Head title="Welcome" />
      <Navbar current_user={props.current_user} />
      <div className="hero-img"></div>

      <div className="new-classes">
        <h1 className="home-title">New classes added every week</h1>

        <div className="filter-wrapper">
          <ButtonDifficultyFilter
            props={{
              onClick: fetchClassesDifficulty,
              difficulty: "beginner",
            }}
          >
            Beginner
          </ButtonDifficultyFilter>
          <ButtonDifficultyFilter
            props={{
              onClick: fetchClassesDifficulty,
              difficulty: "intermediate",
            }}
          >
            Intermediate
          </ButtonDifficultyFilter>
          <ButtonDifficultyFilter
            props={{
              onClick: fetchClassesDifficulty,
              difficulty: "advanced",
            }}
          >
            Advanced
          </ButtonDifficultyFilter>
        </div>

        <div className="new-classes-wrapper">
          {items.map((item, index) => {
            return <SocialCard newClassData={item} key={index} />;
          })}
        </div>
      </div>

      <div className="categories">
        <h1 className="home-title">Our class categories</h1>

        <div className="categories-wrapper">
          {cats.map((cat, index) => {
            return <CardCategory categoryData={cat} key={index} />;
          })}
        </div>
      </div>

      <div className="popular">
        <h1 className="home-title">Most Popular</h1>

        <div className="popular-wrapper">
          {pclasses.map((pclass, indexx) => {
            return <CardPopular popularClassData={pclass} key={indexx} />;
          })}
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default Homepage;
