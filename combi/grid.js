'use strict';
//data
/*
const books = [
  {
    "學期": "112下",
    "課號": 515600,
    "永久課號": "CSCS20031",
    "課程名稱": "競技程式設計(一)",
    "人數上限": 96,
    "時間地點": "Fabc-EC115[GF]",
    "學分": 3,
    "時數": 3,
    "任課老師": "謝旻錚",
    "課程選別": "選修",
    "摘要": "主開：三年級，外系生請於開學後選課階段網路選課；資工系學生優先選課；學士班七大主題學程;開放隨班附讀"
   },
   {
    "學期": "112下",
    "課號": 515601,
    "永久課號": "CSCS20022",
    "課程名稱": "數位訊號處理概論",
    "人數上限": 60,
    "時間地點": "T34n-ED302",
    "學分": 3,
    "時數": 3,
    "任課老師": "莊仁輝",
    "課程選別": "選修",
    "摘要": "主開：二年級，外系生請於開學後選課階段網路選課；資工系學生優先選課"
   },
   {
    "學期": "112下",
    "課號": 515602,
    "永久課號": "CSCS10019",
    "課程名稱": "資訊工程專題(二)",
    "人數上限": "不限",
    "學分": 2,
    "時數": 2,
    "任課老師": "陳冠文",
    "課程選別": "必修",
    "摘要": "資工系學生優先選課；須修過資訊工程專題(一)才可修資訊工程專題(二)；Pass the “Computer Science and Engineering Projects (I)” before taking “Computer Science and Engineering Projects (II)”;主開3年級[English Medium Course]「於學期末的第17\/18彈性教學週，原則上會安排在W78的時間舉行專題報告或競賽」; 本系生優先權順序：3年級，4年級，2年級，1年級"
   },
   {
    "學期": "112下",
    "課號": 515603,
    "永久課號": "CSCS10018",
    "課程名稱": "資訊工程專題(一)",
    "人數上限": 0,
    "學分": 2,
    "時數": 2,
    "任課老師": "資工系",
    "課程選別": "必修",
    "摘要": "不開放網路選課，需經指導教授同意後以書面加簽；[English Medium Course] 加簽方式請參閱系網頁https:\/\/www.cs.nycu.edu.tw\/ 說明。"
   },{
    "學期": "112下",
    "課號": 515603,
    "永久課號": "CSCS10018",
    "課程名稱": "微積分甲(一)",
    "時間地點": "T34-ED202[GF]",
    "人數上限": 0,
    "學分": 2,
    "時數": 2,
    "任課老師": "楊春美",
    "課程選別": "必修",
    "摘要": "不開放網路選課，需經指導教授同意後以書面加簽；[English Medium Course] 加簽方式請參閱系網頁https:\/\/www.cs.nycu.edu.tw\/ 說明。"
   },
   {
    "學期": "112下",
    "課號": 515604,
    "永久課號": "CSCS20040",
    "課程名稱": "網路系統總整與實作",
    "人數上限": 60,
    "時間地點": "T34-ED202[GF]",
    "學分": 3,
    "時數": 3,
    "任課老師": "王協源",
    "課程選別": "選修",
    "摘要": "主開：三年級，外系生請於開學後選課階段網路選課；須修過基礎程式設計才可修「網路系統總整與實作」；資工系學生優先選課；學士班七大主題學程；原課名「計算機網路實驗」與「網路系統總整與實作」與新舊課程僅能採計一門為畢業學分，不能重覆採計[另外1小時(第3節)以非同步上課方式the third period of class will be held asynchronously] ; 本系生優先權順序：3&4年級，2年級，1年級"
   },
   {
    "學期": "112下",
    "課號": 515605,
    "永久課號": "CSCS20038",
    "課程名稱": "網路規劃與管理實務",
    "人數上限": 50,
    "時間地點": "F34n-EC315[GF],F34n-EC316[GF],F34n-EC324[GF]",
    "學分": 3,
    "時數": 3,
    "任課老師": "曾建超",
    "課程選別": "選修",
    "摘要": "主開：三年級，外系生請於開學後選課階段網路選課；資工系學生優先選課"
   }
]//*/

// ***** 初始化資料：
var courseList,selectedList;
document.addEventListener("DOMContentLoaded", async function(){
    courseList = await fetchCSVData('data112spring_courseselect.csv',"course");
    console.clear();
    selectedList = courseList;
    // 初始化表格
    renderScheduleTable(generateScheduleTableHTML());
    // 將表格插入到 classScheduleContainer 中
    //renderScheduleTable(generateScheduleTableHTML());
    // 初始化課單
    renderHTML(courseList);
});


