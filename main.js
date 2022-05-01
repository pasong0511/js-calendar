import { addCalendar } from "./calendar/calendar.js";
//import { addDatePicker } from "./calendar/date-picker.js"

function addDatePicker(targetElement) {
    const input = document.createElement("input")
    input.classList.add("date-picker")
    input.setAttribute("name", "input_date")
    input.setAttribute("placeholder", "Select date")
    input.readOnly = true

    targetElement.appendChild(input)
}

window.addEventListener('DOMContentLoaded', function () {
    const nowDate = new Date()
    let inputYear = nowDate.getFullYear()
    let inputMonth = nowDate.getMonth() + 1
    let inputDate = nowDate.getDate()
    let flag = false
    const $content = document.querySelector(".contents")

    // addDatePicker($content) //데이터 피커 생성

    // const datePicker = document.querySelector(".date-picker")
    // console.log(datePicker)

    addCalendar($content, inputYear, inputMonth, inputDate)


    // datePicker.addEventListener("click", () => {
    //     const calendar = document.querySelector(".calendar")

    //     if (flag === false) {
    //         flag = true
    //         addCalendar($content, inputYear, inputMonth, inputDate)

    //     }
    // })
});