// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
import React from "react";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";
import "../stylesheets/body.css";
import "../stylesheets/application.scss";
// import "../../assets/stylesheets/paragraph.css";
// import "../stylesheets/paragraph.css";
import i18n from "i18next";
import pt from "../locales/pt.json"
import en from "../locales/en.json"
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: en,
        pt: pt,
    },
    fallbackLng: "en",
    debug: true,
});

window.csrfToken = document.querySelector("[name=csrf-token]").content
window.defaultHeaders = { "X-CSRF-Token": window.csrfToken }

createInertiaApp({
            resolve: (name) => require(`.././Pages/${name}`),
            setup({ el, App, props }) {
                render( < App {...props }
                    />, el);
                },
            });