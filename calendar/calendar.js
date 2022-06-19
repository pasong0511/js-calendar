const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const weekList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

//calendar-nav에 들어갈 arrow 버튼, month, year DOM 생성
function renderCalendarNav(year, month, onReRender) {
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
      return onReRender(year, month - 1)
    }
    return onReRender(year - 1, 11)
  })

  //왼쪽 이동 함수
  arrowRight.addEventListener("click", () => {
    if (month < 11) {
      return onReRender(year, month + 1)
    }
    return onReRender(year + 1, 0)
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
    viewDateDic[`${prevLastYear}-${prevLastMonth}-${i}`] = {
      active: false,
      year: prevLastYear,
      month: prevLastMonth,
      date: i,
      day: weekList[(i - prevLastDate + prevLastDay) % 7]   //요일 넣어주기(i가 0이 아니므로 0으로 만들어줘야했음)
    }

    if (i === prevLastDate) {
      thisStartDay = i - prevLastDate + prevLastDay + 1
    }
  }

  //이번달 한달 가져오기
  for (let i = 1; i < thisLastDate + 1; i++) {
    viewDateDic[`${thisYear}-${thisMonth}-${i}`] = {
      active: true,
      year: thisYear,
      month: thisMonth,
      date: i,
      day: weekList[(thisStartDay + (i - 1)) % 7]
    }
  }

  //다음달 초 일부를 가져온다. 1부터 (7-요일) 까지 증가
  for (let i = 1; i < 7 - thisLastDay; i++) {
    viewDateDic[`${nextLastYear}-${nextLastMonth}-${i}`] = {
      active: false,
      year: nextLastYear,
      month: nextLastMonth,
      date: i,
      day: weekList[(thisLastDay + i) % 7]
    }
  }

  return viewDateDic
}

function renderDateGrid({ year, month, date, onDobuleClick }) {
  //오늘 날짜 찾기용
  const now = new Date()
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth()
  const nowDay = now.getDate()
  const findNow = `${nowYear}-${nowMonth}-${nowDay}`

  const gridItem = document.createElement("div")
  const viewDateDicList = createDayDate(year, month)    //보여줄 달 모든 정보가 들어있음
  //viewDateDicList에 있는 지난달 뒷부분, 이번달 부분, 다음달 앞부분 하나씩 꺼내서 
  for (let key in viewDateDicList) {
    const dateButton = document.createElement("button")
    const value = `${viewDateDicList[key].year}-${viewDateDicList[key].month + 1}-${viewDateDicList[key].date}`
    const time = document.createElement("time")
    time.setAttribute("datetime", value)

    //오늘 날짜 찾기
    if (`${viewDateDicList[key].year}-${viewDateDicList[key].month}-${viewDateDicList[key].date}` === findNow) {
      dateButton.classList.add("today")
    }

    if (viewDateDicList[key].active === true) {
      dateButton.classList.add("active")
      dateButton.addEventListener("dblclick", () => onDobuleClick(value))
    } else {
      dateButton.classList.add("disable")
    }

    if (viewDateDicList[key].active === true && viewDateDicList[key].date === date) {
      dateButton.classList.add("sel_day")
    }

    dateButton.append(time, viewDateDicList[key].date)
    gridItem.appendChild(dateButton)
  }

  return gridItem
}

function renderCalendarDay(calendarGrid) {
  const item = document.createElement("div")
  //1. 월화수목있는 day-of-week 생성
  const dayOfWeek = createWeekHeader()
  dayOfWeek.classList.add("day-of-week")

  //<<<<<------------------
  //2. 날짜가 있는 calendar-grid 생성(현재 년, 현재 월 전달)

  calendarGrid.classList.add("calendar-grid")

  item.appendChild(dayOfWeek)
  item.appendChild(calendarGrid)
  return item
}

function renderCalendar({ targetElement, year, month, date, onReRender, onDobuleClick }) {
  targetElement.innerText = ""
  targetElement.classList.add("calendar")

  //calendar-nav 하위에 있는 화살표, day-of(월, 달), 그려서 가져와서 calendarNav에 자식으로 붙여야함
  const calendarNav = renderCalendarNav(year, month, onReRender)
  calendarNav.classList.add("calendar-nav")

  const calendarGrid = renderDateGrid({ year, month, date, onDobuleClick })     //<<<<<------------------

  //calendar-day 하위에 있는 day-of-week 요일리스트, calendar-grid 일 리스트 가져와서 calendarDay에 자식으로 붙여야함
  const calendarDay = renderCalendarDay(calendarGrid)
  calendarDay.classList.add("calendar-day")

  targetElement.appendChild(calendarNav)
  targetElement.appendChild(calendarDay)
}

// 스타일.css 추가
export const addCalendarStyle = () => {
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'calendar/thema.css';
  head.appendChild(link);
}


export function addCalendar({ targetElement, selectYear, selectMonth, selectDate, onDobuleClick }) {
  const calendar = document.createElement("div")
  const date = new Date(selectYear, selectMonth + (selectDate === null ? 1 : 0), selectDate)
  const viewYear = date.getFullYear()
  const viewMonth = date.getMonth()

  //왼쪽으로 이동, 오른쪽으로 이동했을 때 캘린더 다시 그려줌
  const handleReRender = (year, month) => {
    renderCalendar({
      year,
      month,
      date: year === selectYear && month === selectMonth ? selectDate : null,
      targetElement: calendar,
      onDobuleClick,
      onReRender: handleReRender,
    })
  }

  //처음 시작했을 때 캘린더 랜더
  renderCalendar({ targetElement: calendar, year: viewYear, month: viewMonth, date: selectDate, onDobuleClick, onReRender: handleReRender })

  targetElement.appendChild(calendar)
}

