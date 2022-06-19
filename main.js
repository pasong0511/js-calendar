import { addCalendar, addCalendarStyle } from "./calendar/calendar.js";

addCalendarStyle()

function addDatePicker(targetElement) {
    const input = document.createElement("input")
    input.classList.add("date-picker")
    input.setAttribute("name", "input_date")
    input.setAttribute("placeholder", "Select date")
    input.readOnly = true

    targetElement.appendChild(input)
}

function parseDate(datePickerEl) {
    const data = datePickerEl.getAttribute("value")
    if (data === "") {
        const nowDate = new Date()
        return [nowDate.getFullYear(), nowDate.getMonth(), null]
    }
    const [year, month, date] = data.split("-").map((i) => parseInt(i))
    return [year, month - 1, date]
}

window.addEventListener('DOMContentLoaded', function () {
    const $content = document.querySelector(".contents")
    const calendar = document.createElement("div")

    addDatePicker($content)             //데이터 피커 생성
    $content.append(calendar)
    const datePicker = document.querySelector(".date-picker")
    datePicker.setAttribute("value", "")

    datePicker.addEventListener("click", () => {
        if (calendar.innerText === "") {
            const [selectYear, selectMonth, selectDate] = parseDate(datePicker)
            addCalendar({               //캘린더 생성
                selectYear, selectMonth, selectDate, targetElement: calendar, onDobuleClick: (d) => {
                    datePicker.setAttribute("value", d)
                    calendar.innerText = ""
                }
            })
        }
    })
});