// *** 表格相關

// 生成 17 x 8 的表格
function renderScheduleTable(tableHTML) {
    const scheduleTable = document.getElementById('scheduleTable');
    const scheduleBody = scheduleTable.querySelector('tbody');

    // 使用傳入的 HTML 替換現有表格內容
    scheduleBody.innerHTML = tableHTML;
}

// 生成 10 x 8 的表格
function generateScheduleTableHTML() {
    var tableHTML = '<table>';
    for (var i = 1; i <= 16; i++) {
        tableHTML += '<tr>';
        for (var j = 1; j <= 8; j++) {
            if (j == 1) {
                if (i == 1) tableHTML += '<td>' + 'Y' + '</td>';
                if (i == 2) tableHTML += '<td>' + 'Z' + '</td>';
                if (i == 3) tableHTML += '<td>' + '1' + '</td>';
                if (i == 4) tableHTML += '<td>' + '2' + '</td>';
                if (i == 5) tableHTML += '<td>' + '3' + '</td>';
                if (i == 6) tableHTML += '<td>' + '4' + '</td>';
                if (i == 7) tableHTML += '<td>' + 'N' + '</td>';
                if (i == 8) tableHTML += '<td>' + '5' + '</td>';
                if (i == 9) tableHTML += '<td>' + '6' + '</td>';
                if (i == 10) tableHTML += '<td>' + '7' + '</td>';
                if (i == 11) tableHTML += '<td>' + '8' + '</td>';
                if (i == 12) tableHTML += '<td>' + '9' + '</td>';
                if (i == 13) tableHTML += '<td>' + 'A' + '</td>';
                if (i == 14) tableHTML += '<td>' + 'B' + '</td>';
                if (i == 15) tableHTML += '<td>' + 'C' + '</td>';
                if (i == 16) tableHTML += '<td>' + 'D' + '</td>';
            } else {
                tableHTML += '<td>' + ' ' + '</td>';
            }
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    return tableHTML;
}

document
    .querySelector("[search-container]")
    .addEventListener("submit", (e) => {
        // 停止事件的默認動作
        e.preventDefault();
        var back_data = searchClick();
        selectedList = back_data
        console.log(back_data)
        //console.log("資料內容",document.querySelector("[data-list]"));
        if(back_data.length===0||!typeof(back_data)) renderHTML("fail");
        else renderHTML(back_data);
        //renderBooks(generateBookHTML(booksFilter(e.target.search.value)));
});
/*
function booksFilter(targetBook, allBooks = books) {
    return allBooks.filter((book) => {
        return book.課程名稱.includes(targetBook) || book.任課老師.includes(targetBook) || book.課程選別.includes(targetBook);
    });
}//*/
function renderHTML(data){
    if(data==="fail"){
        var courseHTMLList = 
        `<li class="courseList__item" styles=   "font-size: 2em;
                        background-color: white;
                        width: 100%;
                        height: 80hv;
                        padding: 1rem 0.5rem 10rem;
                        border-radius: 0.3rem;
        ">
            <b>找不到相關課程，請重新查詢</b>
        </li>`;
        var targetList = document.querySelector("[data-list]");
        targetList.innerHTML = courseHTMLList;
        return false;
    }
    var courseHTMLList = data.map((course, index) => {
        return `<li class="courseList__item">

        <span>${course.課程名稱} - <span class="courseList__author">${course.開課教師}</span></span>
        <br>
        <br>

        <button class="show" data-index="${index}">顯示更多</button>
        <dialog class="infoModal" id="infoModal_${index}">
            
            <span> 課號 - <span class="courseList__author">${course.課號}</span></span>
            <br>
            <span>${course.課程名稱} - <span class="courseList__author">${course.開課教師}</span></span>
            <br>
            <br>
            <span> 永久課號 - <span class="courseList__author">${course.永久課號}</span></span>
            <br>
            <span> 時間地點 - <span class="courseList__author">${course.時間地點}</span></span>
            <br>
            <span> 課程選別 - <span class="courseList__author">${course.課程選別}</span></span>
            <br>
            <span> 學分 - <span class="courseList__author">${course.學分}</span></span>
            <br>
            <span> 摘要: <br><span class="courseList__author">${course.摘要}</span></span>
            <br>
            <a href="main_review.html?courseName=${course.課程名稱}&teacherName=${course.開課教師}">課程評論</a>
            <br>
            <span class="courseList__author"><p> (按任一處關閉) </p></span>
            
        </dialog>

        <button class="plusButton" onclick="toggleSchedule(this, ${index})">+</button>
        </li>`;
    }).join("");

    var targetList = document.querySelector("[data-list]");
    targetList.innerHTML = courseHTMLList;
    return true;
}

/*
function renderBooks(targetHTML) {
    const bookList = document.querySelector("[data-list]");
    bookList.innerHTML = targetHTML;
}

function generateBookHTML(targetBooks) {
    var booksHTML = targetBooks
        .map((course, index) => {
            return `<li class="courseList__item">

            <span>${course.課程名稱} - <span class="courseList__author">${course.任課老師}</span></span>
            <br>
            <br>

            <button class="show" data-index="${index}">顯示更多</button>
            <dialog class="infoModal" id="infoModal_${index}">
                
                <span> 課號 - <span class="courseList__author">${course.課號}</span></span>
                <br>
                <span>${course.課程名稱} - <span class="courseList__author">${course.任課老師}</span></span>
                <br>
                <br>
                <span> 永久課號 - <span class="courseList__author">${course.永久課號}</span></span>
                <br>
                <span> 時間地點 - <span class="courseList__author">${course.時間地點}</span></span>
                <br>
                <span> 課程選別 - <span class="courseList__author">${course.課程選別}</span></span>
                <br>
                <span> 學分 - <span class="courseList__author">${course.學分}</span></span>
                <br>
                <span> 摘要: <br><span class="courseList__author">${course.摘要}</span></span>
                <br>
                <a href="main_review.html?courseName=${course.課程名稱}&teacherName=${course.任課老師}">課程評論</a>
                <br>
                <span class="courseList__author"><p> (按任一處關閉) </p></span>
                
            </dialog>

            <button class="plusButton" onclick="toggleSchedule( ${index})">+</button>
            </li>`;
    })
    .join("");
    return booksHTML;
}//*/

// 事件監聽器
//按畫面退出
// else if (event.target.classList.contains("close"))
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("show")) {
        var index = event.target.getAttribute("data-index");
        var infoModal = document.getElementById(`infoModal_${index}`);
        if (infoModal) {
          infoModal.showModal();
      }
  } else{
    var infoModal = event.target.closest("dialog");
    if (infoModal) {
        infoModal.close();
    }
  }
});

