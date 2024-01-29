/************************************************************
 *                                                          *
 * All Initialize Functions                                 *
 *                                                          *
 * **********************************************************/

document.addEventListener("DOMContentLoaded", async function(){
    //check page type
    if(this.head.classList.contains("page.course")){
        //this is a course page
        await navbarInit("course");

        //fetchInit();
    }else if(this.head.classList.contains("page.review")){
        //this is a review page
        await navbarInit("review");

        //fetchInit();
    }else console.log("Lazy to wait page load");
    await fetchInit();
});

//temp
/*
function changelog(){
    console.log(event.currentTarget);
    console.log("Query submit data");
    console.log(event.target.children);
}//*/

/************************************************************
 *                                                          *
 * navigation bar related functions                         *
 *                                                          *
 * **********************************************************/
async function navbarInit(pageType){
    var homepage = {"course": "main_review.html", "review": "main.html"};
    var navitext = {"course": "評論首頁", "review": "選課首頁"};
    var nav_html = `
    <div class="navbar"> 
        <a href="https://www.nycu.edu.tw/" class="logo"><img src="nycu_logo2.png" alt="NYCU logo"></a>  
                    
        <div class="kanan">
            <a href="${homepage[pageType]}"><i class="fa fa-fw fa-home"></i> <span class="navi-text">${navitext[pageType]}</span></a>
            <div class="popup" onclick="popCodes()"><i class="fa fa-info"></i> <span class="navi-text">編號</span>
                <span class="popuptext" id="codePopList"></span>
            </div>
            <a href="https://portal.nycu.edu.tw/" class="user"><i class="fa fa-fw fa-user"></i> 109550200</a>
        </div>
    </div>`;
    var bar_path = await document.getElementsByClassName("bar-init").innerHTML;
    bar_path = nav_html;
    
    console.log("init bared");
    console.log("HTML: ",document.getElementsByClassName("bar-init"));
    return nav_html;
}

function popCodes(){
    var tar = event.target;
    //clicked child elements
    console.log("Clic: ",tar);
    if(tar.classList){
        //check if already clear
        if(tar.classList.contains(".popuptext")){
            popup = tar;
        }
        //finding root
        else if(tar.classList.contains("popup")){
            popup = tar.querySelector(".popuptext");
        //check if is gen-element
        }else if(tar.classList.contains("popt")){
            popup = tar.parentElement;
        //otherwise, normal child element
        }else popup = tar.parentElement.querySelector(".popuptext");
    }else popup = undefined;
    if(popup===undefined || popup === null) popup = document.getElementsByClassName("popuptext");
    //var tar = event.target.children;
    //console.log("test target: ", tar,"; actual pop:", popup);
    //console.log("Pop: ",popup)
    if(popup.classList.contains("show")){
        popup.innerHTML = "";
    }else{
        var offset = ["0","-80","-160"];
        var styling =   `position: relative; vertical-align: text-top; margin: 0 0;
                        font-size: 0.7em; text-align: left; display: inline-block;`
                        //can also try flexbox, they get why there is spaces
                        //issue is that relative will gain space between them
        var code_text = [
            `<strong>WEEKDAY CODES </strong> 
            
            【M】 Monday
            【T】 Tuesday
            【W】Wednesday
            【R】 Thursday
            【F】 Friday
            【S】 Saturday
            【U】 Sunday`,
            `<strong>TIME CODES</strong>
                                    
            【y】06:00 ~ 06:50
            【z】07:00 ~ 07:50
            【1】08:00 ~ 08:50
            【2】09:00 ~ 09:50
            【3】10:10 ~ 11:00
            【4】11:10 ~ 12:00
            【n】12:20 ~ 13:10`,
            `【5】13:20 ~ 14:10
            【6】14:20 ~ 15:10
            【7】15:30 ~ 16:20
            【8】16:30 ~ 17:20
            【9】17:30 ~ 18:20
            【a】18:30 ~ 19:20
            【b】19:30 ~ 20:20
            【c】20:30 ~ 21:20
            【d】21:30 ~ 22:20`
        ];
        popup.innerHTML =   `<div class="popt-left popt" width="33%" 
                            style="
                                    border-right: 1px solid black;
                                    ${styling}
                                    left: ${offset[0]}px;
                            ">
                            ${code_text[0].replace(/  /g, '')}
                            </div>
                            <div class="popt-mid popt" width="33%"
                            style=" ${styling}
                                    left: ${offset[1]}px;
                            ">
                            ${code_text[1].replace(/  /g, '')}
                            </div>
                            <div class="popt-right popt" width="33%"
                            style=" ${styling}
                                    left: ${offset[2]}px;
                            ">
                            ${code_text[2].replace(/  /g, '')}
                            </div>`
    }
    //open or close the pop via this event
	popup.classList.toggle("show");
}
/************************************************************
 *                                                          *
 * course filtering                                         *
 *                                                          *
 * **********************************************************/
