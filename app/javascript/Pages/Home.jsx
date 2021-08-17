import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Head, Link } from "@inertiajs/inertia-react";
import "../stylesheets/Home.css";
import { useState, useEffect } from "react";
import SocialCard from "./components/SocialCard";
import "../stylesheets/body.css";
import "../stylesheets/Home.css";
import ButtonDifficultyFilter from "./components/ButtonDifficultyFilter";
import CardCategory from "./components/CardCategory";

function Homepage(props) {
  const token = document.querySelector("[name=csrf-token]").content;
  const headers = { "X-CSRF-Token": token };

  const [items, setItems] = useState([]);
  const [cats, setCat] = useState([]);

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

  useEffect(() => {
    fetchClassesDifficulty("beginner");
    fetchCategories();
  }, []);

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

  return (
    <main>
      <Head title="Welcome" />
      <Navbar current_user={props.current_user} />
      <div className="hero-img"></div>

      <div className="new-classes">
        <h1>New classes added every week</h1>

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
        <h1>Our class categories</h1>

        <div className="categories-wrapper">
          {cats.map((cat, index) => {
            return <CardCategory categoryData={cat} key={index} />;
          })}
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default Homepage;
