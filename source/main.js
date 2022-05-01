import { addCalendar } from "./calendar/calendar.js";
import css from "./calendar/thema.css";

window.addEventListener('DOMContentLoaded', function () {
    let inputYear = 2022
    let inputMonth = 4
    let inputDate = 27

    const $content = document.querySelector(".content")

    addCalendar($content, inputYear, inputMonth, inputDate)
});