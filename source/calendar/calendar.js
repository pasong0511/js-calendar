const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const weekList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

//calendar-nav에 들어갈 arrow 버튼, month, year DOM 생성
function renderCalendarNav(year, month, onPrev, onNext) {
  const item = document.createElement("div")

  const arrowLeft = document.createElement("i")
  arrowLeft.setAttribute("class", "bx bxs-left-arrow")
  item.appendChild(arrowLeft)

  const dayItem = document.createElement("div")
  dayItem.classList.add("day-of")

  const itemMonth = document.createElement("time")
  itemMonth.classList.add("day-of-month")
  itemMonth.setAttribute("datetime", `${year}-${String(month + 1).padStart(2, "0")}`)   //calendar-nav day-of 클래스에 표기해줄 datetime="" 표기해줄 월
  itemMonth.innerText = monthList[month]                                            //calendar-nav DOM 표기해줄 월
  dayItem.append(itemMonth)

  const itemYear = document.createElement("time")
  itemYear.classList.add("day-of-year")
  itemYear.setAttribute("datetime", `${year}`)
  itemYear.innerText = year

  dayItem.appendChild(itemYear)

  item.appendChild(dayItem)

  const arrowRight = document.createElement("i")
  arrowRight.setAttribute("class", "bx bxs-right-arrow")
  item.appendChild(arrowRight)

  //왼쪽 이동 함수
  arrowLeft.addEventListener("click", () => {
    if (month > 0) {
      return onPrev(year, month - 1)
    }
    return onPrev(year - 1, 11)
  })

  //왼쪽 이동 함수
  arrowRight.addEventListener("click", () => {
    if (month < 11) {
      return onPrev(year, month + 1)
    }
    return onPrev(year + 1, 0)
  })

  return item
}

//.calendar-day > .day-of-week의 헤더인 월,화,수...일 그려줌
function createWeekHeader() {
  const dayWeek = document.createElement("div")
  dayWeek.classList.add("day-of-week")

  weekList.forEach((week) => {
    const div = document.createElement("div")
    div.innerText = week
    dayWeek.appendChild(div)
  })
  return dayWeek
}


function createDayDate(viewYear, viewMonth) {
  const prevLast = new Date(viewYear, viewMonth, 0)       //지난달 마지막
  const thisLast = new Date(viewYear, viewMonth + 1, 0)   //이번달 마지막
  const nextLast = new Date(viewYear, viewMonth + 2, 0)   //다음달 마지막

  //지난달 마지막달 월, 날짜, 요일 가져오기
  const prevLastYear = prevLast.getFullYear()             //년
  const prevLastMonth = prevLast.getMonth()               //월 
  const prevLastDate = prevLast.getDate()                 //날짜
  const prevLastDay = prevLast.getDay()                   //요일

  //이번달 마지막 날짜, 요일 가져오기
  const thisYear = thisLast.getFullYear()                 //년
  const thisMonth = thisLast.getMonth()                   //월 
  const thisLastDate = thisLast.getDate()                 //일
  const thisLastDay = thisLast.getDay()                   //요일
  let thisStartDay = -1

  //다음날 년, 월, 일, 가져오기
  const nextLastYear = nextLast.getFullYear()
  const nextLastMonth = nextLast.getMonth()

  const viewDateDic = {}

  //앞에 달 일부 가져오기(지난달 마지막 날짜-요일로부터 지난달 마지막 날짜까지 1씩 증가)
  for (let i = prevLastDate - prevLastDay; i <= prevLastDate; i++) {
    let startDate =
      viewDateDic[`${prevLastYear}-${prevLastMonth + 1}-${i}`] = {
        active: false,
        year: prevLastYear,
        month: prevLastMonth + 1,
        date: i,
        day: weekList[(i - prevLastDate + prevLastDay) % 7]   //요일 넣어주기(i가 0이 아니므로 0으로 만들어줘야했음)
      }

    if (i === prevLastDate) {
      thisStartDay = i - prevLastDate + prevLastDay + 1
    }
  }

  //이번달 한달 가져오기
  for (let i = 1; i < thisLastDate + 1; i++) {
    viewDateDic[`${thisYear}-${thisMonth + 1}-${i}`] = {
      active: true,
      year: thisYear,
      month: thisMonth + 1,
      date: i,
      day: weekList[(thisStartDay + (i - 1)) % 7]
    }
  }

  //다음달 초 일부를 가져온다. 1부터 (7-요일) 까지 증가
  for (let i = 1; i < 7 - thisLastDay; i++) {
    viewDateDic[`${nextLastYear}-${nextLastMonth + 1}-${i}`] = {
      active: false,
      year: nextLastYear,
      month: nextLastMonth + 1,
      date: i,
      day: weekList[(thisLastDay + i) % 7]
    }
  }

  return viewDateDic
}

