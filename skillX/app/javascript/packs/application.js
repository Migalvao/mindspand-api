// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
import React from "react";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";

createInertiaApp({
  resolve: (name) => require(`.././Pages/${name}`),
  setup({ el, App, props }) {
    render(<App {...props} />, el);
  },
});