/* ==============================

  目前沒用的東西

============================== */
// 切換課程狀態（加入/移除）

// function toggleSchedule(index) {
// console.log(index)
//   const selectedCourse = courseList[index];
//   const scheduleTable = document.getElementById('scheduleTable');
//   const scheduleBody = scheduleTable.querySelector('tbody');

//   const existingRow = Array.from(scheduleBody.rows).find(row =>
//       row.cells[0].textContent === selectedCourse.課程名稱
//   );

//   if (existingRow) {
//       // 如果課程已存在，則移除
//       scheduleBody.removeChild(existingRow);
//   } else {
//       // 否則，將課程添加到表格
//       const newRow = scheduleBody.insertRow();
//       newRow.insertCell(0).textContent = selectedCourse.課程名稱;
//       newRow.insertCell(1).textContent = selectedCourse.時間地點;
//       const operationCell = newRow.insertCell(2);
//       const toggleButton = document.createElement('button');
//       toggleButton.textContent = '-';
//       toggleButton.onclick = () => toggleSchedule(index);
//       operationCell.appendChild(toggleButton);
//   }
// }

// 切換課程狀態（加入/移除）
function isBoxFilled(timeslot){
    const scheduleTable = document.getElementById('scheduleTable');
    const scheduleBody = scheduleTable.querySelector('tbody');
    let coli, rowi;
    let fillwith;
    Array.from(timeslot).forEach( c => {
      
      if(getColumnIndex(c) != 0){
          coli = getColumnIndex(c);
          return;
      }
      else{
          rowi = getRowIndex(c);
          if(scheduleBody.getElementsByTagName('tr')[rowi].querySelectorAll('td')[coli].querySelector('p')){
            fillwith = scheduleBody.getElementsByTagName('tr')[rowi].querySelectorAll('td')[coli].querySelector('p');
          } 
      };
    });

    return fillwith;
}
let selectedCourseList = []
function toggleSchedule(obj, index) {
  console.log(obj)
  const selectedCourse = selectedList[index];
  const scheduleTable = document.getElementById('scheduleTable');
  const scheduleBody = scheduleTable.querySelector('tbody');
  
  console.log('scheduleTable:', scheduleTable);
  console.log('scheduleBody:', scheduleBody);
  console.log('selectedCourse:', selectedCourse);

  if (!scheduleTable || !scheduleBody) {
      console.error('Table or table body not found.');
      return;
  }
  let splitted = selectedCourse.時間地點.split("-")[0];
  if(!selectedCourseList.includes(selectedCourse)){
    let coli, rowi;
    let filledwith = isBoxFilled(splitted)
    if(filledwith){
        alert(`與【${filledwith.textContent}】衝堂`);
        return;
    }
    Array.from(splitted).forEach( c => {
      
      if(getColumnIndex(c) != 0){
          coli = getColumnIndex(c);
          return;
      }
      else{
          rowi = getRowIndex(c);
          
          console.log(scheduleBody.getElementsByTagName('tr')[rowi]);
          scheduleBody.getElementsByTagName('tr')[rowi].querySelectorAll('td')[coli].innerHTML = `<p>${selectedCourse.課程名稱}</p>`;
      };
    });
    selectedCourseList.push(selectedCourse); 
    obj.innerHTML = "-";
    return;
  }
  else{
    let coli, rowi;
    Array.from(splitted).forEach( c => {
      
      if(getColumnIndex(c) != 0){
          coli = getColumnIndex(c);
          return;
      }
      else{
          rowi = getRowIndex(c);
          
          console.log(scheduleBody.getElementsByTagName('tr')[rowi]);
          scheduleBody.getElementsByTagName('tr')[rowi].querySelectorAll('td')[coli].innerHTML = ``;
      };
    });
    let indexc = selectedCourseList.indexOf(selectedCourse); 
    selectedCourseList.splice(indexc,1);
    obj.innerHTML = "+";
  }


  
  // 解析時間地點信息
//   const timeInfo = parseTimeLocation(selectedCourse.時間地點);
//   console.log('timeInfo:', timeInfo);

  // 查找對應的行和列
//   const rowIndex = getRowIndex(timeInfo.row);
//   const colIndex = getColumnIndex(timeInfo.col);
//   console.log('rowIndex:', rowIndex);
//   console.log('colIndex:', colIndex);

  
//   const existingRow = Array.from(scheduleBody.rows).find(row =>
//       row.cells[0].textContent === timeInfo.row
//   );

//   if (existingRow) {
//       // 如果課程已存在，則移除
//       scheduleBody.removeChild(existingRow);
//   } else {
//       // 否則，將課程添加到表格
//       const newRow = scheduleBody.insertRow(rowIndex);
//       newRow.insertCell(0).textContent = timeInfo.row;

//       // 使用 insertCell 插入到指定的 column
//       const courseCell = newRow.insertCell(colIndex);
//       courseCell.textContent = selectedCourse.課程名稱;

//       // 插入任課老師到下一列
//       const teacherCell = newRow.insertCell(colIndex + 1);
//       teacherCell.textContent = selectedCourse.任課老師;

//       const operationCell = newRow.insertCell(colIndex + 2);
//       const toggleButton = document.createElement('button');
//       toggleButton.textContent = '-';
//       toggleButton.onclick = () => toggleSchedule(index);
//       operationCell.appendChild(toggleButton);

//   }
  
//   // 更新課表
//   renderScheduleTable(generateScheduleTableHTML());
}


// 解析時間地點信息的輔助函數
function parseTimeLocation(timeLocation) {
  const regex = /([A-Z]+)(\d+)/; // 匹配字母和數字
  const matches = timeLocation.match(regex);

  return {
      col: matches[1], // 匹配到的字母部分
      row: matches[2] // 匹配到的數字部分
  };
}

// 輔助函數，用於根據時間地點返回相應的列索引
function getColumnIndex(col) {
  const daysOfWeek = ["M", "T", "W", "R", "F"];
  
  return daysOfWeek.indexOf(col) + 1;
}

// 輔助函數，用於根據時間地點返回相應的行索引
function getRowIndex(row) {
  const rowIndexMapping = ["y", "z", "1", "2", "3", "4", "n", "5", "6", "7", "8", "9", "a", "b", "c", "d"];

  return rowIndexMapping.indexOf(row);
}