function popFilter(){
    var tar = event.target;
    var popup = undefined;
    if(tar.classList){
        //check if pathed
        if(tar.classList.contains("filterMenu")){
            popup = tar;
        //check if root
        }else if(tar.classList.contains("filterButton")){
            popup = tar.querySelector(".filterMenu");
        //check if generated elements
        }else if(tar.classList.contains("filtext")){
            popup = tar.parentElement;
        //otherwise, child element
        }else popup = tar.parentElement.querySelector(".filterMenu");

    }else popup = undefined;
    console.log("testdata of pop",popup,"; target data: ",tar);
    if(popup===undefined || popup === null || !popup.classList.contains("filterMenu")){
        popup = document.getElementsByClassName("filterMenu");
    }
    console.log("after refetch: ",popup,"; target data: ",tar);
    //show inner info for first click
    if(popup.innerHTML===""){
        popup.innerHTML = `
        <form class="builds filtext">
            <div class="filtext"><b>時間(work in progress)</b>
                <span class="selection filtext"> <input type="checkbox" name="time" class="selection filtext">M</span>
                <span class="selection filtext"> <input type="checkbox" name="time" class="selection filtext">T</span>
                <span class="selection filtext"> <input type="checkbox" name="time" class="selection filtext">W</span>
                <span class="selection filtext"> <input type="checkbox" name="time" class="selection filtext">R</span>
                <span class="selection filtext"> <input type="checkbox" name="time" class="selection filtext">F</span>
                <span class="selection filtext"> <input type="checkbox" name="time" class="selection filtext">S</span>
            </div>
            <select class="filtext" name=""><b>開課系所</b>
                <option class="filtext">資訊共同</option>
                <option class="filtext">資工系</option>
                <option class="filtext">通識中心</option>
            </select>
            <button class="filtext" type="submit" onclick="filterStart()"><i class="fa fa-check"></i></button>
        </form>
        `;
    }
    //console.log("Class List if filMan is :", popup.classList);
    if(!tar.matches(".filtext")) popup.classList.toggle("show");
    if(popup.matches(".show")) popup.style.display = "block";
    else popup.style.display = "none";
}
function filterStart(){
    event.preventDefault();
    var tar = event.target;

}

/************************************************************
 *                                                          *
 * data fetching functions                                  *
 *                                                          *
 * **********************************************************/
var class_data, review_data;
async function fetchInit(){
    class_data = await fetchCSVData('data112spring_courseselect.csv',"course");
    review_data = await fetchCSVData('review_sheet.csv',"review");
    historic_data = await fetchCSVData('ClassSampleData.csv',"review");
}

async function fetchCSVData(source_data, data_type){
    try {
        const response = await fetch(source_data);
        const csvData = await response.text();
        
        // Parse CSV data using Papaparse
        var parsedData = Papa.parse(csvData, { header: true }).data;

        // Now 'parsedData' contains your reviews in an array of objects
        console.log("Parsed Data:\n",parsedData);

        //Do storaging review usage data(if have)
        if(data_type=="review"){
            parsedData.forEach(d => {
                d.recommend_star = +d.recommend_star
                d.review_id = +d.review_id
                d.scoring_star = +d.scoring_star
                d.workload_star = +d.workload_star
            });
        }
        console.log(parsedData);
        /*
        else if(data_type=="course"){
            var semesters = [];
            parsedData.forEach(d => {
                if(!semesters.includes(d.學期)) semesters.push(d.學期);
                console.log(semesters);
            });
        }//*/
        return parsedData;

    } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
    }
}
//server request to upload 
function writeDataToCSV(data){
	// Send a POST request to the server with the data
	fetch('/writeData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
	})
	.then(response => response.json())
	.then(result => {
        console.log(result);
        alert('Data written to CSV successfully!');
	})
	.catch(error => {
	    console.error('Error:', error);
	//   alert('Error writing data to CSV!');
	});
}

/************************************************************
 *                                                          *
 * search features                                          *
 *                                                          *
 * **********************************************************/

//set nested function only be used here
function keyword_split(i){
    var split_list = i.split(' ');
    return split_list;
}

function searchClick(){
    //console.log("check head: ",document.head.classList.contains("page.review"))
    //preventing page jump
    event.preventDefault();
    //get search insert
    var keyword_list = keyword_split(event.target.search.value);
    //console.log("User typed: ", keyword_list);
    if(document.head.classList.contains("page.course")){
        var data_final = filter_data(keyword_list,class_data,"target",["課程名稱","任課老師","課程選別"]);
        return data_final;
    }else if(document.head.classList.contains("page.review")){
        //console.log("dataset", review_data);
        var data_final = filter_data(keyword_list,review_data);
    }
    console.log("Final result: ",data_final);
    return data_final;
}

//filtering the keyword existence data
function filter_data(search_list=[],dataset=[],mode="default",target_col=[]){
    //console.log("DATA",dataset);
    return dataset.filter((data) => {
        //console.log(data);
        for(let l=search_list.length,i=0,isAccept=false,val=null;i<l;i++,isAccept=false){
            val=search_list[i];
            switch(mode){
                case "all":
                    for(let dv of Object.values(data)){
                        //console.log(dv, "is a",typeof(dv)); 
                        if(dv==undefined) continue;
                        if(dv.toString().includes(val)){
                            isAccept=true;
                            break;
                        }else continue;
                    }
                    break;
                case "default":
                    for(let key of ["course_name","prof_name","課程名稱","任課老師"]){
                        if(data[key]==undefined) continue;
                        if(data[key].toString().includes(val)){
                            isAccept=true;
                            break;
                        }
                    }
                    break;
                case "target":
                    for(let key of target_col){
                        if(data[key]==undefined) continue;
                        if(data[key].toString().includes(val)){
                            isAccept=true;
                            break;
                        }
                    }
                    break;
            }
            //console.log("yes it is accepted");
            if(!isAccept){
                //console.log("Fired", data);
                return false;
            }
        }
        //console.log("Accepted", data);
        return true;
        //return true;
    });
}