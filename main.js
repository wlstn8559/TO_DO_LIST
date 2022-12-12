//유저가 값을 입력한다.
//+버튼을 클릭하면, 할일이 추가된다.
//delete 버튼을 누르면 할일이 삭제된다.
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다.
//진행중 끝남 탭을 누르면, 언더바가 이동한다.
//끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴

//입력창
let taskInput = document.getElementById("task-input");
//추가 버튼 (+)
let addButton = document.getElementById("add-button");

let tabs = document.querySelectorAll(".task-tabs div");

let underLine = document.getElementById("under-line");

let deleteAllButton = document.getElementById("deleteAll-button");

let allChoiceButton = document.getElementById("allChoice-button");
//전체 리스트
let list = [];

//할일리스트 저장하는 배열
let taskList = [];

//필터 리스트 저장하는 배열
let filterList = [];

let mode = 'all';

//추가버튼 이벤트 리스너
addButton.addEventListener("click", addTask);

deleteAllButton.addEventListener("click", allDelete);

allChoiceButton.addEventListener("click", allChoice);

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)})
}

//할일 리스트 추가하기
function addTask(){
    let task = {
        id: uniqueId(),
        taskContent: taskInput.value,
        isComplete:false
    }
    taskList.push(task);
    console.log(taskList);
    taskInput.value = "";
    render();
}

//할일 입력란에 커서가 있을때 엔터를 치면 추가됨
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });

//할일 리스트에 할일 추가하는 함수
function render() {
    list = [];
    if(mode == "all"){
        list = taskList;
    }else if(mode == "ongoing"){
        list = filterList;
    }else{
        list = filterList;
    }


    let resultHTML = "";
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task-true">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteButton('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        }else{
            resultHTML += `<div class="task-false">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteButton('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        }
    }
    //task-board에 HTML 코드를 추가한다.
    document.getElementById("task-board").innerHTML = resultHTML;
}

//check 버튼 누르면 완료된 일정을 바꾸기
function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            // if(taskList[i].isComplete == false){
            //     taskList[i].isComplete = true;
            // }else{
            //     taskList[i].isComplete = false;
            // }

            //위의 코드 줄인 문장 머리가 띵했음
            taskList[i].isComplete = !taskList[i].isComplete;

            break;
        }
    }
    console.log(taskList);
    render();
}

//유니크한 아이디 값을 주는 방법
var uniqueId = (function(){
    var id=0;
    return function(){ return id++;}
})();

//삭제 버튼
function deleteButton(id){
    console.log(id);
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
           //console.log(taskList.indexOf(taskList[i]));
           //taskList.splice(taskList.indexOf(taskList[i]), 1);
           taskList.splice(i, 1);
            break;
        }
    }
    for(let i=0; i<filterList.length; i++){
        if(filterList[i].id == id){
           filterList.splice(i, 1);
            break;
        }
    }
    render();
}

//전체 삭제 버튼
function allDelete(){
    taskList = [];
    filterList = [];
    render();
}

//전체 선택 버튼
function allChoice(){
    for(let i=0; i<taskList.length; i++){

        taskList[i].isComplete = !taskList[i].isComplete;
     
    }
    
    
    render();
}

// 모두, 진행중, 끝남중 하나를 선택하면 filter로 걸러서 보여주기 위한 함수
function filter(event){
    underLine.style.left = event.currentTarget.offsetLeft + "px";
    underLine.style.width = event.currentTarget.offsetWidth + "px";
    underLine.style.top = 
    event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px";

    mode = event.target.id;

    if(mode == "all"){
        render();
    }else if(mode == "ongoing"){
        filterList = [];
        for(i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
        render();
    }else{
        filterList = [];
        for(i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}