function renderDateGrid(year, month) {
  const gridItem = document.createElement("div")
  const viewDateDicList = createDayDate(year, month)    //보여줄 달 모든 정보가 들어있음

  //viewDateDicList에 있는 지난달 뒷부분, 이번달 부분, 다음달 앞부분 하나씩 꺼내서 
  for (let key in viewDateDicList) {
    const dateButton = document.createElement("button")

    const time = document.createElement("time")
    time.setAttribute("datetime", `${viewDateDicList[key].year}-${viewDateDicList[key].month}-${viewDateDicList[key].date}`)


    if (viewDateDicList[key].active === true) {
      dateButton.classList.add("active")
    } else {
      dateButton.classList.add("disable")
    }

    dateButton.append(time, viewDateDicList[key].date)
    gridItem.appendChild(dateButton)
  }

  return gridItem
}

function renderCalendarDay(year, month) {
  const item = document.createElement("div")

  //1. 월화수목있는 day-of-week 생성
  const dayOfWeek = createWeekHeader()
  dayOfWeek.classList.add("day-of-week")


  //2. 날짜가 있는 calendar-grid 생성(현재 년, 현재 월 전달)
  const calendarGrid = renderDateGrid(year, month)
  calendarGrid.classList.add("calendar-grid")

  item.appendChild(dayOfWeek)
  item.appendChild(calendarGrid)
  return item
}

function renderCalendar(year, month, onPrev, onNext) {
  const calendar = document.createElement("div")
  calendar.classList.add("calendar")


  //calendar-nav 하위에 있는 화살표, day-of(월, 달), 그려서 가져와서 calendarNav에 자식으로 붙여야함
  const calendarNav = renderCalendarNav(year, month, onPrev, onNext)
  calendarNav.classList.add("calendar-nav")

  //calendar-day 하위에 있는 day-of-week 요일리스트, calendar-grid 일 리스트 가져와서 calendarDay에 자식으로 붙여야함
  const calendarDay = renderCalendarDay(year, month)
  calendarDay.classList.add("calendar-day")


  calendar.appendChild(calendarNav)
  calendar.appendChild(calendarDay)

  return calendar
}

export function addCalendar(targetElement, selecYear, selecMonth, selecdate) {
  const date = new Date(selecYear, selecMonth - 1)

  const viewYear = date.getFullYear()
  const viewMonth = date.getMonth()

  const handleClickNext = (year, month) => {
    ////
    console.log(year, month)
    targetElement.innerText = ""
    targetElement.appendChild(renderCalendar(year, month, handleClickNext, handleClickPrev))
  }

  const handleClickPrev = (year, month) => {
    ////
    console.log(year, month)
    targetElement.innerText = ""
    targetElement.appendChild(renderCalendar(year, month, handleClickNext, handleClickPrev))
  }

  targetElement.innerText = ""
  targetElement.appendChild(renderCalendar(viewYear, viewMonth, handleClickNext, handleClickPrev))
}