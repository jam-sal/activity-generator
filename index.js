/**
 * Jamilah Saleh
 * Section: AI, Jack and Gary
 * Date: 5-5-2021
 *
 * This will make the user be able to generate a random activity depending on what the user
 * selected and entered. Then the generated activity will be put into the box.
 */
"use strict";

(function() {
  const URL = "http://www.boredapi.com/api/activity/";

  window.addEventListener("load", init);

  /**
   * Initializes the event listener on the button
   */
  function init() {
    id("gen").addEventListener("click", getActivity);
  }

  /**
   * Gets the type, number of participants, and accessibility number from the DOM
   * if there is one and fetchs that data from the bored API
   */
  function getActivity() {
    if (id("activity").children.length === 2) {
      id("activity").removeChild(id("activity").lastChild);
    }
    let selectedType = id("type-select");
    let type = selectedType.value;
    let selectedNum = id("part-select");
    let number = selectedNum.options[selectedNum.selectedIndex].text;
    if (number === "3+") {
      number = Math.floor(Math.random() * (6 - 3) + 3);
    }
    let url = URL + "?participants=" + number;
    if (type !== "") {
      url += "&type=" + type;
    }
    if (id("access").value !== "") {
      url += "&accessibility=" + id("access").value;
    }
    fetch(url)
      .then(statusCheck)
      .then(res => res.json())
      .then(handleResponse)
      .catch(handleError);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @returns {object} - valid response if response was successful, otherwise rejected
   *                     Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Gets the activity and puts it into the box on the webpage under the "You should..." phrase
   * and depending on the type of activity it will be given a certain id
   * @param {object} data - the JSON formatted data from the API
   */
  function handleResponse(data) {
    let act = document.createElement("p");
    act.textContent = data.activity;
    if (data.type === "recreational" || data.type === "diy" || data.type === "cooking") {
      act.setAttribute("id", "fun");
    } else if (data.type === "education" || data.type === "busywork") {
      act.setAttribute("id", "work");
    } else if (data.type === "relaxation" || data.type === "music") {
      act.setAttribute("id", "relax");
    } else {
      act.setAttribute("id", "social");
    }
    id("activity").appendChild(act);
  }

  /**
   * If there is an error the message gets put into the box under the "You should..." phrase
   * @param {object} error - the error that gets caught when trying to do something with the page
   */
  function handleError(error) {
    let message = document.createElement("p");
    message.textContent = error;
    id("activity").appendChild(message);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }
})();